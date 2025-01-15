import Image from "next/image";
import Link from "next/link";

const relatedProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200&text=Headphones",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200&text=Speaker",
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 249.99,
    image: "/placeholder.svg?height=200&width=200&text=Smartwatch",
  },
  {
    id: 4,
    name: "Portable Charger",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200&text=Charger",
  },
];

export default function RelatedProducts() {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {relatedProducts.map((product) => (
        <div key={product.id} className="group relative">
          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              width={200}
              height={200}
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
