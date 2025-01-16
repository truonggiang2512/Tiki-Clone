"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductForm({
  onSubmit,
  initialData = null,
  categories,
  sellerId,
}) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    finalPrice: "",
    discount: "",
    stockQuantity: "",
    category: "",
    status: "In Stock",
    images: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (name === "price" || name === "discount") {
        const price = parseFloat(updatedData.price) || 0;
        const discount = parseFloat(updatedData.discount) || 0;
        updatedData.finalPrice = (price - (price * discount) / 100).toFixed(2);
      }
      return updatedData;
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (
      !formData.name.trim() ||
      formData.name.length < 3 ||
      formData.name.length > 50
    )
      newErrors.name = "Name must be between 3 and 50 characters";
    if (!formData.slug.trim() || formData.slug.length < 3)
      newErrors.slug = "Slug must be at least 3 characters";
    if (
      !formData.description.trim() ||
      formData.description.length < 3 ||
      formData.description.length > 255
    )
      newErrors.description =
        "Description must be between 3 and 255 characters";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be a positive number";
    if (
      formData.discount &&
      (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100)
    )
      newErrors.discount = "Discount must be between 0 and 100";
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0)
      newErrors.stockQuantity = "Stock quantity must be a non-negative integer";

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ ...formData, sellerId });
      if (!initialData) {
        setFormData({
          name: "",
          slug: "",
          description: "",
          price: "",
          finalPrice: "",
          discount: "",
          stockQuantity: "",
          category: "",
          status: "In Stock",
          images: [],
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {initialData ? "Edit Product" : "Add New Product"}
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className={errors.slug ? "border-red-500" : ""}
          />
          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>
        <div>
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            name="discount"
            type="number"
            step="0.1"
            value={formData.discount}
            onChange={handleChange}
            className={errors.discount ? "border-red-500" : ""}
          />
          {errors.discount && (
            <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
          )}
        </div>
        <div>
          <Label htmlFor="finalPrice">Final Price</Label>
          <Input
            id="finalPrice"
            name="finalPrice"
            type="number"
            step="0.01"
            value={formData.finalPrice}
            readOnly
          />
        </div>
        <div>
          <Label htmlFor="stockQuantity">Stock Quantity</Label>
          <Input
            id="stockQuantity"
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange}
            className={errors.stockQuantity ? "border-red-500" : ""}
          />
          {errors.stockQuantity && (
            <p className="text-red-500 text-sm mt-1">{errors.stockQuantity}</p>
          )}
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={formData.category}
            onValueChange={(value) =>
              handleChange({ target: { name: "category", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) =>
              handleChange({ target: { name: "status", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="images">Images</Label>
          <Input
            id="images"
            name="images"
            type="file"
            multiple
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                images: Array.from(e.target.files),
              }))
            }
          />
        </div>
        <Button type="submit" className="w-full">
          {initialData ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
