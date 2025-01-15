"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItems";

export default function OrderSummary({
  items,
  selectedItems,
  voucherDiscount,
}) {
  const [subtotal, setSubtotal] = useState(0);
  const [shipping] = useState(5.0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    const selectedProducts = items.filter((item) =>
      selectedItems.includes(item.id)
    );
    const newSubtotal = selectedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
    setTax(newSubtotal * 0.08); // Assuming 8% tax rate
  }, [items, selectedItems]);

  const discountAmount = (subtotal * voucherDiscount) / 100;
  const total = subtotal + shipping + tax - discountAmount;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Subtotal</p>
        <p className="text-sm font-medium text-gray-900">
          ${subtotal.toFixed(2)}
        </p>
      </div>
      {voucherDiscount > 0 && (
        <div className="flex items-center justify-between text-green-600">
          <p className="text-sm">Voucher Discount</p>
          <p className="text-sm font-medium">-${discountAmount.toFixed(2)}</p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Shipping</p>
        <p className="text-sm font-medium text-gray-900">
          ${shipping.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Tax</p>
        <p className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-base font-medium text-gray-900">Order total</p>
        <p className="text-base font-medium text-gray-900">
          ${total.toFixed(2)}
        </p>
      </div>
      <Button className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-white">
        Place Order
      </Button>
    </div>
  );
}
