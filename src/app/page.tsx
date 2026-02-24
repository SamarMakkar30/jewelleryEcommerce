import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import BestSellers from "@/components/sections/BestSellers";
import LifestyleShowcase from "@/components/sections/LifestyleShowcase";
import SocialProof from "@/components/sections/SocialProof";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <FeaturedCategories />
      <BestSellers />
      <LifestyleShowcase />
      <SocialProof />
    </>
  );
}
