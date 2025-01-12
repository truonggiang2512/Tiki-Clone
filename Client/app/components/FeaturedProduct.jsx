import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FeaturedProduct() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
              Featured Product of the Month
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-600">
              Discover our handpicked selection, curated just for you. Elevate
              your style with this month's standout piece.
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800">
                Luxe Chronograph Watch
              </h3>
              <p className="mt-2 text-gray-600">
                Precision engineering meets timeless design. This luxury
                timepiece is the perfect blend of form and function.
              </p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-800">
                  $299.99
                </span>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  $399.99
                </span>
              </div>
              <div className="mt-6">
                <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Luxe Chronograph Watch"
                width={600}
                height={600}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
