"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetch, useMutationApi } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";

export default function UserInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync } = useMutationApi("PUT");
  const { toast } = useToast();
  const [user, setUser] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    phone_number: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, AN 12345",
  });

  const {
    data: userInfo,
    isLoading,
    error,
  } = useFetch(`/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if (userInfo?.data) {
      setUser((prevUser) => ({
        username: userInfo.data.username ?? prevUser.username,
        email: userInfo.data.email ?? prevUser.email,
        phone_number: userInfo.data.phone_number ?? prevUser.phone_number,
        address: userInfo.data.address ?? prevUser.address,
      }));
    }
  }, [userInfo?.data]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your backend
    try {
      const response = await mutateAsync({
        endpoint: "/user/me",
        body: user,
      });
      if (response) {
        setIsEditing(false);
      }
      toast({
        title: "Success",
        description: "Edit successful!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-6 mb-4">
        <Image
          src="/placeholder.svg?height=100&width=100"
          alt="Profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="username">Name</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={user.username || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="phone_number">Phone</Label>
            <Input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={user.phone_number || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={user.address || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          {isEditing ? (
            <>
              <Button type="submit" className="mr-4">
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button type="button" onClick={handleEdit}>
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
