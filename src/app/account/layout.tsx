import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | LUNARA JEWELS — Profile & Preferences",
  description: "Manage your profile, view orders, and update your preferences at Lunara Jewels.",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
