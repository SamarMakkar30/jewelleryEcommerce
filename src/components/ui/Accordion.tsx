"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-neutral-100">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-4 sm:py-5 text-left group min-h-[48px]"
          >
            <span className="font-sans text-body-sm sm:text-body font-medium text-neutral-800 pr-4 group-hover:text-neutral-600 transition-colors">
              {item.question}
            </span>
            <ChevronDown
              size={18}
              className={`text-neutral-400 flex-shrink-0 transition-transform duration-400 ease-luxury ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-400 ease-luxury ${
              openIndex === i ? "max-h-96 pb-4 sm:pb-5" : "max-h-0"
            }`}
          >
            <p className="text-body-sm text-neutral-500 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
