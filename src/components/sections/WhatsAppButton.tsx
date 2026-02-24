"use client";

import { MessageCircle } from "lucide-react";
import { useStoreData } from "@/context/AdminContext";

export default function WhatsAppButton() {
  const { settings } = useStoreData();
  const phoneDigits = settings.phone.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${phoneDigits}?text=Hi! I have a query about ${settings.siteName}.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-soft-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
      <span className="absolute right-full mr-3 bg-neutral-900 text-ivory text-body-sm px-4 py-2 rounded-pill whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-soft hidden sm:block">
        Chat with us
      </span>
    </a>
  );
}
