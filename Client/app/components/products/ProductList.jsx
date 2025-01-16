"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProductList({ products, onEdit, onDelete }) {
  const [deletingProduct, setDeletingProduct] = useState(null);

  const handleDelete = () => {
    if (deletingProduct) {
      onDelete(deletingProduct.id);
      setDeletingProduct(null);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Products</h2>
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li
            key={product.id}
            className="py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={50}
                height={50}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600">
                  ${product.finalPrice} - {product.status}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onEdit(product)}>
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    onClick={() => setDeletingProduct(product)}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the product "{deletingProduct?.name}" and remove it from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeletingProduct(null)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
