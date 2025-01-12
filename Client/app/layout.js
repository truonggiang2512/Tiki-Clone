import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <title>Ecommerce Doke</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
