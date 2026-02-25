"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/30 backdrop-blur-sm z-[70] animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-ivory z-[75] shadow-soft-xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-neutral-100 safe-top">
          <div>
            <h2 className="font-serif text-heading-4 text-neutral-900">
              Your Cart
            </h2>
            <p className="text-caption text-neutral-400 mt-0.5">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2.5 hover:bg-neutral-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-6 space-y-4 no-scrollbar">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={24} className="text-neutral-400" />
              </div>
              <p className="font-serif text-heading-4 text-neutral-800 mb-2">
                Your cart is empty
              </p>
              <p className="text-body-sm text-neutral-400 mb-6">
                Discover our curated collection of anti-tarnish jewellery.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-primary"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            state.items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 py-4 border-b border-neutral-100 last:border-0"
              >
                {/* Image */}
                <div className="relative w-20 h-24 bg-neutral-100 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-body-sm font-medium text-neutral-800 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2.5 hover:bg-neutral-100 rounded-full flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-1.5"
                    >
                      <X size={14} className="text-neutral-400" />
                    </button>
                  </div>

                  {item.size && (
                    <p className="text-caption text-neutral-400 mt-0.5">
                      Size: {item.size}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center border border-neutral-200">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-body-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-body-sm font-semibold text-neutral-900">
                      ₹
                      {(
                        item.product.price * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-neutral-100 px-4 sm:px-6 py-4 sm:py-5 space-y-4 safe-bottom">
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 text-caption text-neutral-400 flex-wrap">
              <span className="flex items-center gap-1">
                <Truck size={13} /> Free Delivery
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw size={13} /> 7-Day Returns
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} /> Secure
              </span>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-body text-neutral-600">Subtotal</span>
              <span className="text-heading-4 font-serif text-neutral-900">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            <p className="text-caption text-neutral-400 text-center">
              Shipping & taxes calculated at checkout
            </p>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center"
            >
              Checkout — ₹{totalPrice.toLocaleString()}
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-body-sm text-neutral-500 hover:text-neutral-700 transition-colors py-2.5 min-h-[44px]"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
