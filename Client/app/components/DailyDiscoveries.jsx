import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "1",
    name: "Wireless Earbuds",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Portable Charger",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Fitness Tracker",
    price: 34.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Wireless Mouse",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "7",
    name: "Phone Case",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "8",
    name: "Laptop Sleeve",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "9",
    name: "Wireless Keyboard",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "10",
    name: "Desk Lamp",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function DailyDiscoveries() {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Daily Discoveries
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="relative h-48">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-800 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
