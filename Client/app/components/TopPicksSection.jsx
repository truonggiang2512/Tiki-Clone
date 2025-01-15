import Image from "next/image";
import Link from "next/link";
import { Product } from "../utils/types";

const topPicks = [
  {
    id: "1",
    name: "Wireless Earbuds",
    description: "High-quality sound",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    brand: "SoundMax",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    brand: "TechFit",
    rating: 4.2,
    reviews: 85,
  },
  {
    id: "3",
    name: "Portable Charger",
    description: "Never run out of battery",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    brand: "PowerUp",
    rating: 4.7,
    reviews: 200,
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    description: "Party anywhere",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    brand: "SoundMax",
    rating: 4.3,
    reviews: 150,
  },
];

export default function TopPicksSection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Top Picks for You
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {topPicks.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
