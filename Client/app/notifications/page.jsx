"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import NotificationList from "../components/notifications/NotificationList";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock function to fetch notifications - replace with actual API call
const fetchNotifications = async (category = "all", page = 1) => {
  // Simulating API call
  const allNotifications = [
    {
      id: "1",
      title: "Your order #12345 has been shipped",
      date: "2023-08-01T10:00:00Z",
      category: "order",
      isRead: false,
    },
    {
      id: "2",
      title: "New offer: 20% off on electronics",
      date: "2023-07-31T15:30:00Z",
      category: "offer",
      isRead: true,
    },
    {
      id: "3",
      title: "System maintenance scheduled for tonight",
      date: "2023-07-30T18:45:00Z",
      category: "system",
      isRead: false,
    },
    {
      id: "4",
      title: "Your order #12346 has been delivered",
      date: "2023-07-29T14:20:00Z",
      category: "order",
      isRead: true,
    },
    {
      id: "5",
      title: "Flash sale: 50% off for the next 2 hours",
      date: "2023-07-28T09:00:00Z",
      category: "offer",
      isRead: false,
    },
    // Add more mock notifications here...
  ];

  // Filter notifications based on category
  const filteredNotifications =
    category === "all"
      ? allNotifications
      : category === "unread"
      ? allNotifications.filter((notif) => !notif.isRead)
      : allNotifications.filter((notif) => notif.category === category);

  // Simulate pagination
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    endIndex
  );

  return {
    notifications: paginatedNotifications,
    hasMore: endIndex < filteredNotifications.length,
  };
};

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadNotifications = async (reset = false) => {
    setIsLoading(true);
    try {
      const newPage = reset ? 1 : page;
      const { notifications: fetchedNotifications, hasMore: fetchedHasMore } =
        await fetchNotifications(activeTab, newPage);
      setNotifications((prev) =>
        reset ? fetchedNotifications : [...prev, ...fetchedNotifications]
      );
      setHasMore(fetchedHasMore);
      setPage(newPage + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notifications. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadNotifications(true);
  }, [activeTab]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setPage(1);
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setHasMore(false);
    toast({
      title: "Success",
      description: "All notifications have been cleared.",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Clear All</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  your notifications.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAll}>
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="order">Order Updates</TabsTrigger>
            <TabsTrigger value="offer">Offers & Promotions</TabsTrigger>
            <TabsTrigger value="system">System Updates</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <NotificationList
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
            {hasMore && (
              <div className="mt-4 text-center">
                <Button
                  onClick={() => loadNotifications()}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
