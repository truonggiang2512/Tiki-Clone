"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

const flashSaleProducts = [
  {
    id: "1",
    name: "Wireless Earbuds",
    price: 29.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 49.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Portable Charger",
    price: 19.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 39.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Fitness Tracker",
    price: 34.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Wireless Mouse",
    price: 14.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800 mr-4">
              FLASH SALE
            </h2>
            <div className="text-gray-600 font-semibold">
              Ending in: {formatTime(timeLeft)}
            </div>
          </div>
          <button className="text-gray-800 font-semibold hover:text-gray-600">
            See All &gt;
          </button>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="relative"
        >
          {flashSaleProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Link href={`/product/${product.id}`} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="relative h-48">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 text-xs font-bold">
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      % OFF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-gray-800 font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
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
