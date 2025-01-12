import Header from './components/Header'
import Footer from './components/Footer'
import './globals.css'


export const metadata = {
  title: 'DokeShop',
  description: 'Your one-stop e-commerce solution',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

