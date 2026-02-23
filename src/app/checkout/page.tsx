"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, ChevronRight, Check } from "lucide-react";

const steps = ["Information", "Shipping", "Payment"];

export default function CheckoutPage() {
  const { state, totalPrice } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Minimal Header */}
      <div className="border-b border-neutral-100">
        <div className="luxury-container py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-heading-3 text-neutral-900">
            PAKHI <span className="text-gold">✦</span>
          </Link>
          <div className="flex items-center gap-1 text-caption text-neutral-400">
            <Lock size={12} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="luxury-container py-6">
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <button
                onClick={() => i < currentStep && setCurrentStep(i)}
                className={`flex items-center gap-1.5 text-body-sm transition-colors ${
                  i === currentStep
                    ? "text-neutral-900 font-medium"
                    : i < currentStep
                    ? "text-gold cursor-pointer"
                    : "text-neutral-300"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium border ${
                    i < currentStep
                      ? "bg-gold border-gold text-white"
                      : i === currentStep
                      ? "border-neutral-900 text-neutral-900"
                      : "border-neutral-200 text-neutral-300"
                  }`}
                >
                  {i < currentStep ? <Check size={12} /> : i + 1}
                </span>
                <span className="hidden sm:inline">{step}</span>
              </button>
              {i < steps.length - 1 && (
                <ChevronRight size={14} className="text-neutral-200 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="luxury-container pb-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            {/* Step 0: Information */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif text-heading-3 text-neutral-900 mb-1">
                    Contact Information
                  </h2>
                  <p className="text-body-sm text-neutral-400">
                    We&apos;ll use this for order updates.
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white"
                  />
                </div>

                <div>
                  <h2 className="font-serif text-heading-3 text-neutral-900 mb-1 mt-8">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="PIN Code"
                    className="border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white"
                  />
                </div>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn-primary w-full mt-4"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-heading-3 text-neutral-900">
                  Shipping Method
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border-2 border-gold bg-gold/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-gold flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-neutral-800">
                          Standard Shipping
                        </p>
                        <p className="text-caption text-neutral-400">
                          3–5 business days
                        </p>
                      </div>
                    </div>
                    <span className="text-body-sm font-medium text-green-600">
                      Free
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-neutral-200 cursor-pointer hover:border-neutral-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-neutral-300" />
                      <div>
                        <p className="text-body-sm font-medium text-neutral-800">
                          Express Shipping
                        </p>
                        <p className="text-caption text-neutral-400">
                          1–2 business days
                        </p>
                      </div>
                    </div>
                    <span className="text-body-sm font-medium text-neutral-800">
                      ₹149
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="btn-outline flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn-primary flex-1"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-heading-3 text-neutral-900">
                  Payment
                </h2>

                <div className="space-y-3">
                  {[
                    { label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                    { label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                    { label: "Net Banking", desc: "All major banks" },
                    { label: "Cash on Delivery", desc: "Pay when you receive" },
                  ].map((method, i) => (
                    <label
                      key={method.label}
                      className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                        i === 0
                          ? "border-2 border-gold bg-gold/5"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          i === 0 ? "border-gold" : "border-neutral-300"
                        }`}
                      >
                        {i === 0 && (
                          <div className="w-2 h-2 rounded-full bg-gold" />
                        )}
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-neutral-800">
                          {method.label}
                        </p>
                        <p className="text-caption text-neutral-400">
                          {method.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn-outline flex-1"
                  >
                    Back
                  </button>
                  <button className="btn-gold flex-1 gap-2">
                    <Lock size={16} />
                    Place Order — ₹{totalPrice.toLocaleString()}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4 text-caption text-neutral-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} /> 256-bit SSL Encrypted
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock size={12} /> Secure Payment
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 border border-neutral-100 shadow-soft-sm lg:sticky lg:top-24">
              <h3 className="text-body font-medium text-neutral-800 pb-4 border-b border-neutral-100 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto no-scrollbar">
                {state.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3"
                  >
                    <div className="relative w-14 h-18 bg-neutral-100 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-ivory text-[10px] font-bold flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm text-neutral-700 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-caption text-neutral-400">
                        {item.product.category}
                      </p>
                    </div>
                    <p className="text-body-sm font-medium text-neutral-800 flex-shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-neutral-100 text-body-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-neutral-700">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 mt-4 border-t border-neutral-100">
                <span className="text-body font-medium text-neutral-800">
                  Total
                </span>
                <span className="font-serif text-heading-4 text-neutral-900">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
