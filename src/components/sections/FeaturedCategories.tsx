"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/mock";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function FeaturedCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".category-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding">
      <div className="luxury-container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-overline uppercase tracking-[0.2em] text-gold font-medium">
            Collections
          </span>
          <h2 className="font-serif text-heading-1 md:text-display text-neutral-900 mt-3">
            Shop by Category
          </h2>
          <p className="text-body text-neutral-400 mt-3 max-w-md mx-auto">
            Discover our curated collections — each piece designed to stay beautiful forever.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="category-card group relative aspect-[3/4] overflow-hidden opacity-0 translate-y-8"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.8s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-800 ease-luxury group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent transition-opacity duration-400" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-serif text-heading-3 text-ivory mb-1">
                  {cat.name}
                </h3>
                <p className="text-body-sm text-neutral-300 mb-3 hidden md:block">
                  {cat.description}
                </p>
                <div className="flex items-center gap-2 text-gold text-body-sm font-medium group-hover:gap-3 transition-all duration-400">
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Product Count Badge */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-ivory text-caption px-2.5 py-1 rounded-pill">
                {cat.productCount} pieces
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
