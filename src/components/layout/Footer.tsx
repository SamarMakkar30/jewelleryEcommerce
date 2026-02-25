"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useStoreData } from "@/context/AdminContext";

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
  const { settings } = useStoreData();
  const router = useRouter();
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretTap = useCallback(() => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (tapCount.current >= 4) {
      tapCount.current = 0;
      router.push("/admin");
      return;
    }
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 1500);
  }, [router]);
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* WhatsApp CTA */}
      <div className="border-b border-neutral-800">
        <div className="luxury-container py-12 sm:py-16 md:py-20">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366]/10 mb-5">
              <MessageCircle size={28} className="text-[#25D366]" />
            </div>
            <h3 className="font-serif text-heading-3 sm:text-heading-2 text-ivory mb-3">
              Get Updates on WhatsApp
            </h3>
            <p className="text-body-sm text-neutral-400 mb-6 sm:mb-8 px-2">
              New drops, exclusive offers & restocks — be the first to know.
              Chat with us anytime for styling help or order queries.
            </p>
            <a
              href="https://wa.me/917206889528?text=Hi%20Lunara!%20I%27d%20love%20to%20get%20updates%20on%20new%20collections%20and%20offers%20%E2%9C%A8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-3.5 text-body-sm font-medium uppercase tracking-wide hover:bg-[#1ebe5d] transition-colors min-h-[48px] rounded-sm"
            >
              <MessageCircle size={18} />
              Chat with Us
            </a>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="luxury-container py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-heading-3 text-ivory">
                LUNARA
              </span>
              <span className="text-gold ml-1">✦</span>
            </Link>
            <p className="text-body-sm text-neutral-400 mb-6 leading-relaxed">
              Premium anti-tarnish jewellery designed for the modern woman.
              Waterproof. Hypoallergenic. Made to last.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 flex items-center justify-center border border-neutral-700 text-neutral-400 hover:text-ivory hover:border-gold transition-colors"
                >
                  <Icon size={18} />
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
                    className="text-body-sm text-neutral-400 hover:text-ivory transition-colors py-1.5 inline-block"
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
                    className="text-body-sm text-neutral-400 hover:text-ivory transition-colors py-1.5 inline-block"
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
                    className="text-body-sm text-neutral-400 hover:text-ivory transition-colors py-1.5 inline-block"
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
                <Mail size={14} /> {settings.email}
              </li>
              <li className="flex items-center gap-2 text-body-sm text-neutral-400">
                <Phone size={14} /> {settings.phone}
              </li>
              <li className="flex items-start gap-2 text-body-sm text-neutral-400">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" /> {settings.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="luxury-container py-6 sm:py-8 flex flex-col items-center justify-center gap-4 sm:gap-5">
          <div className="text-center">
            <p className="font-serif text-heading-3 sm:text-heading-2 text-ivory tracking-wide">LUNARA JEWELS</p>
            <p className="text-[11px] sm:text-xs tracking-[0.15em] uppercase mt-2 bg-gradient-to-r from-neutral-500 via-gold to-neutral-500 bg-clip-text text-transparent font-medium">
              By Pakhi
            </p>
          </div>
          <p className="text-caption text-neutral-500 text-center">
            © <span onClick={handleSecretTap} className="cursor-default select-none">2026</span> Lunara Jewels. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-caption text-neutral-500">
              Secure Payments
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-caption text-neutral-400 flex-wrap justify-center">
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
