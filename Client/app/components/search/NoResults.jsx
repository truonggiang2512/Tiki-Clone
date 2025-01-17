import Link from "next/link";
import { Button } from "@/components/ui/button";

// interface NoResultsProps {
//   query: string;
// }

export default function NoResults({ query }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold mb-4">
        No results found for "{query}"
      </h2>
      <p className="text-gray-600 mb-8">
        We couldn't find any products matching your search. Try adjusting your
        search terms or browse our popular categories.
      </p>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Popular Categories:</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/category/electronics">Electronics</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/category/clothing">Clothing</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/category/books">Books</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/category/home">Home & Living</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
