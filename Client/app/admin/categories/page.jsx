"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CategoryForm from "../../components/categories/CategoryForm";
import CategoryList from "../../components/categories/CategoryList";
import AccessDenied from "../../components/AccessDenied";

// Mock authentication state
const useAuth = () => {
  // In a real app, this would check the user's role from your authentication system
  return { user: { role: "admin" } };
};

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // In a real app, this would fetch categories from your API
    setCategories([
      {
        id: 1,
        name: "Electronics",
        description: "Gadgets and devices",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Clothing",
        description: "Apparel and accessories",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 3,
        name: "Home & Garden",
        description: "Items for your living space",
        image: "/placeholder.svg?height=100&width=100",
      },
    ]);
  }, []);

  const handleAddCategory = (newCategory) => {
    // In a real app, this would send a POST request to your API
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
  };

  const handleUpdateCategory = (updatedCategory) => {
    // In a real app, this would send a PUT request to your API
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    // In a real app, this would send a DELETE request to your API
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  if (user.role !== "admin") {
    return <AccessDenied />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Category Management
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <CategoryForm
            onSubmit={
              editingCategory ? handleUpdateCategory : handleAddCategory
            }
            initialData={editingCategory}
          />
          <CategoryList
            categories={categories}
            onEdit={setEditingCategory}
            onDelete={handleDeleteCategory}
          />
        </div>
      </div>
    </div>
  );
}
