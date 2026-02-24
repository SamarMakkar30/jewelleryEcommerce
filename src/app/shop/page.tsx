"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { categories, Product } from "@/data/mock";
import { useStoreData } from "@/context/AdminContext";
import ProductCard from "@/components/ui/ProductCard";
import QuickViewModal from "@/components/layout/QuickViewModal";
import { ProductGridSkeleton } from "@/components/ui/Skeletons";
import {
  SlidersHorizontal,
  ChevronDown,
  Grid3X3,
  LayoutGrid,
  X,
} from "lucide-react";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "bestseller", label: "Best Sellers" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopPage() {
  const { products } = useStoreData();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categorySlug.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.categorySlug === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "bestseller":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy, priceRange, searchQuery]);

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".shop-item");
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = "1";
                (item as HTMLElement).style.transform = "translateY(0)";
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [filteredProducts]);

  return (
    <>
      <div className="bg-ivory min-h-screen">
        {/* Page Header */}
        <div className="bg-cream border-b border-blush">
          <div className="luxury-container py-8 sm:py-12 md:py-16 text-center">
            <h1 className="font-serif text-heading-1 sm:text-display text-neutral-900">
              {searchQuery ? `Results for "${searchQuery}"` : "Shop"}
            </h1>
            <p className="text-body-sm sm:text-body text-neutral-400 mt-2 sm:mt-3 max-w-md mx-auto px-2">
              {searchQuery
                ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} found`
                : "Explore our complete collection of anti-tarnish, waterproof jewellery."}
            </p>
            {searchQuery && (
              <button
                onClick={() => router.push("/shop")}
                className="mt-3 inline-flex items-center gap-1.5 text-body-sm text-gold hover:text-neutral-900 transition-colors"
              >
                <X size={14} />
                Clear search
              </button>
            )}
          </div>
        </div>

        <div className="luxury-container py-8 md:py-12">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-neutral-100">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-body-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors min-h-[40px] px-2"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              {/* Category Quick Filters */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-1.5 text-body-sm transition-colors rounded-pill ${
                    selectedCategory === "all"
                      ? "bg-neutral-900 text-ivory"
                      : "text-neutral-500 hover:bg-neutral-100"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-1.5 text-body-sm transition-colors rounded-pill ${
                      selectedCategory === cat.slug
                        ? "bg-neutral-900 text-ivory"
                        : "text-neutral-500 hover:bg-neutral-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-caption text-neutral-400 hidden sm:block">
                {filteredProducts.length} products
              </span>

              {/* Grid Toggle */}
              <div className="hidden md:flex items-center gap-1 border border-neutral-200 p-0.5">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 transition-colors ${
                    gridCols === 3 ? "bg-neutral-100" : ""
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 transition-colors ${
                    gridCols === 4 ? "bg-neutral-100" : ""
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border border-neutral-200 px-3 py-2 pr-7 sm:px-4 sm:pr-8 text-[12px] sm:text-body-sm text-neutral-700 outline-none focus:border-gold cursor-pointer min-h-[40px]"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mb-8 p-6 bg-white border border-neutral-100 shadow-soft-sm animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-body font-medium text-neutral-800">
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter (mobile) */}
                <div className="md:hidden">
                  <label className="text-overline uppercase tracking-widest text-neutral-400 mb-3 block">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`px-3 py-2 text-body-sm border transition-colors min-h-[36px] ${
                        selectedCategory === "all"
                          ? "border-neutral-900 bg-neutral-900 text-ivory"
                          : "border-neutral-200 text-neutral-600"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`px-3 py-2 text-body-sm border transition-colors min-h-[36px] ${
                          selectedCategory === cat.slug
                            ? "border-neutral-900 bg-neutral-900 text-ivory"
                            : "border-neutral-200 text-neutral-600"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-overline uppercase tracking-widest text-neutral-400 mb-3 block">
                    Price Range
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-28 sm:w-24 border border-neutral-200 px-3 py-2.5 text-body-sm outline-none focus:border-gold min-h-[44px]"
                      placeholder="Min"
                    />
                    <span className="text-neutral-300">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-28 sm:w-24 border border-neutral-200 px-3 py-2.5 text-body-sm outline-none focus:border-gold min-h-[44px]"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setPriceRange([0, 5000]);
                      setSortBy("newest");
                    }}
                    className="text-body-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div
            ref={gridRef}
            className={`grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 ${
              gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {!mounted ? (
              <ProductGridSkeleton count={8} />
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="shop-item opacity-0 translate-y-4"
                  style={{
                    transitionProperty: "opacity, transform",
                    transitionDuration: "0.6s",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <ProductCard
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                </div>
              ))
            )}
          </div>

          {/* Empty State */}
          {mounted && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-serif text-heading-3 text-neutral-300 mb-3">
                No products found
              </p>
              <p className="text-body-sm text-neutral-400 mb-6">
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 5000]);
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
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
