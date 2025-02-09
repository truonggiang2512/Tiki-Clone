'use client';
import Header from './components/Header'
import Footer from './components/Footer'
import './globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";

// export const metadata = {
//   title: 'DokeShop',
//   description: 'Your one-stop e-commerce solution',
// }

export default function RootLayout({
  children,
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en" suppressHydrationWarning>
      <QueryClientProvider client={queryClient}>
        <body >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="min-h-screen bg-gray-50 flex-grow" >
              {children}
              <Toaster />
            </main>
            <Footer />
          </div>
        </body>
      </QueryClientProvider>
    </html>
  )
}

