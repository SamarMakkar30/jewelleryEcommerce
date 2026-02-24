import Link from "next/link";

const policies = [
  {
    title: "Shipping Policy",
    slug: "shipping",
    description: "Learn about our shipping methods and delivery times.",
  },
  {
    title: "Return Policy",
    slug: "returns",
    description: "Our hassle-free 7-day return and exchange policy.",
  },
  {
    title: "Privacy Policy",
    slug: "privacy",
    description: "How we collect, use, and protect your information.",
  },
  {
    title: "Terms of Service",
    slug: "terms",
    description: "Terms and conditions for using our website.",
  },
];

export default function PoliciesIndexPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-blush">
        <div className="luxury-container py-8 sm:py-12 md:py-16 text-center">
          <h1 className="font-serif text-heading-1 sm:text-display text-neutral-900">Policies</h1>
        </div>
      </div>
      <div className="luxury-container py-10 sm:py-16">
        <div className="max-w-2xl mx-auto space-y-4">
          {policies.map((policy) => (
            <Link
              key={policy.slug}
              href={`/policies/${policy.slug}`}
              className="block bg-white border border-neutral-100 p-6 hover:shadow-soft transition-shadow group"
            >
              <h2 className="font-serif text-heading-4 text-neutral-900 group-hover:text-gold transition-colors">
                {policy.title}
              </h2>
              <p className="text-body-sm text-neutral-400 mt-1">
                {policy.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
