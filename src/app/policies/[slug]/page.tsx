import Link from "next/link";
import { ChevronRight } from "lucide-react";

const policyContent: Record<
  string,
  { title: string; content: string[] }
> = {
  shipping: {
    title: "Shipping Policy",
    content: [
      "We offer pan-India shipping with the following timelines:",
      "**Standard Shipping (Free on orders above ₹999):** 3–5 business days for most locations. Metro cities typically receive orders within 2–3 days.",
      "**Express Shipping (₹149):** 1–2 business days for metro cities and select locations.",
      "All orders are carefully packaged in our signature luxury boxes to ensure your jewellery arrives in perfect condition.",
      "Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your order anytime using our Track Order page.",
      "We currently ship within India only. International shipping will be available soon.",
      "Orders placed before 2 PM IST on business days are typically dispatched the same day.",
    ],
  },
  returns: {
    title: "Return Policy",
    content: [
      "We want you to love your Pakhi jewellery. If for any reason you're not satisfied, we offer a hassle-free return policy.",
      "**7-Day Return Window:** You can initiate a return within 7 days of receiving your order.",
      "**Condition:** Items must be unused, unworn, and in their original packaging with all tags attached.",
      "**How to Return:** Contact our support team at hello@pakhi.in or call +91 98765 43210. We'll arrange a pickup at no extra cost.",
      "**Refund:** Once we receive and inspect the returned item, your refund will be processed within 3–5 business days to your original payment method.",
      "**Exchanges:** We're happy to exchange your item for a different size or design, subject to availability.",
      "**Non-Returnable Items:** Customized or personalized items, items on final sale, and gift cards are not eligible for returns.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    content: [
      "At Pakhi, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.",
      "**Information We Collect:** Name, email, phone number, shipping address, and payment information when you place an order. We also collect browsing data through cookies to improve your shopping experience.",
      "**How We Use Your Information:** To process and deliver your orders, send order updates and tracking information, send marketing communications (only with your consent), and improve our website and services.",
      "**Data Security:** We use industry-standard encryption (256-bit SSL) to protect your payment and personal information. We never store complete credit card numbers on our servers.",
      "**Third-Party Sharing:** We do not sell your personal information. We only share necessary data with shipping partners and payment processors to fulfill your orders.",
      "**Your Rights:** You can request access to, correction of, or deletion of your personal data at any time by contacting us at hello@pakhi.in.",
      "**Cookies:** We use cookies to remember your preferences, keep items in your cart, and analyze site traffic. You can manage cookie preferences in your browser settings.",
    ],
  },
  terms: {
    title: "Terms of Service",
    content: [
      "Welcome to Pakhi. By accessing our website and making a purchase, you agree to the following terms.",
      "**Products:** All products are described as accurately as possible. Colors may vary slightly due to monitor settings. Product images are for reference.",
      "**Pricing:** All prices are in Indian Rupees (₹) and include applicable taxes. We reserve the right to modify prices at any time without prior notice.",
      "**Orders:** Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order for reasons including product availability, pricing errors, or suspicious activity.",
      "**Payment:** We accept UPI, credit/debit cards, net banking, and cash on delivery. Payment must be completed before shipment for prepaid orders.",
      "**Intellectual Property:** All content on this website, including images, text, logos, and designs, is the property of Pakhi and is protected by copyright law.",
      "**Limitation of Liability:** Pakhi shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.",
      "**Governing Law:** These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Mumbai, Maharashtra.",
      "For any questions about these terms, please contact us at hello@pakhi.in.",
    ],
  },
};

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = policyContent[params.slug];

  if (!policy) {
    return (
      <div className="luxury-container py-32 text-center">
        <h1 className="font-serif text-heading-1 text-neutral-900 mb-4">
          Policy Not Found
        </h1>
        <Link href="/policies" className="btn-primary">
          View All Policies
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Breadcrumb */}
      <div className="luxury-container py-4">
        <nav className="flex items-center gap-2 text-caption text-neutral-400">
          <Link href="/" className="hover:text-neutral-700 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/policies"
            className="hover:text-neutral-700 transition-colors"
          >
            Policies
          </Link>
          <ChevronRight size={12} />
          <span className="text-neutral-600">{policy.title}</span>
        </nav>
      </div>

      <div className="luxury-container py-10 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-display text-neutral-900 mb-10">
            {policy.title}
          </h1>
          <div className="space-y-5">
            {policy.content.map((para, i) => {
              // Parse bold markers
              const parts = para.split(/\*\*(.*?)\*\*/g);
              return (
                <p
                  key={i}
                  className="text-body text-neutral-500 leading-relaxed"
                >
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong
                        key={j}
                        className="font-semibold text-neutral-700"
                      >
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
