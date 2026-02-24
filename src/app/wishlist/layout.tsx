import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | LUNARA JEWELS — Your Saved Pieces",
  description: "View your saved jewellery pieces and add them to your cart when you're ready.",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
