"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AdvancedSearch from "../components/search/AdvancedSearch";
import SearchResults from "../components/search/SearchResults";
import NoResults from "../components/search/NoResults";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Menu } from "lucide-react";

// Mock function to fetch search results - replace with actual API call
const fetchSearchResults = async (query, filters, page = 1) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

  const allProducts = [
    {
      id: "1",
      name: "Wireless Earbuds",
      price: 79.99,
      category: "Electronics",
      rating: 4.5,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      rating: 4.2,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: 59.99,
      category: "Electronics",
      rating: 4.0,
      inStock: false,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "4",
      name: "Laptop Backpack",
      price: 49.99,
      category: "Accessories",
      rating: 4.7,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "5",
      name: "Fitness Tracker",
      price: 89.99,
      category: "Electronics",
      rating: 4.3,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
    },
    // Add more mock products here...
  ];

  let filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
  );

  // Apply filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category
    );
  }
  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= filters.minPrice
    );
  }
  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= filters.maxPrice
    );
  }
  if (filters.rating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= filters.rating
    );
  }
  if (filters.inStockOnly) {
    filteredProducts = filteredProducts.filter((product) => product.inStock);
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price_asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // In a real scenario, you'd sort by a 'dateAdded' field
        break;
    }
  }

  // Simulate pagination
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    results: paginatedProducts,
    totalResults: filteredProducts.length,
    hasMore: endIndex < filteredProducts.length,
  };
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    inStockOnly: false,
    sortBy: "",
  });
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (resetPage = true) => {
    setIsLoading(true);
    try {
      const newPage = resetPage ? 1 : page;
      const {
        results: fetchedResults,
        totalResults: fetchedTotal,
        hasMore: fetchedHasMore,
      } = await fetchSearchResults(query, filters, newPage);
      setResults((prev) =>
        resetPage ? fetchedResults : [...prev, ...fetchedResults]
      );
      setTotalResults(fetchedTotal);
      setHasMore(fetchedHasMore);
      setPage(newPage + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch search results. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      handleSearch(true);
    }
  }, [query, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div
            className={`lg:w-1/4 ${
              isSidebarOpen ? "block" : "hidden lg:block"
            }`}
          >
            <AdvancedSearch
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="lg:w-3/4">
            {results.length > 0 ? (
              <>
                <SearchResults results={results} />
                {hasMore && (
                  <div className="mt-8 text-center">
                    <Button
                      onClick={() => handleSearch(false)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              query && !isLoading && <NoResults query={query} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
