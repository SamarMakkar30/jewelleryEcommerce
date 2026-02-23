"use client";

import { reviews } from "@/data/mock";
import ReviewCard from "@/components/ui/ReviewCard";
import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".review-card-wrapper");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Stats
  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="section-padding bg-cream">
      <div className="luxury-container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-overline uppercase tracking-[0.2em] text-gold font-medium">
            Testimonials
          </span>
          <h2 className="font-serif text-heading-1 md:text-display text-neutral-900 mt-3">
            Loved by Thousands
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-gold text-gold"
                />
              ))}
            </div>
            <span className="text-heading-4 font-serif text-neutral-900">
              {avgRating}
            </span>
            <span className="text-body-sm text-neutral-400">
              based on 700+ reviews
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div
          ref={sectionRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="review-card-wrapper opacity-0 translate-y-6"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.7s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
