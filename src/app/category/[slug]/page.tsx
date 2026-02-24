"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { categories, Product } from "@/data/mock";
import { useStoreData } from "@/context/AdminContext";
import ProductCard from "@/components/ui/ProductCard";
import QuickViewModal from "@/components/layout/QuickViewModal";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { products } = useStoreData();
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.categorySlug === slug);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (!category) {
    return (
      <div className="luxury-container py-32 text-center">
        <h1 className="font-serif text-heading-1 text-neutral-900 mb-4">
          Category Not Found
        </h1>
        <Link href="/shop" className="btn-primary">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-ivory min-h-screen">
        {/* Breadcrumb */}
        <div className="luxury-container py-4">
          <nav className="flex items-center gap-2 text-caption text-neutral-400">
            <Link href="/" className="hover:text-neutral-700 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link
              href="/shop"
              className="hover:text-neutral-700 transition-colors"
            >
              Shop
            </Link>
            <ChevronRight size={12} />
            <span className="text-neutral-600">{category.name}</span>
          </nav>
        </div>

        {/* Category Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/70 to-neutral-900/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="luxury-container">
              <span className="text-overline uppercase tracking-[0.2em] text-gold font-medium">
                Collection
              </span>
              <h1 className="font-serif text-heading-1 sm:text-display text-ivory mt-2">
                {category.name}
              </h1>
              <p className="text-body text-neutral-300 mt-3 max-w-md">
                {category.description}
              </p>
              <p className="text-body-sm text-neutral-400 mt-2">
                {categoryProducts.length} pieces
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="luxury-container py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-serif text-heading-3 text-neutral-300 mb-3">
                Coming Soon
              </p>
              <p className="text-body-sm text-neutral-400 mb-6">
                New pieces are being added to this collection.
              </p>
              <Link href="/shop" className="btn-primary">
                Explore All
              </Link>
            </div>
          )}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
