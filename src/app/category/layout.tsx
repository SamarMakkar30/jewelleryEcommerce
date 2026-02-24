import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category | LUNARA JEWELS — Shop by Collection",
  description: "Browse our curated collection of premium anti-tarnish jewellery. Find the perfect piece for every occasion.",
};

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
