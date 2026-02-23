"use client";

import { Product } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Star, ShieldCheck, Droplets, Sparkles } from "lucide-react";
import { useState } from "react";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[80] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[85] w-[95vw] max-w-4xl bg-ivory shadow-soft-xl animate-scale-in overflow-hidden max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Images */}
          <div className="relative aspect-square md:aspect-auto bg-neutral-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 95vw, 50vw"
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-12 h-12 border-2 overflow-hidden transition-colors ${
                      i === selectedImage
                        ? "border-gold"
                        : "border-white/60"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 space-y-4 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
            <div>
              <p className="text-overline uppercase tracking-widest text-gold mb-2">
                {product.category}
              </p>
              <h2 className="font-serif text-heading-3 text-neutral-900">
                {product.name}
              </h2>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-gold text-gold"
                        : "text-neutral-200"
                    }
                  />
                ))}
              </div>
              <span className="text-body-sm text-neutral-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-heading-3 font-serif text-neutral-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.comparePrice && (
                <>
                  <span className="text-body text-neutral-400 line-through">
                    ₹{product.comparePrice.toLocaleString()}
                  </span>
                  <span className="text-body-sm font-medium text-green-600 bg-green-50 px-2 py-0.5">
                    Save ₹
                    {(
                      product.comparePrice - product.price
                    ).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-100">
              <div className="text-center">
                <Droplets size={18} className="mx-auto mb-1 text-gold" />
                <p className="text-caption text-neutral-600">Waterproof</p>
              </div>
              <div className="text-center">
                <ShieldCheck size={18} className="mx-auto mb-1 text-gold" />
                <p className="text-caption text-neutral-600">Anti-Tarnish</p>
              </div>
              <div className="text-center">
                <Sparkles size={18} className="mx-auto mb-1 text-gold" />
                <p className="text-caption text-neutral-600">Hypoallergenic</p>
              </div>
            </div>

            <p className="text-body-sm text-neutral-500 leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  addItem(product);
                  onClose();
                }}
                className="btn-primary flex-1"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleItem(product)}
                className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                  wishlisted
                    ? "border-red-200 bg-red-50"
                    : "border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                <Heart
                  size={18}
                  className={
                    wishlisted ? "fill-red-400 text-red-400" : "text-neutral-600"
                  }
                />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-body-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-700 transition-colors"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
