import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | LUNARA JEWELS — Complete Your Order",
  description: "Enter your details and complete your order for premium anti-tarnish jewellery.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
