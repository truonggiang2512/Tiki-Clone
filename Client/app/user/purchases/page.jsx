"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import OrderList from "../../components/purchases/OrderList";
import { useToast } from "@/hooks/use-toast";

// Mock function to fetch orders - replace with actual API call
const fetchOrders = async (status = "all", page = 1) => {
  // Simulating API call
  const allOrders = [
    {
      id: "1001",
      date: "2023-07-01",
      status: "delivered",
      items: [
        { id: "1", name: "Wireless Earbuds", quantity: 1, price: 79.99 },
        { id: "2", name: "Phone Case", quantity: 1, price: 19.99 },
      ],
      total: 99.98,
    },
    {
      id: "1002",
      date: "2023-07-15",
      status: "completed",
      items: [{ id: "3", name: "Smart Watch", quantity: 1, price: 199.99 }],
      total: 199.99,
    },
    {
      id: "1003",
      date: "2023-07-20",
      status: "pending_purchase",
      items: [
        { id: "4", name: "Bluetooth Speaker", quantity: 1, price: 59.99 },
        { id: "5", name: "Power Bank", quantity: 2, price: 29.99 },
      ],
      total: 119.97,
    },
    {
      id: "1004",
      date: "2023-07-25",
      status: "pending_delivery",
      items: [{ id: "6", name: "Laptop Sleeve", quantity: 1, price: 24.99 }],
      total: 24.99,
    },
    {
      id: "1005",
      date: "2023-07-30",
      status: "cancelled",
      items: [{ id: "7", name: "Wireless Mouse", quantity: 1, price: 39.99 }],
      total: 39.99,
    },
  ];

  // Filter orders based on status
  const filteredOrders =
    status === "all"
      ? allOrders
      : allOrders.filter((order) => order.status === status);

  // Simulate pagination
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return {
    orders: paginatedOrders,
    totalPages: Math.ceil(filteredOrders.length / itemsPerPage),
  };
};

export default function UserPurchasePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const { orders: fetchedOrders, totalPages: fetchedTotalPages } =
        await fetchOrders(activeTab, currentPage);
      setOrders(fetchedOrders);
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [activeTab, currentPage]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCancelOrder = async (orderId) => {
    // Implement order cancellation logic here
    toast({
      title: "Order Cancelled",
      description: `Order ${orderId} has been cancelled successfully.`,
    });
    loadOrders();
  };

  const handleContactSupport = (orderId) => {
    // Implement contact support logic here
    toast({
      title: "Support Contacted",
      description: `Support request for order ${orderId} has been submitted.`,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Purchases
        </h1>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending_purchase">
              Pending to Purchase
            </TabsTrigger>
            <TabsTrigger value="pending_delivery">
              Pending to Deliver
            </TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <OrderList
              orders={orders}
              isLoading={isLoading}
              onCancelOrder={handleCancelOrder}
              onContactSupport={handleContactSupport}
            />
            {!isLoading && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-2"
                >
                  Previous
                </Button>
                <span className="mx-4 self-center">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-2"
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
