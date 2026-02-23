import Image from "next/image";
import Link from "next/link";
import { Droplets, Shield, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-ivory">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&h=1080&fit=crop"
          alt="About Pakhi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-neutral-900/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <span className="text-overline uppercase tracking-[0.2em] text-gold font-medium">
              Our Story
            </span>
            <h1 className="font-serif text-display-xl text-ivory mt-3">
              About Pakhi
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="luxury-container max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-heading-1 text-neutral-900 mb-6">
            Jewellery That Lasts
          </h2>
          <p className="text-body text-neutral-500 leading-relaxed mb-6">
            Pakhi was born from a simple frustration — beautiful jewellery that
            turned your skin green, faded after weeks, and couldn&apos;t survive a
            single rainy day. We believed modern women deserved better.
          </p>
          <p className="text-body text-neutral-500 leading-relaxed mb-6">
            Every piece in our collection is crafted with premium anti-tarnish
            coating that&apos;s waterproof, sweat-proof, and hypoallergenic. From
            the gym to the boardroom, from beach days to date nights — Pakhi
            jewellery stays exactly as beautiful as the day you bought it.
          </p>
          <p className="text-body text-neutral-500 leading-relaxed">
            We design for the minimalist. The woman who values quality over
            quantity. The one who knows that elegance is never loud — it&apos;s
            quiet, confident, and enduring. That&apos;s the Pakhi promise.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="luxury-container">
          <div className="text-center mb-14">
            <h2 className="font-serif text-heading-1 text-neutral-900">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Droplets,
                title: "Waterproof",
                desc: "Engineered to withstand water, sweat, and everyday wear. No fading, ever.",
              },
              {
                icon: Shield,
                title: "Anti-Tarnish",
                desc: "Premium coating that prevents oxidation and keeps your jewellery shining.",
              },
              {
                icon: Heart,
                title: "Hypoallergenic",
                desc: "100% nickel-free and safe for even the most sensitive skin.",
              },
              {
                icon: Sparkles,
                title: "Minimal Design",
                desc: "Clean, modern designs that elevate every outfit without overwhelming it.",
              },
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={24} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-heading-4 text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-body-sm text-neutral-500 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="luxury-container text-center">
          <h2 className="font-serif text-heading-1 text-neutral-900 mb-4">
            Ready to Shine?
          </h2>
          <p className="text-body text-neutral-400 mb-8 max-w-md mx-auto">
            Discover our collection of everyday luxury.
          </p>
          <Link href="/shop" className="btn-primary">
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
