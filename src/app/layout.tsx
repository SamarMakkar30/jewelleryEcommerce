import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

export const metadata: Metadata = {
  title: "PAKHI — Premium Anti-Tarnish Jewellery | Waterproof & Hypoallergenic",
  description:
    "Discover waterproof, anti-tarnish, and hypoallergenic jewellery designed for the modern woman. Necklaces, earrings, rings & bracelets that stay beautiful forever.",
  keywords: [
    "anti-tarnish jewellery",
    "waterproof jewellery",
    "hypoallergenic jewellery",
    "gold necklaces",
    "minimalist jewellery",
    "everyday jewellery India",
  ],
  openGraph: {
    title: "PAKHI — Premium Anti-Tarnish Jewellery",
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
      <body className="font-sans antialiased bg-ivory text-neutral-800">
        <CartProvider>
          <WishlistProvider>
            <SmoothScroll>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppButton />
            </SmoothScroll>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
