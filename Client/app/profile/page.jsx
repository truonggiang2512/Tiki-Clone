"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserInformation from "./components/UserInformation";
import OrderHistory from "./components/OrderHistory";
import Wishlist from "./components/Wishlist";
import AccountSettings from "./components/AccountSettings";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="info">Personal Information</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <UserInformation />
          </TabsContent>
          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>
          <TabsContent value="wishlist">
            <Wishlist />
          </TabsContent>
          <TabsContent value="settings">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
