"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const categories = [
  {
    id: "1",
    name: "Electronics",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: "2", name: "Fashion", image: "/placeholder.svg?height=80&width=80" },
  {
    id: "3",
    name: "Home & Living",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: "4", name: "Beauty", image: "/placeholder.svg?height=80&width=80" },
  {
    id: "5",
    name: "Baby & Toys",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: "6", name: "Groceries", image: "/placeholder.svg?height=80&width=80" },
  { id: "7", name: "Sports", image: "/placeholder.svg?height=80&width=80" },
  { id: "8", name: "Automotive", image: "/placeholder.svg?height=80&width=80" },
  { id: "9", name: "Books", image: "/placeholder.svg?height=80&width=80" },
  { id: "10", name: "Pets", image: "/placeholder.svg?height=80&width=80" },
];

export default function CategorySlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={5}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 7 },
            768: { slidesPerView: 8 },
            1024: { slidesPerView: 10 },
          }}
          className="relative"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="text-center group">
                <div className="relative w-20 h-20 mx-auto mb-2 overflow-hidden rounded-full transition-transform duration-300 transform group-hover:scale-105 bg-white shadow-md">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </div>
          <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
