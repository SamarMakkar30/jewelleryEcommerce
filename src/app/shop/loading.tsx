"use client";

import { ProductGridSkeleton } from "@/components/ui/Skeletons";

export default function ShopLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Page Header */}
      <div className="bg-cream border-b border-blush">
        <div className="luxury-container py-8 sm:py-12 md:py-16 text-center">
          <div className="h-10 bg-neutral-200 rounded w-32 mx-auto mb-3 animate-pulse" />
          <div className="h-4 bg-neutral-100 rounded w-64 mx-auto animate-pulse" />
        </div>
      </div>

      <div className="luxury-container py-8 md:py-12">
        {/* Toolbar skeleton */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-neutral-100">
          <div className="h-8 bg-neutral-200 rounded w-20 animate-pulse" />
          <div className="h-4 bg-neutral-100 rounded w-24 animate-pulse" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  );
}
