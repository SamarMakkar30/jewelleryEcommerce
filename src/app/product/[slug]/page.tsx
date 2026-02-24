"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Droplets,
  Sparkles,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  ZoomIn,
} from "lucide-react";
import { reviews as mockReviews } from "@/data/mock";
import { useStoreData } from "@/context/AdminContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ui/ProductCard";
import ReviewCard from "@/components/ui/ReviewCard";
import Accordion from "@/components/ui/Accordion";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { products } = useStoreData();
  const product = products.find((p) => p.slug === slug);

  const router = useRouter();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Related products
  const relatedProducts = products
    .filter((p) => p.categorySlug === product?.categorySlug && p.id !== product?.id)
    .slice(0, 4);

  // Scroll reveal for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [slug]);

  if (!product) {
    return (
      <div className="luxury-container py-32 text-center">
        <h1 className="font-serif text-heading-1 text-neutral-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-body text-neutral-500 mb-8">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/shop" className="btn-primary">
          Browse All Products
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const productFaq = [
    {
      question: "Shipping & Delivery",
      answer:
        "Free shipping on orders above ₹999. Standard delivery takes 3–5 business days. Metro cities receive orders within 2–3 days.",
    },
    {
      question: "Returns & Exchanges",
      answer:
        "We offer a 7-day hassle-free return policy. Items must be unused and in original packaging. Contact our team to initiate a return.",
    },
    {
      question: "Care Instructions",
      answer:
        "While our jewellery is waterproof and anti-tarnish, we recommend wiping with a soft cloth after exposure to chemicals. Store in the provided pouch.",
    },
  ];

  return (
    <div className="bg-ivory">
      {/* Breadcrumb */}
      <div className="luxury-container py-4">
        <nav className="flex items-center gap-2 text-caption text-neutral-400">
          <Link href="/" className="hover:text-neutral-700 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-neutral-700 transition-colors">
            Shop
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-neutral-700 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-neutral-600">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="luxury-container pb-12 sm:pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div
              ref={imageRef}
              className="relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleZoom}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
              />

              {/* Badges */}
              {product.badges.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className="bg-neutral-900 text-ivory text-overline px-3 py-1.5 uppercase tracking-widest"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center z-10">
                <ZoomIn size={18} className="text-neutral-600" />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-24 overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-gold"
                        : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:sticky md:top-24 md:self-start space-y-6">
            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="text-overline uppercase tracking-[0.2em] text-gold font-medium">
                {product.category}
              </span>
              {discount > 0 && (
                <span className="text-overline bg-gold/10 text-gold px-2 py-0.5 font-medium">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-heading-2 sm:text-heading-1 text-neutral-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
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
            <div className="flex items-baseline gap-3 pb-6 border-b border-neutral-100">
              <span className="font-serif text-heading-3 sm:text-heading-2 text-neutral-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.comparePrice && (
                <span className="text-body text-neutral-400 line-through">
                  ₹{product.comparePrice.toLocaleString()}
                </span>
              )}
              <span className="text-caption text-neutral-400">
                (incl. of all taxes)
              </span>
            </div>

            {/* Description */}
            <p className="text-body text-neutral-500 leading-relaxed">
              {product.description}
            </p>

            {/* Benefits Strip */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-neutral-100">
              <div className="text-center">
                <Droplets
                  size={20}
                  className="mx-auto mb-1.5 text-gold"
                  strokeWidth={1.5}
                />
                <p className="text-caption font-medium text-neutral-700">
                  Waterproof
                </p>
              </div>
              <div className="text-center">
                <ShieldCheck
                  size={20}
                  className="mx-auto mb-1.5 text-gold"
                  strokeWidth={1.5}
                />
                <p className="text-caption font-medium text-neutral-700">
                  Anti-Tarnish
                </p>
              </div>
              <div className="text-center">
                <Sparkles
                  size={20}
                  className="mx-auto mb-1.5 text-gold"
                  strokeWidth={1.5}
                />
                <p className="text-caption font-medium text-neutral-700">
                  Hypoallergenic
                </p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-body-sm text-neutral-600"
                >
                  <span className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Stock Urgency */}
            {product.stockCount && product.stockCount <= 10 && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 px-4 py-2.5">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-body-sm text-amber-700">
                  Only {product.stockCount} left in stock — order soon!
                </span>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 pt-2">
              {/* Quantity Selector */}
              <div className="flex items-center border border-neutral-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-12 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-11 h-12 flex items-center justify-center text-body font-medium border-x border-neutral-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-12 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addItem(product, quantity)}
                className="btn-primary flex-1 gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart — ₹{(product.price * quantity).toLocaleString()}
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => toggleItem(product)}
                className={`flex items-center gap-2 text-body-sm transition-colors ${
                  wishlisted
                    ? "text-red-500"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <Heart
                  size={16}
                  className={wishlisted ? "fill-red-400" : ""}
                />
                {wishlisted ? "Saved" : "Add to Wishlist"}
              </button>
              <button className="flex items-center gap-2 text-body-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                <Share2 size={16} />
                Share
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-neutral-50 p-5 space-y-3 border border-neutral-100">
              <div className="flex items-center gap-3 text-body-sm">
                <Truck size={18} className="text-gold flex-shrink-0" />
                <div>
                  <p className="font-medium text-neutral-700">
                    Free Delivery
                  </p>
                  <p className="text-caption text-neutral-400">
                    Estimated 3–5 business days
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-body-sm">
                <RotateCcw size={18} className="text-gold flex-shrink-0" />
                <div>
                  <p className="font-medium text-neutral-700">
                    Easy Returns
                  </p>
                  <p className="text-caption text-neutral-400">
                    7-day hassle-free returns
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-body-sm">
                <ShieldCheck size={18} className="text-gold flex-shrink-0" />
                <div>
                  <p className="font-medium text-neutral-700">
                    Anti-Tarnish Guarantee
                  </p>
                  <p className="text-caption text-neutral-400">
                    Stays shiny & new — guaranteed
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <Accordion items={productFaq} />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div
        className="reveal-section bg-white section-padding opacity-0 translate-y-8"
        style={{
          transitionProperty: "opacity, transform",
          transitionDuration: "0.8s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="luxury-container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-heading-3 sm:text-heading-2 text-neutral-900">
              Customer Reviews
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>
              <span className="text-body-sm text-neutral-500">
                {product.rating} out of 5 ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {mockReviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div
          className="reveal-section section-padding opacity-0 translate-y-8"
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "0.8s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="luxury-container">
            <h2 className="font-serif text-heading-3 sm:text-heading-2 text-neutral-900 text-center mb-8 sm:mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-ivory/95 backdrop-blur-xl border-t border-neutral-100 px-4 py-3 z-40 md:hidden safe-bottom">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-shrink">
            <p className="text-body-sm font-medium text-neutral-900 line-clamp-1">
              {product.name}
            </p>
            <p className="font-serif text-heading-4 text-neutral-900">
              ₹{product.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="btn-primary flex-1 py-3 min-h-[48px]"
          >
            <ShoppingBag size={16} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
