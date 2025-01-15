"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// interface VoucherFormProps {
//   onVoucherApplied: (discount: number) => void
// }

export default function VoucherForm({ onVoucherApplied }) {
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Mock voucher validation
    if (voucherCode === "DISCOUNT10") {
      onVoucherApplied(10);
      setVoucherCode("");
    } else if (voucherCode === "DISCOUNT20") {
      onVoucherApplied(20);
      setVoucherCode("");
    } else {
      setError("Invalid voucher code");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex space-x-4">
        <Input
          type="text"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          placeholder="Enter voucher code"
          className="flex-grow"
        />
        <Button type="submit" variant="outline">
          Apply
        </Button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
