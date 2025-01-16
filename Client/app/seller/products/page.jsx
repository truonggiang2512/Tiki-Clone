"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../components/products/ProductForm";
import ProductList from "../../components/products/ProductList";
import AccessDenied from "../../components/AccessDenied";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock authentication state
const useAuth = () => {
  // In a real app, this would check the user's role from your authentication system
  return { user: { role: "seller", id: "seller123" } };
};

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, these would fetch from your API
    setProducts([
      {
        id: 1,
        name: "Wireless Earbuds",
        slug: "wireless-earbuds",
        description: "High-quality sound",
        price: 99.99,
        finalPrice: 79.99,
        discount: 20,
        stockQuantity: 100,
        category: "Electronics",
        status: "In Stock",
        createdAt: "2023-07-15T10:00:00Z",
        updatedAt: "2023-07-15T10:00:00Z",
        images: ["/placeholder.svg?height=200&width=200"],
      },
      {
        id: 2,
        name: "Smart Watch",
        slug: "smart-watch",
        description: "Track your fitness",
        price: 199.99,
        finalPrice: 199.99,
        discount: 0,
        stockQuantity: 50,
        category: "Electronics",
        status: "In Stock",
        createdAt: "2023-07-14T09:00:00Z",
        updatedAt: "2023-07-14T09:00:00Z",
        images: ["/placeholder.svg?height=200&width=200"],
      },
    ]);
    setCategories([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Clothing" },
      { id: 3, name: "Home & Garden" },
    ]);
  }, []);

  const handleAddProduct = (newProduct) => {
    // In a real app, this would send a POST request to your API
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts([...products, productWithId]);
    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const handleUpdateProduct = (updatedProduct) => {
    // In a real app, this would send a PUT request to your API
    setProducts(
      products.map((prod) =>
        prod.id === updatedProduct.id
          ? { ...updatedProduct, updatedAt: new Date().toISOString() }
          : prod
      )
    );
    setEditingProduct(null);
    toast({
      title: "Success",
      description: "Product updated successfully!",
    });
  };

  const handleDeleteProduct = (id) => {
    // In a real app, this would send a DELETE request to your API
    setProducts(products.filter((prod) => prod.id !== id));
    toast({
      title: "Success",
      description: "Product deleted successfully!",
    });
  };

  if (user.role !== "seller") {
    return <AccessDenied />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Product Management
        </h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <ProductForm
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              initialData={editingProduct}
              categories={categories}
              sellerId={user.id}
            />
          </div>
          <div>
            <ProductList
              products={products}
              onEdit={setEditingProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
