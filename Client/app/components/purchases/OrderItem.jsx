import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// interface OrderItemProps {
//   order: {
//     id: string
//     date: string
//     status: string
//     items: Array<{ id: string; name: string; quantity: number; price: number }>
//     total: number
//   }
//   onCancelOrder: (orderId: string) => void
//   onContactSupport: (orderId: string) => void
// }

export default function OrderItem({ order, onCancelOrder, onContactSupport }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending_purchase":
        return "bg-yellow-500";
      case "pending_delivery":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "completed":
        return "bg-purple-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending_purchase":
        return "Pending Purchase";
      case "pending_delivery":
        return "Pending Delivery";
      case "delivered":
        return "Delivered";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Order #{order.id}</CardTitle>
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            {getStatusText(order.status)}
          </Badge>
        </div>
        <CardDescription>{formatDate(order.date)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="items">
            <AccordionTrigger>View Order Items</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Total: ${order.total.toFixed(2)}
        </div>
        <div className="space-x-2">
          <Button asChild>
            <Link href={`/order/${order.id}`}>View Details</Link>
          </Button>
          {(order.status === "pending_purchase" ||
            order.status === "pending_delivery") && (
            <Button
              variant="destructive"
              onClick={() => onCancelOrder(order.id)}
            >
              Cancel Order
            </Button>
          )}
          <Button variant="outline" onClick={() => onContactSupport(order.id)}>
            Contact Support
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
