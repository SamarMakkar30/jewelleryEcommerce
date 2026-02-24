import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | LUNARA JEWELS — Shop by Category",
  description: "Browse jewellery by category — necklaces, earrings, rings, and bracelets. Premium anti-tarnish pieces for every occasion.",
  openGraph: {
    title: "Categories — LUNARA JEWELS",
    description: "Shop by category — necklaces, earrings, rings & bracelets.",
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
