import Image from "next/image";
import { Button } from "@/components/ui/button";

const wishlistItems = [
  {
    id: "1",
    name: "Wireless Earbuds",
    price: 79.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Portable Charger",
    price: 49.99,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function Wishlist() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist</h2>
      <ul className="divide-y divide-gray-200">
        {wishlistItems.map((item) => (
          <li key={item.id} className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={100}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Add to Cart</Button>
              <Button variant="ghost">Remove</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
