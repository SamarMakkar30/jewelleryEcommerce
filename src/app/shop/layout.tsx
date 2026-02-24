import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Jewellery | LUNARA JEWELS — Necklaces, Earrings, Rings & Bracelets",
  description: "Browse our complete collection of premium anti-tarnish, waterproof jewellery. Filter by category, price, and more.",
  openGraph: {
    title: "Shop — LUNARA JEWELS",
    description: "Explore our complete collection of anti-tarnish, waterproof jewellery.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
