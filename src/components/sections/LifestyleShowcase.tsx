"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const lifestyleImages = [
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop",
    alt: "Woman wearing minimal gold necklace",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?w=600&h=360&fit=crop",
    alt: "Jewellery detail shot",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=360&fit=crop",
    alt: "Earrings style shot",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop",
    alt: "Necklace close-up",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=360&fit=crop",
    alt: "Bracelet on wrist",
    span: "col-span-1 row-span-1",
  },
];

export default function LifestyleShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding">
      <div className="luxury-container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-overline uppercase tracking-[0.2em] text-gold font-medium">
            Styled for Life
          </span>
          <h2 className="font-serif text-heading-1 md:text-display text-neutral-900 mt-3">
            Wear It Your Way
          </h2>
          <p className="text-body text-neutral-400 mt-3 max-w-md mx-auto">
            Real moments, real beauty. Our jewellery is designed to be part of your everyday story.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px] transition-opacity duration-1000 ease-luxury opacity-0"
        >
          {lifestyleImages.map((img, i) => (
            <div
              key={i}
              className={`${img.span} relative overflow-hidden group cursor-pointer`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-800 ease-luxury group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-400" />
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-10">
          <p className="text-body-sm text-neutral-400">
            Follow us{" "}
            <a
              href="#"
              className="text-gold font-medium hover:underline underline-offset-4"
            >
              @pakhi.jewels
            </a>{" "}
            for daily styling inspiration
          </p>
        </div>
      </div>
    </section>
  );
}
