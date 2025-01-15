"use client";

import { useState } from "react";
import OrderSummary from "../components/OrderSummary";
import SelectedItems from "../components/SelectedItems";
import VoucherForm from "../components/VoucherForm";

// Mocked selected items for demonstration
const initialSelectedItems = [
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

export default function OrderPage() {
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  const handleVoucherApplied = (discount) => {
    setVoucherDiscount(discount);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Order</h1>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your order
            </h2>
            <SelectedItems items={selectedItems} />
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-white rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900 mb-4"
            >
              Order summary
            </h2>
            <VoucherForm onVoucherApplied={handleVoucherApplied} />
            <OrderSummary
              items={selectedItems}
              selectedItems={selectedItems.map((item) => item.id)}
              voucherDiscount={voucherDiscount}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
