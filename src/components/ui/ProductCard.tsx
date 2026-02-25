"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="group relative">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
        {/* Shimmer Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer-loading" />
        )}

        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-transform duration-800 ease-luxury group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="bg-neutral-900 text-ivory text-overline px-2.5 py-1 uppercase tracking-widest"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-gold text-white text-overline px-2.5 py-1 font-medium">
            -{discount}%
          </span>
        )}

        {/* Hover Actions — visible on hover (desktop) or always on touch */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-luxury touch-show">
          <button
            onClick={() => addItem(product)}
            className="flex-1 bg-neutral-900 text-ivory text-[12px] sm:text-body-sm font-medium py-2.5 sm:py-2.5 flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-neutral-800 transition-colors min-h-[44px]"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="bg-white/90 backdrop-blur-sm text-neutral-900 p-2.5 hover:bg-white transition-colors hidden sm:block"
            >
              <Eye size={15} />
            </button>
          )}
        </div>

        {/* Wishlist Button — always visible on touch devices */}
        <button
          onClick={() => toggleItem(product)}
          className={`absolute top-3 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity duration-300 hover:bg-white ${discount > 0 ? 'right-14' : 'right-3'}`}
        >
          <Heart
            size={14}
            className={wishlisted ? "fill-red-400 text-red-400" : "text-neutral-600"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="space-y-1 sm:space-y-1.5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-sans text-[13px] sm:text-body-sm font-medium text-neutral-800 group-hover:text-neutral-600 transition-colors line-clamp-2 leading-tight sm:leading-normal">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-gold text-gold"
                    : "text-neutral-300"
                }
              />
            ))}
          </div>
          <span className="text-[11px] sm:text-caption text-neutral-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="font-sans text-body-sm sm:text-body font-semibold text-neutral-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.comparePrice && (
            <span className="text-[11px] sm:text-body-sm text-neutral-400 line-through">
              ₹{product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
