import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product | LUNARA JEWELS — Premium Anti-Tarnish Jewellery",
  description: "Shop premium anti-tarnish, waterproof jewellery from Lunara Jewels. Detailed product information, images, and reviews.",
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
