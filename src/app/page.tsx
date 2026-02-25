import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import BestSellers from "@/components/sections/BestSellers";
import PromoBanner from "@/components/sections/PromoBanner";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SocialProof from "@/components/sections/SocialProof";

export const metadata: Metadata = {
  title: "LUNARA JEWELS — Premium Anti-Tarnish Jewellery | By Pakhi",
  description: "Discover waterproof, anti-tarnish, and hypoallergenic jewellery designed for the modern woman. Necklaces, earrings, rings & bracelets that stay beautiful forever.",
  openGraph: {
    title: "LUNARA JEWELS — Premium Anti-Tarnish Jewellery",
    description: "Waterproof. Anti-Tarnish. Made for Everyday Elegance.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <FeaturedCategories />
      <BestSellers />
      <PromoBanner />
      <WhyChooseUs />
      <SocialProof />
    </>
  );
}
