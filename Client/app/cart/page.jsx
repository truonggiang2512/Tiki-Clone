"use client";

import { useState } from "react";
import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";
import RecommendedProducts from "../components/RecommendedProducts";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemsChange = (updatedItems) => {
    setItems(updatedItems);
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedItems(selectedIds);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <CartItems
              onItemsChange={handleItemsChange}
              onSelectionChange={handleSelectionChange}
            />
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-white rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>
            <OrderSummary items={items} selectedItems={selectedItems} />
          </section>
        </div>

        <section aria-labelledby="recommended-heading" className="mt-24">
          <h2
            id="recommended-heading"
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Recommended Products
          </h2>
          <RecommendedProducts />
        </section>
      </div>
    </div>
  );
}
