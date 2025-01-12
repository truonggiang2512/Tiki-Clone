"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  User,
  Search,
  Bell,
  MessageCircleQuestionIcon as QuestionCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 text-sm">
          <nav className="flex space-x-4">
            <Link href="/seller-centre" className="hover:text-gray-600">
              Seller Centre
            </Link>
            <Link href="/download" className="hover:text-gray-600">
              Download
            </Link>
            <div className="flex items-center space-x-1">
              <span>Follow us on</span>
              <a href="#" className="hover:text-gray-600">
                F
              </a>
              <a href="#" className="hover:text-gray-600">
                I
              </a>
            </div>
          </nav>
          <nav className="flex items-center space-x-4">
            <Link
              href="/notifications"
              className="flex items-center hover:text-gray-600"
            >
              <Bell className="w-4 h-4 mr-1" />
              Notifications
            </Link>
            <Link
              href="/help"
              className="flex items-center hover:text-gray-600"
            >
              <QuestionCircle className="w-4 h-4 mr-1" />
              Help
            </Link>
            <Link href="/auth/signup" className="hover:text-gray-600">
              Sign Up
            </Link>
            <Link href="/auth/login" className="hover:text-gray-600">
              Login
            </Link>
          </nav>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            DokeShop
          </Link>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-10 rounded-sm text-gray-800 border-gray-300"
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-r-sm"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Link href="/cart" className="text-2xl text-gray-800">
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
