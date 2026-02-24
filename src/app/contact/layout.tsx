import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | LUNARA JEWELS — Get in Touch",
  description: "Have a question about our jewellery? Reach out to the Lunara Jewels team via email, phone, or our contact form.",
  openGraph: {
    title: "Contact — LUNARA JEWELS",
    description: "We'd love to hear from you. Get in touch with our team.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
