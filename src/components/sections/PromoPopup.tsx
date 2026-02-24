"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";

export default function PromoPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Show popup after 5 seconds, but only if not dismissed before
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("promo-dismissed");
      if (!dismissed) setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("promo-dismissed", "true");
  };

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[90] animate-fade-in"
        onClick={handleClose}
      />
      <div className="fixed top-auto bottom-0 sm:top-1/2 sm:bottom-auto left-0 sm:left-1/2 right-0 sm:right-auto sm:-translate-x-1/2 sm:-translate-y-1/2 z-[95] w-full sm:w-[90vw] sm:max-w-lg bg-ivory p-6 sm:p-8 md:p-10 shadow-soft-xl animate-slide-up sm:animate-scale-in text-center rounded-t-2xl sm:rounded-none safe-bottom">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2.5 text-neutral-400 hover:text-neutral-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <Gift size={24} className="text-gold" />
        </div>

        <h3 className="font-serif text-heading-3 sm:text-heading-2 text-neutral-900 mb-2">
          Get 10% Off
        </h3>
        <p className="text-body-sm text-neutral-500 mb-5 sm:mb-6 max-w-sm mx-auto">
          Sign up for our newsletter and enjoy 10% off your first order. Plus, get early access to new collections.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClose();
          }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-sm mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white min-h-[48px]"
            required
          />
          <button
            type="submit"
            className="bg-neutral-900 text-ivory px-6 py-3 text-body-sm font-medium uppercase tracking-wide hover:bg-neutral-800 transition-colors whitespace-nowrap min-h-[48px]"
          >
            Get 10% Off
          </button>
        </form>

        <p className="text-caption text-neutral-300 mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </>
  );
}
