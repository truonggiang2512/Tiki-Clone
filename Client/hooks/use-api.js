import { useQuery, useMutation } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8017/v1'; // Set your API base URL

// Custom hook to fetch data
export const useFetch = (endpoint, options = {}) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await fetch(`${API_URL}${endpoint}`, options);
      if (!res.ok) throw new Error('Failed to fetch data');
      return res.json();
    },
  });
};

// Custom hook to POST, PUT, DELETE data
export const useMutationApi = (method) => {
  const mutation = useMutation({
    mutationFn: async ({ endpoint, body }) => {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
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