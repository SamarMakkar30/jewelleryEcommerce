"use client";

import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="luxury-container py-32 text-center">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={32} className="text-neutral-400" />
        </div>
        <h1 className="font-serif text-heading-1 text-neutral-900 mb-3">
          Your Wishlist is Empty
        </h1>
        <p className="text-body text-neutral-400 mb-8 max-w-md mx-auto">
          Save your favorite pieces here and come back when you&apos;re ready.
        </p>
        <Link href="/shop" className="btn-primary">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-blush">
        <div className="luxury-container py-12 md:py-16 text-center">
          <h1 className="font-serif text-display text-neutral-900">Wishlist</h1>
          <p className="text-body text-neutral-400 mt-3">
            {items.length} saved {items.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </div>
      <div className="luxury-container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
