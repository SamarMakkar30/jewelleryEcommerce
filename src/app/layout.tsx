import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AdminProvider } from "@/context/AdminContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "LUNARA — Premium Anti-Tarnish Jewellery | Waterproof & Hypoallergenic",
  description:
    "Discover waterproof, anti-tarnish, and hypoallergenic jewellery designed for the modern woman. Necklaces, earrings, rings & bracelets that stay beautiful forever.",
  icons: {
    icon: "/fevicon.png",
    apple: "/fevicon.png",
  },
  keywords: [
    "anti-tarnish jewellery",
    "waterproof jewellery",
    "hypoallergenic jewellery",
    "gold necklaces",
    "minimalist jewellery",
    "everyday jewellery India",
  ],
  openGraph: {
    title: "LUNARA — Premium Anti-Tarnish Jewellery",
    description:
      "Waterproof. Anti-Tarnish. Made for Everyday Elegance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" />
        <meta name="theme-color" content="#1A1A18" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-sans antialiased bg-ivory text-neutral-800">
        <AdminProvider>
          <CartProvider>
            <WishlistProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </WishlistProvider>
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
