import ProductImages from "../../components/ProductImages";
import ProductInfo from "../../components/ProductInfo";
import ProductSpecifications from "../../components/ProductSpecifications";
import RelatedProducts from "../../components/RelatedProducts";
import CustomerReviews from "../../components/CustomerReviews";

// Mock product data
const product = {
  id: "1",
  name: "Premium Wireless Earbuds",
  price: 129.99,
  description:
    "Experience crystal-clear audio with our premium wireless earbuds. Featuring advanced noise-cancellation technology, these earbuds deliver an immersive sound experience whether you`re working out, commuting, or relaxing at home.",
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ],
  specifications: [
    { name: "Battery Life", value: "Up to 8 hours" },
    { name: "Bluetooth Version", value: "5.0" },
    { name: "Water Resistance", value: "IPX4" },
    { name: "Noise Cancellation", value: "Active" },
    { name: "Charging Case", value: "Included" },
    { name: "Warranty", value: "1 Year" },
  ],
};

export default function ProductDetailPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Left column */}
          <ProductImages images={product.images} />

          {/* Right column */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <ProductInfo
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-16">
          <ProductSpecifications specifications={product.specifications} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <RelatedProducts />
        </div>

        {/* Customer Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
}
