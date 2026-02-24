"use client";

import { useState } from "react";
import { Package, Truck, CheckCircle, Search } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setTracked(true);
  };

  const mockStatuses = [
    { label: "Order Placed", date: "Feb 20, 2026", done: true, icon: CheckCircle },
    { label: "Shipped", date: "Feb 21, 2026", done: true, icon: Package },
    { label: "Out for Delivery", date: "Feb 23, 2026", done: true, icon: Truck },
    { label: "Delivered", date: "Expected Feb 24", done: false, icon: CheckCircle },
  ];

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-blush">
        <div className="luxury-container py-8 sm:py-12 md:py-16 text-center">
          <span className="text-[10px] sm:text-overline uppercase tracking-[0.2em] text-gold font-medium">
            Order Tracking
          </span>
          <h1 className="font-serif text-heading-1 sm:text-display text-neutral-900 mt-3">
            Track Your Order
          </h1>
          <p className="text-body text-neutral-400 mt-3 max-w-md mx-auto">
            Enter your order ID to check the status.
          </p>
        </div>
      </div>

      <div className="luxury-container py-10 sm:py-16 md:py-20">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 sm:gap-0 mb-12">
            <input
              type="text"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                setTracked(false);
              }}
              placeholder="Enter Order ID (e.g., LNR-20260220-001)"
              className="flex-1 border border-neutral-200 px-5 py-3.5 text-body-sm outline-none focus:border-gold transition-colors bg-white"
            />
            <button type="submit" className="btn-primary gap-2">
              <Search size={16} />
              Track
            </button>
          </form>

          {tracked && (
            <div className="animate-fade-in">
              <div className="bg-white border border-neutral-100 p-6 md:p-8 shadow-soft-sm mb-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
                  <div>
                    <p className="text-caption text-neutral-400">Order ID</p>
                    <p className="text-body font-medium text-neutral-800">
                      {orderId || "LNR-20260220-001"}
                    </p>
                  </div>
                  <span className="text-body-sm font-medium text-green-600 bg-green-50 px-3 py-1">
                    In Transit
                  </span>
                </div>

                {/* Timeline */}
                <div className="space-y-0">
                  {mockStatuses.map((status, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            status.done
                              ? "bg-gold text-white"
                              : "bg-neutral-100 text-neutral-300"
                          }`}
                        >
                          <status.icon size={14} />
                        </div>
                        {i < mockStatuses.length - 1 && (
                          <div
                            className={`w-0.5 h-12 ${
                              status.done ? "bg-gold" : "bg-neutral-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-8">
                        <p
                          className={`text-body-sm font-medium ${
                            status.done
                              ? "text-neutral-800"
                              : "text-neutral-400"
                          }`}
                        >
                          {status.label}
                        </p>
                        <p className="text-caption text-neutral-400">
                          {status.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
