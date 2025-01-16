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

export default function CategoryList({ categories, onEdit, onDelete }) {
  const [deletingCategory, setDeletingCategory] = useState(null);

  const handleDelete = () => {
    if (deletingCategory) {
      onDelete(deletingCategory.id);
      setDeletingCategory(null);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li
            key={category.id}
            className="py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={50}
                height={50}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onEdit(category)}>
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    onClick={() => setDeletingCategory(category)}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the category "{deletingCategory?.name}" and remove it from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setDeletingCategory(null)}
                    >
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
