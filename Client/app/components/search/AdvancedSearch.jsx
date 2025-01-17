"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

// interface AdvancedSearchProps {
//   filters: {
//     category: string
//     minPrice: string
//     maxPrice: string
//     rating: string
//     inStockOnly: boolean
//     sortBy: string
//   }
//   onFilterChange: (filters: any) => void
// }

export default function AdvancedSearch({ filters, onFilterChange }) {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => handleChange("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Books">Books</SelectItem>
              <SelectItem value="Home">Home</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Price Range</Label>
          <div className="flex items-center space-x-2 mt-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleChange("minPrice", e.target.value)}
              className="w-full"
            />
            <span>to</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="rating">Minimum Rating</Label>
          <Select
            value={filters.rating}
            onValueChange={(value) => handleChange("rating", value)}
          >
            <SelectTrigger id="rating">
              <SelectValue placeholder="Select minimum rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
              <SelectItem value="1">1+ Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="in-stock"
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => handleChange("inStockOnly", checked)}
          />
          <Label htmlFor="in-stock">In Stock Only</Label>
        </div>
        <div>
          <Label htmlFor="sort-by">Sort By</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleChange("sortBy", value)}
          >
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
