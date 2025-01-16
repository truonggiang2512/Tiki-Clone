import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, CheckCircle } from "lucide-react";

// interface NotificationItemProps {
//   notification: {
//     id: string
//     title: string
//     date: string
//     category: string
//     isRead: boolean
//   }
//   onMarkAsRead: (id: string) => void
//   onDelete: (id: string) => void
// }

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM d, yyyy h:mm a");
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "order":
        return "bg-blue-500";
      case "offer":
        return "bg-green-500";
      case "system":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card
      className={`transition-all duration-200 ${
        notification.isRead ? "bg-white" : "bg-blue-50"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex-grow">
          <h3
            className={`text-lg ${
              notification.isRead ? "font-normal" : "font-semibold"
            }`}
          >
            {notification.title}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(notification.date)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            className={`${getCategoryColor(notification.category)} text-white`}
          >
            {notification.category}
          </Badge>
          {isHovered && (
            <>
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMarkAsRead(notification.id)}
                  title="Mark as read"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(notification.id)}
                title="Delete notification"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
