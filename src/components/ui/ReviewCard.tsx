"use client";

import { Star, Quote } from "lucide-react";
import { Review } from "@/data/mock";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white p-6 md:p-8 shadow-soft-sm border border-neutral-100 space-y-4 relative group hover:shadow-soft transition-shadow duration-400">
      {/* Quote icon */}
      <Quote
        size={24}
        className="text-gold/20 absolute top-6 right-6"
      />

      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < review.rating
                ? "fill-gold text-gold"
                : "text-neutral-200"
            }
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-body-sm text-neutral-600 leading-relaxed">
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2">
        <div className="w-8 h-8 rounded-full bg-blush flex items-center justify-center text-overline font-semibold text-neutral-600 uppercase">
          {review.name[0]}
        </div>
        <div>
          <p className="text-body-sm font-medium text-neutral-800">
            {review.name}
          </p>
          {review.verified && (
            <p className="text-caption text-gold flex items-center gap-1">
              ✓ Verified Buyer
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
