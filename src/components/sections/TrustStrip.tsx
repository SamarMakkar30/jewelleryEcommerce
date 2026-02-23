"use client";

import { Droplets, Shield, Heart, RotateCcw, Truck, Package } from "lucide-react";
import { trustFeatures } from "@/data/mock";
import { useEffect, useRef } from "react";

const iconMap: Record<string, React.ElementType> = {
  Droplets,
  Shield,
  Heart,
  RotateCcw,
  Truck,
  Package,
};

export default function TrustStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".trust-item");
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = "1";
                (item as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (stripRef.current) observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-cream border-y border-blush">
      <div
        ref={stripRef}
        className="luxury-container py-10 md:py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
      >
        {trustFeatures.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Shield;
          return (
            <div
              key={i}
              className="trust-item flex flex-col items-center text-center opacity-0 translate-y-4 transition-all duration-600 ease-luxury"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3 text-gold">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-body-sm font-semibold text-neutral-800 mb-1">
                {feature.title}
              </h4>
              <p className="text-caption text-neutral-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
