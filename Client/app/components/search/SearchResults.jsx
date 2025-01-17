import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

// interface SearchResult {
//   id: string
//   name: string
//   price: number
//   category: string
//   rating: number
//   inStock: boolean
//   image: string
// }

// interface SearchResultsProps {
//   results: SearchResult[]
// }

export default function SearchResults({ results }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <Badge>{product.category}</Badge>
            </div>
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1">{product.rating.toFixed(1)}</span>
            </div>
            <Badge variant={product.inStock ? "default" : "secondary"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
