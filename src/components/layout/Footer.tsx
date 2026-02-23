import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=bestseller" },
    { label: "Necklaces", href: "/category/necklaces" },
    { label: "Earrings", href: "/category/earrings" },
    { label: "Rings", href: "/category/rings" },
    { label: "Bracelets", href: "/category/bracelets" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Track Order", href: "/track-order" },
  ],
  policies: [
    { label: "Shipping Policy", href: "/policies/shipping" },
    { label: "Return Policy", href: "/policies/returns" },
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "Terms of Service", href: "/policies/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Newsletter */}
      <div className="border-b border-neutral-800">
        <div className="luxury-container py-16 md:py-20">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-serif text-heading-2 text-ivory mb-3">
              Join the Inner Circle
            </h3>
            <p className="text-body-sm text-neutral-400 mb-8">
              Be the first to know about new collections, exclusive offers, and
              styling tips. Get 10% off your first order.
            </p>
            <form className="flex gap-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-neutral-800 border border-neutral-700 px-5 py-3.5 text-body-sm text-ivory placeholder:text-neutral-500 outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-gold text-white px-6 py-3.5 text-body-sm font-medium uppercase tracking-wide hover:bg-gold-dark transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="luxury-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-heading-3 text-ivory">
                PAKHI
              </span>
              <span className="text-gold ml-1">✦</span>
            </Link>
            <p className="text-body-sm text-neutral-400 mb-6 leading-relaxed">
              Premium anti-tarnish jewellery designed for the modern woman.
              Waterproof. Hypoallergenic. Made to last.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border border-neutral-700 text-neutral-400 hover:text-ivory hover:border-gold transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-overline uppercase tracking-widest text-ivory mb-5 font-semibold">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-400 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-overline uppercase tracking-widest text-ivory mb-5 font-semibold">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-400 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies + Contact */}
          <div>
            <h4 className="text-overline uppercase tracking-widest text-ivory mb-5 font-semibold">
              Policies
            </h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.policies.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-400 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-overline uppercase tracking-widest text-ivory mb-4 font-semibold">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-body-sm text-neutral-400">
                <Mail size={14} /> hello@pakhi.in
              </li>
              <li className="flex items-center gap-2 text-body-sm text-neutral-400">
                <Phone size={14} /> +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-body-sm text-neutral-400">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" /> Mumbai,
                India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="luxury-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-neutral-500">
            © 2026 Pakhi Jewels. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-caption text-neutral-500">
              Secure Payments
            </span>
            <div className="flex items-center gap-2 text-caption text-neutral-400">
              <span className="px-2 py-1 border border-neutral-700 rounded text-[10px]">
                VISA
              </span>
              <span className="px-2 py-1 border border-neutral-700 rounded text-[10px]">
                Mastercard
              </span>
              <span className="px-2 py-1 border border-neutral-700 rounded text-[10px]">
                UPI
              </span>
              <span className="px-2 py-1 border border-neutral-700 rounded text-[10px]">
                COD
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
