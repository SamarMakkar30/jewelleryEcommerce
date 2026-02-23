// ─── Product Types ──────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  category: string;
  categorySlug: string;
  images: string[];
  rating: number;
  reviewCount: number;
  badges: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stockCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ─── Navigation ─────────────────────────────────────────────────────────────
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Jewellery", href: "/shop" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=bestseller" },
      { label: "Sale", href: "/shop?sort=sale" },
    ],
  },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "Necklaces", href: "/category/necklaces" },
      { label: "Earrings", href: "/category/earrings" },
      { label: "Rings", href: "/category/rings" },
      { label: "Bracelets", href: "/category/bracelets" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─── Categories ─────────────────────────────────────────────────────────────
export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Necklaces",
    slug: "necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    productCount: 24,
    description: "Elegant chains and pendants crafted to last.",
  },
  {
    id: "cat-2",
    name: "Earrings",
    slug: "earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop",
    productCount: 32,
    description: "From everyday studs to statement drops.",
  },
  {
    id: "cat-3",
    name: "Rings",
    slug: "rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop",
    productCount: 18,
    description: "Stackable, bold, or delicate — always tarnish-free.",
  },
  {
    id: "cat-4",
    name: "Bracelets",
    slug: "bracelets",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop",
    productCount: 21,
    description: "Waterproof bracelets for every occasion.",
  },
];

// ─── Products ───────────────────────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "prod-1",
    name: "Minimal Gold Chain Necklace",
    slug: "minimal-gold-chain-necklace",
    price: 1299,
    comparePrice: 1799,
    category: "Necklaces",
    categorySlug: "necklaces",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?w=800&h=1000&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 156,
    badges: ["Bestseller", "Anti-Tarnish"],
    description:
      "Our signature minimal chain crafted with premium anti-tarnish coating. Waterproof, sweat-proof, and perfect for everyday elegance. Pair it with your favorite pendant or wear it solo for a timeless look.",
    features: [
      "100% Anti-Tarnish Coating",
      "Waterproof & Sweat-proof",
      "Hypoallergenic — safe for sensitive skin",
      "Adjustable 16–18 inch length",
      "Lobster clasp closure",
    ],
    inStock: true,
    stockCount: 12,
  },
  {
    id: "prod-2",
    name: "Pearl Drop Huggie Earrings",
    slug: "pearl-drop-huggie-earrings",
    price: 899,
    comparePrice: 1299,
    category: "Earrings",
    categorySlug: "earrings",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&h=1000&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 203,
    badges: ["New Arrival", "Trending"],
    description:
      "Delicate pearl drops on a secure huggie hoop. These beauties transition from desk to dinner effortlessly.",
    features: [
      "Anti-Tarnish plating",
      "Freshwater pearl accents",
      "Nickel-free and hypoallergenic",
      "Secure snap closure",
    ],
    inStock: true,
    stockCount: 8,
  },
  {
    id: "prod-3",
    name: "Stacking Ring Set — Gold",
    slug: "stacking-ring-set-gold",
    price: 999,
    category: "Rings",
    categorySlug: "rings",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 98,
    badges: ["Bestseller"],
    description:
      "A curated set of three stackable rings in polished gold. Mix, match, and stack your way to the perfect hand look.",
    features: [
      "Set of 3 rings",
      "Anti-Tarnish plating",
      "Waterproof",
      "Available in sizes 5–9",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "prod-4",
    name: "Tennis Bracelet — Crystal",
    slug: "tennis-bracelet-crystal",
    price: 1499,
    comparePrice: 1999,
    category: "Bracelets",
    categorySlug: "bracelets",
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 87,
    badges: ["Premium", "Anti-Tarnish"],
    description:
      "A classic tennis bracelet set with sparkling cubic zirconia stones. The anti-tarnish coating ensures it stays brilliant through every occasion.",
    features: [
      "Cubic Zirconia stones",
      "Anti-Tarnish guaranteed",
      "Waterproof & sweat-proof",
      "Adjustable clasp",
      "Gift-ready packaging",
    ],
    inStock: true,
    stockCount: 5,
  },
  {
    id: "prod-5",
    name: "Layered Coin Necklace",
    slug: "layered-coin-necklace",
    price: 1599,
    category: "Necklaces",
    categorySlug: "necklaces",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 64,
    badges: ["New Arrival"],
    description:
      "Two delicate layers featuring a petite coin pendant. Pre-layered for effortless styling.",
    features: [
      "Pre-layered design",
      "Anti-Tarnish coating",
      "Waterproof",
      "16 + 18 inch layers",
    ],
    inStock: true,
    stockCount: 20,
  },
  {
    id: "prod-6",
    name: "Minimalist Bar Studs",
    slug: "minimalist-bar-studs",
    price: 599,
    category: "Earrings",
    categorySlug: "earrings",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 142,
    badges: ["Bestseller", "Under ₹699"],
    description:
      "Sleek, understated bar studs that complement every outfit. A wardrobe essential.",
    features: [
      "Anti-Tarnish finish",
      "Hypoallergenic posts",
      "Butterfly back closure",
      "Lightweight: 1.2g each",
    ],
    inStock: true,
    stockCount: 30,
  },
  {
    id: "prod-7",
    name: "Twist Band Ring",
    slug: "twist-band-ring",
    price: 799,
    category: "Rings",
    categorySlug: "rings",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop",
    ],
    rating: 4.5,
    reviewCount: 56,
    badges: [],
    description:
      "A sculptural twist ring that adds an artful touch to any stack.",
    features: [
      "Anti-Tarnish plating",
      "Waterproof",
      "Available in sizes 5–9",
    ],
    inStock: true,
    stockCount: 22,
  },
  {
    id: "prod-8",
    name: "Chain Link Bracelet",
    slug: "chain-link-bracelet",
    price: 1099,
    comparePrice: 1399,
    category: "Bracelets",
    categorySlug: "bracelets",
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=1000&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 73,
    badges: ["Trending"],
    description:
      "Bold chain links with a polished, modern finish. Statement-making yet lightweight.",
    features: [
      "Anti-Tarnish coating",
      "Waterproof & sweat-proof",
      "Toggle clasp",
      "Adjustable length",
    ],
    inStock: true,
    stockCount: 10,
  },
];

// ─── Reviews ────────────────────────────────────────────────────────────────
export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Priya M.",
    rating: 5,
    date: "2026-01-15",
    comment:
      "Absolutely obsessed! I've been wearing this necklace in the shower for 2 weeks and it still looks brand new. Best jewellery purchase I've made.",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Ananya S.",
    rating: 5,
    date: "2026-01-20",
    comment:
      "The quality is insane for the price. I got the stacking ring set and they look like they cost 5x more. No green fingers!",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Meera K.",
    rating: 4,
    date: "2026-02-01",
    comment:
      "Beautiful minimalist designs. Shipping was super fast. The packaging felt like a luxury unboxing experience.",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Riya P.",
    rating: 5,
    date: "2026-02-10",
    comment:
      "I've worn the tennis bracelet to the gym multiple times — still shining! This is a game changer for everyday jewellery.",
    verified: true,
  },
  {
    id: "rev-5",
    name: "Kavya D.",
    rating: 5,
    date: "2026-02-15",
    comment:
      "Bought the pearl huggie earrings as a gift for my sister. She absolutely loved them. Will be ordering more for myself!",
    verified: true,
  },
];

// ─── Trust Features ─────────────────────────────────────────────────────────
export const trustFeatures = [
  {
    icon: "Droplets",
    title: "Waterproof",
    description: "Wear it in the shower, pool, or rain.",
  },
  {
    icon: "Shield",
    title: "Anti-Tarnish",
    description: "Stays shiny & new — guaranteed.",
  },
  {
    icon: "Heart",
    title: "Hypoallergenic",
    description: "100% safe for sensitive skin.",
  },
  {
    icon: "RotateCcw",
    title: "Easy Returns",
    description: "7-day hassle-free returns.",
  },
  {
    icon: "Truck",
    title: "Free Shipping",
    description: "Free delivery on orders above ₹999.",
  },
  {
    icon: "Package",
    title: "Premium Packaging",
    description: "Gift-ready luxury boxes.",
  },
];

// ─── FAQ Data ───────────────────────────────────────────────────────────────
export const faqData = [
  {
    question: "Is your jewellery really waterproof?",
    answer:
      "Yes! All our pieces are engineered with a premium anti-tarnish coating that makes them fully waterproof. You can wear them in the shower, pool, at the gym, and even at the beach without worry.",
  },
  {
    question: "What does anti-tarnish mean?",
    answer:
      "Anti-tarnish means our jewellery is coated with a protective layer that prevents oxidation and discoloration. Unlike regular fashion jewellery, our pieces won't turn green, black, or dull over time.",
  },
  {
    question: "Is it safe for sensitive skin?",
    answer:
      "Absolutely. All our jewellery is hypoallergenic and nickel-free, making it completely safe for sensitive skin. We use only skin-friendly base metals with premium plating.",
  },
  {
    question: "How do I care for my jewellery?",
    answer:
      "While our jewellery is designed to be low-maintenance, we recommend wiping it with a soft cloth after exposure to chemicals like perfume or chlorine. Store in the pouch provided to keep it looking pristine.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day hassle-free return policy. If you're not satisfied with your purchase, simply contact our team and we'll arrange a return or exchange at no extra cost.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "We ship pan-India within 3–5 business days. Metro cities typically receive orders within 2–3 days. Free shipping on orders above ₹999.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Every order comes in our signature luxury packaging at no extra charge. It's gift-ready right out of the box!",
  },
];
