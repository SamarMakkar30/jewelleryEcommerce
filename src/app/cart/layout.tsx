import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | LUNARA JEWELS",
  description: "Review your selected jewellery pieces and proceed to checkout.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
