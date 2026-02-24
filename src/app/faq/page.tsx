import type { Metadata } from "next";
import { faqData } from "@/data/mock";
import Accordion from "@/components/ui/Accordion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | LUNARA JEWELS — Frequently Asked Questions",
  description: "Find answers about our anti-tarnish jewellery, shipping, returns, care instructions, and more.",
  openGraph: {
    title: "FAQ — LUNARA JEWELS",
    description: "Your questions about our premium jewellery, answered.",
  },
};

export default function FAQPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-blush">
        <div className="luxury-container py-8 sm:py-12 md:py-16 text-center">
          <span className="text-[10px] sm:text-overline uppercase tracking-[0.2em] text-gold font-medium">
            Help Center
          </span>
          <h1 className="font-serif text-heading-2 sm:text-heading-1 md:text-display text-neutral-900 mt-2 sm:mt-3">
            Frequently Asked Questions
          </h1>
          <p className="text-body-sm sm:text-body text-neutral-400 mt-2 sm:mt-3 max-w-md mx-auto px-2">
            Everything you need to know about Lunara jewellery.
          </p>
        </div>
      </div>

      <div className="luxury-container py-10 sm:py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Accordion items={faqData} />
        </div>

        {/* Still have questions? */}
        <div className="text-center mt-16 pt-12 border-t border-neutral-100">
          <h3 className="font-serif text-heading-3 text-neutral-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-body-sm text-neutral-400 mb-6">
            Our team is happy to help. Reach out anytime.
          </p>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
