import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Order | LUNARA JEWELS — Order Tracking",
  description: "Track your Lunara Jewels order with your order ID. Get real-time updates on your delivery.",
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
