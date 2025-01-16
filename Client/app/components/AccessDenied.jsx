import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          You do not have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
