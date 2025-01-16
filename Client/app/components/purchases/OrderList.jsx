// interface Order {
//   id: string
//   date: string
//   status: string
//   items: Array<{ id: string; name: string; quantity: number; price: number }>
//   total: number
// }

import OrderItem from "./OrderItem";

// interface OrderListProps {
//   orders: Order[]
//   isLoading: boolean
//   onCancelOrder: (orderId: string) => void
//   onContactSupport: (orderId: string) => void
// }

export default function OrderList({
  orders,
  isLoading,
  onCancelOrder,
  onContactSupport,
}) {
  if (isLoading) {
    return <div className="text-center">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center">No orders found.</div>;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onCancelOrder={onCancelOrder}
          onContactSupport={onContactSupport}
        />
      ))}
    </div>
  );
}
