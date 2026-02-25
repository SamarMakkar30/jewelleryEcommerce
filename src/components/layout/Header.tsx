"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import { navigation } from "@/data/mock";
import { useStoreData } from "@/context/AdminContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { toggleCart, totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { settings } = useStoreData();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-neutral-900 text-ivory text-center py-2 px-4 text-[11px] sm:text-overline uppercase tracking-widest safe-top">
        {settings.announcementText}
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-400 ease-luxury ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-xl shadow-soft-sm"
            : "bg-ivory"
        }`}
      >
        <div className="luxury-container">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center leading-none">
              <div className="flex items-center">
                <span className="font-serif text-[18px] md:text-heading-3 tracking-tight text-neutral-900">
                  LUNARA JEWELS
                </span>
                <span className="text-gold ml-1 text-[14px] md:text-heading-4 font-serif">
                  ✦
                </span>
              </div>
              <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-gold font-medium uppercase mt-0.5">
                By Pakhi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-body-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors py-2 uppercase tracking-wide"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 animate-fade-in">
                      <div className="bg-white shadow-soft-md border border-neutral-100 min-w-[200px] py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2.5 text-body-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-neutral-700 hover:text-neutral-900 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/wishlist"
                className="p-2.5 text-neutral-700 hover:text-neutral-900 transition-colors relative hidden sm:flex items-center justify-center min-w-[44px] min-h-[44px]"
              >
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                className="p-2.5 text-neutral-700 hover:text-neutral-900 transition-colors hidden md:flex items-center justify-center min-w-[44px] min-h-[44px]"
              >
                <User size={20} />
              </Link>
              <button
                onClick={toggleCart}
                className="p-2.5 text-neutral-700 hover:text-neutral-900 transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neutral-900 text-ivory text-[10px] font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-ivory/98 backdrop-blur-xl animate-fade-in">
          <div className="luxury-container pt-6 sm:pt-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="font-serif text-heading-4 sm:text-heading-3 text-neutral-300">
                Search
              </span>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
                placeholder="Search for necklaces, rings..."
                className="w-full bg-transparent border-b-2 border-neutral-200 focus:border-gold pb-3 sm:pb-4 text-heading-4 sm:text-heading-3 md:text-heading-2 font-serif outline-none placeholder:text-neutral-300 transition-colors"
                autoFocus
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
                className="absolute right-0 bottom-4 sm:bottom-5 text-neutral-400 hover:text-neutral-700 transition-colors p-1"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
            </div>
            <div className="mt-8 sm:mt-12 max-w-2xl mx-auto">
              <p className="text-overline uppercase tracking-widest text-neutral-400 mb-4">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {["Gold Necklace", "Huggie Earrings", "Stacking Rings", "Tennis Bracelet", "Gift Sets"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        router.push(`/shop?search=${encodeURIComponent(tag)}`);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="px-4 py-2.5 bg-neutral-100 text-body-sm text-neutral-600 hover:bg-neutral-200 transition-colors rounded-pill min-h-[44px]"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-ivory animate-slide-in-right lg:hidden overflow-y-auto overscroll-contain">
          <div className="p-5 pt-20 pb-32 space-y-1">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex py-3.5 text-heading-4 font-serif text-neutral-800 border-b border-neutral-100 min-h-[48px] items-center"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-body-sm text-neutral-500 min-h-[44px] flex items-center"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-8 flex flex-col gap-3">
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-body text-neutral-600 py-3 min-h-[48px]"
              >
                <Heart size={20} /> Wishlist
                {wishlistItems.length > 0 && (
                  <span className="ml-auto w-6 h-6 bg-gold text-white text-[11px] font-bold flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-body text-neutral-600 py-3 min-h-[48px]"
              >
                <User size={20} /> Account
              </Link>
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-body text-neutral-600 py-3 min-h-[48px]"
              >
                <ShoppingBag size={20} /> Track Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
