"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const brands = ["SoundMax", "TechFit", "PowerUp", "Fashionista", "HomeStyle"];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={1}
          onValueChange={setPriceRange}
          className="mt-2"
        />
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Brands</h3>
        <div className="mt-2 space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  setSelectedBrands(
                    checked
                      ? [...selectedBrands, brand]
                      : selectedBrands.filter((b) => b !== brand)
                  );
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="ml-2">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Ratings</h3>
        <div className="mt-2 space-y-2">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={(checked) => {
                  setSelectedRatings(
                    checked
                      ? [...selectedRatings, rating]
                      : selectedRatings.filter((r) => r !== rating)
                  );
                }}
              />
              <Label htmlFor={`rating-${rating}`} className="ml-2">
                {rating} Stars & Up
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
