import { categories } from "@/data/mock";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-blush">
        <div className="luxury-container py-12 md:py-16 text-center">
          <span className="text-overline uppercase tracking-[0.2em] text-gold font-medium">
            Explore
          </span>
          <h1 className="font-serif text-display text-neutral-900 mt-3">
            All Categories
          </h1>
        </div>
      </div>

      <div className="luxury-container py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative aspect-[16/9] overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-800 ease-luxury group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="font-serif text-heading-2 text-ivory mb-1">
                  {cat.name}
                </h2>
                <p className="text-body-sm text-neutral-300 mb-3">
                  {cat.description}
                </p>
                <div className="flex items-center gap-2 text-gold text-body-sm font-medium group-hover:gap-3 transition-all">
                  <span>Shop {cat.productCount} Pieces</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
