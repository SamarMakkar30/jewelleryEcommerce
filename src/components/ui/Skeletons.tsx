"use client";

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image */}
      <div className="aspect-[3/4] bg-neutral-200 rounded-sm mb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer" />
      </div>
      {/* Title */}
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
      {/* Price */}
      <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2" />
      {/* Rating */}
      <div className="h-3 bg-neutral-100 rounded w-1/2" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="luxury-container py-6 md:py-10">
        {/* Breadcrumb skeleton */}
        <div className="flex gap-2 mb-6">
          <div className="h-3 bg-neutral-200 rounded w-12 animate-pulse" />
          <div className="h-3 bg-neutral-200 rounded w-16 animate-pulse" />
          <div className="h-3 bg-neutral-200 rounded w-24 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-neutral-200 rounded-sm relative overflow-hidden animate-pulse">
              <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer" />
            </div>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 bg-neutral-200 rounded-sm animate-pulse" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Category */}
            <div className="h-3 bg-neutral-200 rounded w-20 animate-pulse" />
            {/* Title */}
            <div className="space-y-2">
              <div className="h-8 bg-neutral-200 rounded w-3/4 animate-pulse" />
              <div className="h-8 bg-neutral-200 rounded w-1/2 animate-pulse" />
            </div>
            {/* Rating */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-4 h-4 bg-neutral-200 rounded animate-pulse" />
              ))}
              <div className="h-4 bg-neutral-200 rounded w-16 ml-2 animate-pulse" />
            </div>
            {/* Price */}
            <div className="flex gap-3 items-center">
              <div className="h-8 bg-neutral-200 rounded w-24 animate-pulse" />
              <div className="h-5 bg-neutral-100 rounded w-16 animate-pulse" />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-neutral-100 rounded w-full animate-pulse" />
              <div className="h-4 bg-neutral-100 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-neutral-100 rounded w-2/3 animate-pulse" />
            </div>
            {/* Trust badges */}
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-neutral-100 rounded w-28 animate-pulse" />
              ))}
            </div>
            {/* Quantity + Add to Cart */}
            <div className="flex gap-4">
              <div className="h-12 bg-neutral-200 rounded w-32 animate-pulse" />
              <div className="h-12 bg-neutral-200 rounded flex-1 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
