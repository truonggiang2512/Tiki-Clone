import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Link href="/" className="text-4xl font-bold text-indigo-600">
            ShopEase
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to ShopEase
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}
