"use client";

import {
  Droplets,
  Shield,
  Heart,
  RotateCcw,
  Sparkles,
  Award,
} from "lucide-react";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: Droplets,
    title: "100% Waterproof",
    description:
      "Shower, swim, sweat — our jewellery handles it all. No fading, no damage, no worries.",
    highlight: "Swim-proof",
  },
  {
    icon: Shield,
    title: "Anti-Tarnish Coated",
    description:
      "Premium multi-layer coating that keeps your pieces shiny and new for years, not weeks.",
    highlight: "Stays shiny forever",
  },
  {
    icon: Heart,
    title: "Skin-Safe & Hypoallergenic",
    description:
      "Nickel-free, lead-free, and crafted for sensitive skin. Zero irritation guaranteed.",
    highlight: "Dermatologist approved",
  },
  {
    icon: Sparkles,
    title: "Premium Craftsmanship",
    description:
      "Each piece is handcrafted with precision — from clasp to gemstone, quality you can feel.",
    highlight: "Handcrafted quality",
  },
  {
    icon: RotateCcw,
    title: "7-Day Easy Returns",
    description:
      "Not in love? Send it back within 7 days for a full refund. No questions asked.",
    highlight: "Risk-free purchase",
  },
  {
    icon: Award,
    title: "Trusted by 5,000+ Women",
    description:
      "Join thousands of happy customers who chose jewellery that lasts as long as their style.",
    highlight: "4.8★ average rating",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".why-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="luxury-container">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[11px] sm:text-overline uppercase tracking-[0.2em] text-gold font-medium">
            The LUNARA Difference
          </span>
          <h2 className="font-serif text-heading-2 sm:text-heading-1 md:text-display text-neutral-900 mt-2 sm:mt-3">
            Why Choose Us
          </h2>
          <p className="text-body-sm sm:text-body text-neutral-400 mt-2 sm:mt-3 max-w-lg mx-auto px-2">
            Not all jewellery is created equal. Here&apos;s what makes LUNARA the smart choice.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="why-card opacity-0 translate-y-6 group relative bg-cream/50 border border-blush/60 rounded-2xl p-6 sm:p-8 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
                style={{ transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.4s, box-shadow 0.4s" }}
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center mb-5 group-hover:from-gold/20 group-hover:to-gold/10 transition-all duration-400">
                  <Icon
                    size={24}
                    className="text-gold group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="font-serif text-lg sm:text-xl text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-body-sm text-neutral-500 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Highlight Tag */}
                <span className="inline-block text-[11px] sm:text-[11px] uppercase tracking-wider font-medium text-gold bg-gold/8 px-3 py-1.5 rounded-full">
                  {feature.highlight}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-14">
          <p className="text-sm sm:text-base font-semibold text-neutral-600 mb-5">
            Still not sure? Our jewellery speaks for itself.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-neutral-800 transition-colors duration-300 shadow-md hover:shadow-xl"
          >
            Explore Collection
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
