import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Fitness Tracker",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Portable Charger",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function RecommendedProducts() {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={200}
              height={200}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href="#">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
