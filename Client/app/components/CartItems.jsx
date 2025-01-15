"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const initialItems = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 59.99,
    quantity: 1,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function CartItems({ onItemsChange, onSelectionChange }) {
  const [items, setItems] = useState(initialItems);
  const [selectedItems, setSelectedItems] = useState([]);

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setItems(updatedItems);
    onItemsChange(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    onItemsChange(updatedItems);
    onSelectionChange(selectedItems.filter((itemId) => itemId !== id));
  };

  const toggleItemSelection = (id) => {
    const updatedSelection = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
    setSelectedItems(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {items.map((item) => (
        <li key={item.id} className="flex py-6 sm:py-10">
          <div className="flex items-center h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32">
            <Checkbox
              id={`select-${item.id}`}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => toggleItemSelection(item.id)}
            />
          </div>

          <div className="ml-4 flex-shrink-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={100}
              height={100}
              className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
            />
          </div>

          <div className="ml-6 flex flex-1 flex-col">
            <div className="flex">
              <div className="min-w-0 flex-1">
                <h4 className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-gray-700 hover:text-gray-800"
                  >
                    {item.name}
                  </a>
                </h4>
                <p className="mt-1 text-sm text-gray-500">{item.name}</p>
              </div>

              <div className="ml-4 flow-root flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                  className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Remove</span>
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="flex flex-1 items-end justify-between pt-2">
              <p className="mt-1 text-sm font-medium text-gray-900">
                ${item.price.toFixed(2)}
              </p>

              <div className="ml-4">
                <label htmlFor={`quantity-${item.id}`} className="sr-only">
                  Quantity, {item.name}
                </label>
                <Input
                  id={`quantity-${item.id}`}
                  name={`quantity-${item.id}`}
                  type="number"
                  className="w-16"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  min={1}
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
