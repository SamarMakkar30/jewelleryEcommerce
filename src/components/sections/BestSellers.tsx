"use client";

import { useState, useRef, useEffect } from "react";
import { Product } from "@/data/mock";
import { useStoreData } from "@/context/AdminContext";
import ProductCard from "@/components/ui/ProductCard";
import QuickViewModal from "@/components/layout/QuickViewModal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BestSellers() {
  const { products } = useStoreData();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bestSellers = products.filter((p) =>
    p.badges.includes("Bestseller")
  );

  // Add all products if less than 4 bestsellers
  const displayProducts =
    bestSellers.length >= 4
      ? bestSellers
      : [...bestSellers, ...products.filter((p) => !p.badges.includes("Bestseller"))].slice(0, 8);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".product-card-wrapper");
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
    <>
      <section className="section-padding bg-white">
        <div className="luxury-container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] sm:text-overline uppercase tracking-[0.2em] text-gold font-medium">
                Customer Favorites
              </span>
              <h2 className="font-serif text-heading-2 sm:text-heading-1 md:text-display text-neutral-900 mt-2 sm:mt-3">
                Best Sellers
              </h2>
              <p className="text-body-sm sm:text-body text-neutral-400 mt-1.5 sm:mt-2 max-w-md">
                Our most loved pieces — tried, tested, and adored by thousands.
              </p>
            </div>
            <Link
              href="/shop?sort=bestseller"
              className="inline-flex items-center gap-2 text-body-sm font-medium text-neutral-700 hover:text-gold transition-colors group"
            >
              View All Bestsellers
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Product Grid */}
          <div
            ref={sectionRef}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-12"
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="product-card-wrapper opacity-0 translate-y-6"
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.7s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
