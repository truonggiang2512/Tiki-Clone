"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const bannerAds = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "Summer Sale",
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    cta: "Shop Now",
    link: "/sale",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "New Arrivals",
    title: "New Arrivals",
    description: "Check out our latest collection",
    cta: "Explore",
    link: "/new-arrivals",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=1200",
    alt: "Free Shipping",
    title: "Free Shipping",
    description: "On orders over $50",
    cta: "Learn More",
    link: "/shipping",
  },
];

export default function BannerAdSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden"
      >
        {bannerAds.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div className="relative w-full h-[400px]">
              <Image
                src={ad.image}
                alt={ad.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl font-bold mb-4">{ad.title}</h2>
                <p className="text-xl mb-6">{ad.description}</p>
                <a
                  href={ad.link}
                  className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
                >
                  {ad.cta}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <div className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out">
          <ChevronLeft className="w-6 h-6" />
        </div>
      </div>
      <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <div className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
