"use client";

import { useState } from "react";
import Image from "next/image";

// interface ProductImagesProps {
//   images: string[];
// }

export default function ProductImages({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse">
      {/* Image grid */}
      <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
        <div
          className="grid grid-cols-4 gap-6"
          aria-orientation="horizontal"
          role="tablist"
        >
          {images.map((image, index) => (
            <button
              key={index}
              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
              aria-controls={`tabs-${index}-panel`}
              role="tab"
              type="button"
              onClick={() => setMainImage(image)}
            >
              <span className="sr-only">{`Image ${index + 1}`}</span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt=""
                  className="w-full h-full object-center object-cover"
                  width={96}
                  height={96}
                />
              </span>
              <span
                className={`${
                  mainImage === image ? "ring-indigo-500" : "ring-transparent"
                } absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main image */}
      <div className="w-full aspect-w-1 aspect-h-1">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt="Main product image"
          className="w-full h-full object-center object-cover sm:rounded-lg"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
}
