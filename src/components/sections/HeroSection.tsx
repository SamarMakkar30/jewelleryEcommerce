"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance for text
    const elements = [headlineRef.current, subtitleRef.current, ctaRef.current];
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        setTimeout(() => {
          el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 200 + i * 200);
      }
    });
    // Image reveal
    if (imageRef.current) {
      imageRef.current.style.opacity = "0";
      imageRef.current.style.transform = "scale(1.05) translateX(20px)";
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.transition = `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)`;
          imageRef.current.style.opacity = "1";
          imageRef.current.style.transform = "scale(1) translateX(0)";
        }
      }, 400);
    }
  }, []);

  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-ivory">
      <div className="luxury-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-4 items-center">
          {/* Left — Text Content */}
          <div className="order-2 lg:order-1 pb-6 sm:pb-8 lg:pb-0">
            {/* Overline */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-6 sm:w-8 h-px bg-gold" />
              <span className="text-[10px] sm:text-overline uppercase tracking-[0.2em] text-gold font-medium">
                New Collection 2026
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-[2.25rem] sm:text-[3rem] md:text-display-xl lg:text-[5rem] xl:text-[5.5rem] leading-[1.05] text-neutral-900 mb-4 sm:mb-6"
            >
              Waterproof.
              <br />
              Anti-Tarnish.
              <br />
              <span className="text-gold-dark">Made for</span>
              <br />
              <span className="text-gold-dark">Everyday</span>
              <br />
              Elegance.
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-body-sm sm:text-body md:text-lg text-neutral-500 max-w-md mb-7 sm:mb-10 leading-relaxed"
            >
              Premium jewellery that stays beautiful through every moment.
              Designed for the modern woman who never compromises.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <MagneticButton className="btn-primary text-sm sm:text-base px-8 py-4 sm:px-10 sm:py-4 w-full sm:w-auto justify-center">
                <Link href="/shop">Shop Now</Link>
              </MagneticButton>
              <MagneticButton className="btn-outline text-sm sm:text-base px-8 py-4 sm:px-10 sm:py-4 w-full sm:w-auto justify-center">
                <Link href="/shop?sort=newest">New Arrivals</Link>
              </MagneticButton>
            </div>

            {/* Social Proof Micro */}
            <div className="mt-8 sm:mt-12 flex items-center gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-neutral-200/50">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-blush border-2 border-ivory flex items-center justify-center text-[10px] font-medium text-neutral-600"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold text-xs">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-caption text-neutral-400">
                  Loved by{" "}
                  <span className="text-neutral-600 font-medium">10,000+</span>{" "}
                  women
                </p>
              </div>
            </div>
          </div>

          {/* Right — Hero Image Collage */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end" ref={imageRef}>
            <div className="relative w-full max-w-[360px] sm:max-w-[480px] lg:max-w-[560px] aspect-[4/5]">
              {/* Main Image */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-soft-xl">
                <Image
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=80"
                  alt="Luxury gold jewellery collection"
                  fill
                  className="object-cover animate-hero-zoom"
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
                {/* Soft overlay at bottom for blending */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
                {/* Floating shimmer highlight */}
                <div className="absolute inset-0 animate-shimmer-float pointer-events-none" style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(212,175,55,0.08) 55%, transparent 60%)',
                  backgroundSize: '200% 100%',
                }} />
              </div>

              {/* Floating accent card — top right */}
              <div className="absolute -top-4 -right-4 md:top-4 md:right-[-2rem] bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-soft-lg z-10 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-gold text-lg">✦</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-neutral-800 tracking-wide uppercase">
                      Anti-Tarnish
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      Lifetime guarantee
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent card — bottom left */}
              <div className="absolute -bottom-3 -left-3 md:bottom-8 md:left-[-2rem] bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-soft-lg z-10 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1.5">
                    {["💧", "🛡️", "✨"].map((emoji, i) => (
                      <span
                        key={i}
                        className="w-7 h-7 rounded-full bg-cream flex items-center justify-center text-xs border border-white"
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-neutral-800">
                      Waterproof & Durable
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      Wear it everywhere
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative gold ring */}
              <div className="absolute -bottom-8 right-8 w-20 h-20 rounded-full border-2 border-gold/20 hidden md:block" />
              <div className="absolute -top-6 left-12 w-14 h-14 rounded-full border border-gold/10 hidden md:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in hidden sm:flex">
        <span className="text-overline text-neutral-400 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-neutral-300 to-transparent" />
      </div>
    </section>
  );
}
