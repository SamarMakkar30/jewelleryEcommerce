"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShieldCheck, Truck, RotateCcw, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { state, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="luxury-container py-32 text-center">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} className="text-neutral-400" />
        </div>
        <h1 className="font-serif text-heading-1 text-neutral-900 mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-body text-neutral-400 mb-8 max-w-md mx-auto">
          Looks like you haven&apos;t added anything to your cart yet.
          Browse our collection and find your perfect piece.
        </p>
        <Link href="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="luxury-container py-10 md:py-16">
        <h1 className="font-serif text-heading-1 text-neutral-900 mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-0 divide-y divide-neutral-100">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex gap-5 py-6 first:pt-0">
                <div className="relative w-24 h-32 md:w-32 md:h-40 bg-neutral-100 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-body font-medium text-neutral-800 hover:text-neutral-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-caption text-neutral-400 mt-0.5">
                        {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 hover:bg-neutral-100 rounded-full"
                    >
                      <X size={16} className="text-neutral-400" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex items-center border border-neutral-200">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center text-body-sm font-medium border-x border-neutral-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="font-serif text-heading-4 text-neutral-900">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white p-6 md:p-8 border border-neutral-100 shadow-soft-sm space-y-5">
              <h2 className="font-serif text-heading-4 text-neutral-900 pb-4 border-b border-neutral-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-body-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="text-neutral-800 font-medium">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-neutral-100">
                <span className="text-body font-medium text-neutral-800">
                  Total
                </span>
                <span className="font-serif text-heading-3 text-neutral-900">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-0">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 border border-neutral-200 px-4 py-2.5 text-body-sm outline-none focus:border-gold transition-colors"
                />
                <button className="bg-neutral-900 text-ivory px-5 py-2.5 text-body-sm font-medium hover:bg-neutral-800 transition-colors">
                  Apply
                </button>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full text-center flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>

              {/* Trust */}
              <div className="flex items-center justify-center gap-3 pt-2 text-caption text-neutral-400">
                <span className="flex items-center gap-1">
                  <Truck size={12} /> Free Shipping
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <RotateCcw size={12} /> 7-Day Returns
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} /> Secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
