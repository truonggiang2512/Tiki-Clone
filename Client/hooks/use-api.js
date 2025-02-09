'use cli'
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8017/v1'; // Set your API base URL

// Custom hook to fetch data
export const useFetch = (endpoint, options = {}) => {
  const router = useRouter();

  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        console.warn("No token found, redirecting to login...");
        router.push("/login"); // Redirect if no token
        return Promise.reject("Unauthorized");
      }

      const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`, // Attach token to request
        },
      });

      if (res.status === 401) {
        console.warn("Unauthorized, redirecting to login...");
        localStorage.removeItem("token"); // Clear token if invalid
        router.push("/login"); // Redirect user
        return Promise.reject("Unauthorized");
      }

      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  });
};

// Custom hook to POST, PUT, DELETE data
export const useMutationApi = (method) => {
  const mutation = useMutation({
    mutationFn: async ({ endpoint, body }) => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        console.warn("No token found, redirecting to login...");
        router.push("/login"); // Redirect if no token
        return Promise.reject("Unauthorized");
      }
      const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("API Response:", data); // Debugging: Check if token is correctly received

      return data; // Ensure this returns the expected token
    },
  });

  return {
    ...mutation, // Spread all properties like isPending, error, etc.
    mutateAsync: mutation.mutateAsync, // Explicitly return mutateAsync
  };
};