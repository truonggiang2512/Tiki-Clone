"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutationApi } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { mutateAsync, isPending, error } = useMutationApi("POST");
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await mutateAsync({
        endpoint: "/user/login",
        body: { email, password },
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
        // naviagte to home page
        router.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 100); // Small delay to allow navigation before reloading
      }
      toast({
        title: "Success",
        description: "Login successful!",
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
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 ">
      <div className="space-y-4">
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
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked)}
          />
          <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
            Remember me
          </Label>
        </div>
        <div className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Sign in
      </Button>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
