"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutationApi } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import CitySelect from "@/app/components/CitiesSelect";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const { mutateAsync, isPending, error } = useMutationApi("POST");
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await mutateAsync({
        endpoint: "/user/signup",
        body: { username, email, password, phone_number: phoneNumber, address },
      });
      console.log(response);
      toast({
        title: "Success",
        description: "Sign up successful!",
        variant: "default",
      });
      if (response) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
      // Here you would typically handle the sign-up logic
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 ">
      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Full Name</Label>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone_number">Phone</Label>
          <Input
            id="phone_number"
            name="phone_number"
            type="number"
            autoComplete="phone_number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <CitySelect setAddress={setAddress} />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Sign up
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
