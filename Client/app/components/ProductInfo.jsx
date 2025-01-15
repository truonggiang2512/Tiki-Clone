"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// interface ProductInfoProps {
//   name: string
//   price: number
//   description: string
// }

export default function ProductInfo({ name, price, description }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        {name}
      </h1>
      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl text-gray-900">${price.toFixed(2)}</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <p className="text-base text-gray-700">{description}</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center">
          <label
            htmlFor="quantity"
            className="mr-3 text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <select
            id="quantity"
            name="quantity"
            className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={quantity}
            onChange={handleQuantityChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
      </div>

      <Button className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-md">
        Add to Cart
      </Button>
    </div>
  );
}
