import NotificationItem from "./NotificationItem";

// interface Notification {
//   id: string
//   title: string
//   date: string
//   category: string
//   isRead: boolean
// }

// interface NotificationListProps {
//   notifications: Notification[]
//   onMarkAsRead: (id: string) => void
//   onDelete: (id: string) => void
// }

export default function NotificationList({
  notifications,
  onMarkAsRead,
  onDelete,
}) {
  if (notifications.length === 0) {
    return (
      <div className="text-center text-gray-500">No notifications found.</div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
