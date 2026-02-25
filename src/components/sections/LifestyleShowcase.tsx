"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const lifestyleImages = [
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop",
    alt: "Gold necklace on warm fabric",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=360&fit=crop",
    alt: "Gold earrings warm styling",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=360&fit=crop",
    alt: "Gold rings close-up",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop",
    alt: "Gold chain necklace detail",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=360&fit=crop",
    alt: "Gold bracelet styling",
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
        <div className="text-center mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-overline uppercase tracking-[0.2em] text-gold font-medium">
            Styled for Life
          </span>
          <h2 className="font-serif text-heading-2 sm:text-heading-1 md:text-display text-neutral-900 mt-2 sm:mt-3">
            Wear It Your Way
          </h2>
          <p className="text-body-sm sm:text-body text-neutral-400 mt-2 sm:mt-3 max-w-md mx-auto px-2">
            Real moments, real beauty. Our jewellery is designed to be part of your everyday story.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[250px] transition-opacity duration-1000 ease-luxury opacity-0"
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
              @lunara.jewels
            </a>{" "}
            for daily styling inspiration
          </p>
        </div>
      </div>
    </section>
  );
}
