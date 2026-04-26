import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eGrocery | Order Your Daily Fresh Groceries",
  description: "Fresh vegetables, fruits, and daily essentials delivered in 10 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
