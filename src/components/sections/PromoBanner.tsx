"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import Link from "next/link";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// Sale ends 7 days from now (rolling)
function getSaleEnd() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  d.setHours(23, 59, 59, 999);
  return d;
}

export default function PromoBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [saleEnd] = useState(getSaleEnd);
  const { days, hours, minutes, seconds } = useCountdown(saleEnd);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="section-padding !py-6 sm:!py-10">
      <div className="luxury-container">
        <div
          ref={bannerRef}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl animate-sparkle-gradient opacity-0 translate-y-4 transition-all duration-700 ease-out"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2a2520 25%, #1a1a1a 50%, #252018 75%, #1a1a1a 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-4 left-6 sm:top-6 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gold/5 blur-2xl" />
            <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-gold/5 blur-2xl" />
            {/* Sparkle dot pattern */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }} />
            {/* Animated shimmer sweep */}
            <div className="absolute inset-0 animate-shimmer-float pointer-events-none" style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.06) 45%, rgba(255,255,255,0.08) 50%, rgba(212,175,55,0.06) 55%, transparent 60%)",
              backgroundSize: "200% 100%",
            }} />
          </div>

          <div className="relative px-6 py-8 sm:px-10 sm:py-12 md:px-16 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[10px] sm:text-xs uppercase tracking-widest font-medium px-3 py-1.5 rounded-full mb-4">
                <Gift size={14} />
                <span>Limited Time Offer</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                Flat 15% Off on Your{" "}
                <span className="text-gold">First Order</span>
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-md mx-auto md:mx-0">
                Use code <span className="text-gold font-semibold tracking-wide">LUNARA15</span> at checkout. 
                Valid on all collections — no minimum order.
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mt-5">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-medium mr-1">Ends in</span>
                {[
                  { value: pad(days), label: "D" },
                  { value: pad(hours), label: "H" },
                  { value: pad(minutes), label: "M" },
                  { value: pad(seconds), label: "S" },
                ].map((unit, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-white/[0.07] border border-white/[0.08] rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 min-w-[40px] sm:min-w-[48px] text-center">
                      <span className="font-serif text-lg sm:text-xl text-white font-semibold tabular-nums leading-none">
                        {unit.value}
                      </span>
                      <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider text-neutral-500 mt-0.5">
                        {unit.label}
                      </span>
                    </div>
                    {i < 3 && <span className="text-gold/40 font-light text-lg">:</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2.5 bg-gold hover:bg-gold-dark text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                <Sparkles size={16} className="opacity-80" />
                Shop Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <span className="text-[11px] text-neutral-500">
                Free shipping on orders above ₹999
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
