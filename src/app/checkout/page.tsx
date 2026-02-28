"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAdmin, useStoreData } from "@/context/AdminContext";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, MessageCircle, CheckCircle, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const { settings } = useStoreData();
  const { addOrder } = useAdmin();
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
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));

    // Auto-fetch city & state when pincode is 6 digits
    if (name === "pincode" && value.replace(/\D/g, "").length === 6) {
      setPincodeLoading(true);
      fetch(`https://api.postalpincode.in/pincode/${value.trim()}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.[0]?.Status === "Success" && data[0].PostOffice?.length) {
            const po = data[0].PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              city: po.District || po.Division || "",
              state: po.State || "",
            }));
            setErrors((prev) => ({ ...prev, city: false, state: false }));
          }
        })
        .catch(() => {})
        .finally(() => setPincodeLoading(false));
    }
  };

  const handleSubmit = () => {
    // Block empty cart
    if (state.items.length === 0) return;

    // Validate all fields
    const required = ["email", "firstName", "lastName", "address", "city", "state", "pincode", "phone"];
    const newErrors: Record<string, boolean> = {};
    let hasError = false;
    required.forEach((field) => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = true;
        hasError = true;
      }
    });
    setErrors(newErrors);
    if (hasError) return;

    // Build WhatsApp message
    const WHATSAPP_NUMBER = "917206889528";
    const itemLines = state.items
      .map(
        (item) =>
          `• ${item.product.name} × ${item.quantity} — ₹${(item.product.price * item.quantity).toLocaleString()}`
      )
      .join("\n");

    const message = `🛒 *New Order from ${settings.siteName}*

*Customer Details:*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

*Shipping Address:*
${formData.address}
${formData.city}, ${formData.state} — ${formData.pincode}

*Order Items:*
${itemLines}

*Total: ₹${totalPrice.toLocaleString()}*`;

    const encoded = encodeURIComponent(message);

    // Save order to admin panel
    const orderId = `LNR-${Date.now().toString(36).toUpperCase()}`;
    addOrder({
      id: orderId,
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.state} — ${formData.pincode}`,
      items: state.items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: totalPrice,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "WhatsApp COD",
    });

    // Store order ID for thank you page
    setPlacedOrderId(orderId);

    // Clear cart after placing order
    clearCart();

    // Open WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");

    // Show thank you page
    setOrderPlaced(true);
  };

  const inputClass = (field: string) =>
    `w-full border ${errors[field] ? "border-red-400 bg-red-50/30" : "border-neutral-200"} px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors bg-white min-h-[48px]`;

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="border-b border-neutral-100">
        <div className="luxury-container py-5 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center leading-none">
            <div className="flex items-center">
              <span className="font-serif text-[18px] tracking-tight text-neutral-900">LUNARA JEWELS</span>
              <span className="text-gold ml-1 text-[14px] font-serif">✦</span>
            </div>
            <span className="text-[8px] tracking-[0.25em] text-gold font-medium uppercase mt-0.5">By Pakhi</span>
          </Link>
          <div className="flex items-center gap-1 text-caption text-neutral-400">
            <Lock size={12} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* ─── Thank You Screen ─── */}
      {orderPlaced ? (
        <div className="luxury-container py-12 sm:py-20 pb-16 sm:pb-24">
          <div className="max-w-lg mx-auto text-center">
            {/* Success Icon */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30 w-20 h-20" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={40} className="text-white" strokeWidth={2} />
              </div>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base mb-6 max-w-md mx-auto">
              Your order has been placed successfully. Please complete the order on WhatsApp to confirm.
            </p>

            {/* Order ID Card */}
            <div className="bg-white border border-neutral-200 rounded-xl p-5 mb-6 shadow-soft-sm">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={16} className="text-gold" />
                <span className="text-xs uppercase tracking-widest text-gold font-semibold">Order Placed</span>
                <Sparkles size={16} className="text-gold" />
              </div>
              <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Order ID</p>
              <p className="font-mono text-lg font-bold text-neutral-900">{placedOrderId}</p>
              <p className="text-neutral-400 text-xs mt-2">
                Save this ID to track your order
              </p>
            </div>

            {/* What Happens Next */}
            <div className="bg-white border border-neutral-200 rounded-xl p-5 mb-8 text-left shadow-soft-sm">
              <h3 className="font-semibold text-neutral-800 text-sm mb-3">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs font-bold">1</span>
                  </div>
                  <p className="text-neutral-600 text-sm">Complete the order message on WhatsApp</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold text-xs font-bold">2</span>
                  </div>
                  <p className="text-neutral-600 text-sm">We&apos;ll confirm your order and share payment details</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold text-xs font-bold">3</span>
                  </div>
                  <p className="text-neutral-600 text-sm">Your jewellery will be shipped with love & care ✨</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm"
              >
                <ShoppingBag size={16} />
                Continue Shopping
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/track-order"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors"
              >
                Track Your Order
              </Link>
            </div>

            {/* Trust Note */}
            <p className="text-neutral-400 text-xs mt-8 flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> Your information is safe with us
            </p>
          </div>
        </div>
      ) : (
      /* ─── Checkout Form ─── */
      <div className="luxury-container py-6 sm:py-12 pb-8 sm:pb-16">
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact */}
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
                placeholder="Email address *"
                className={inputClass("email")}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number *"
                className={inputClass("phone")}
              />
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="font-serif text-heading-3 text-neutral-900 mb-1 mt-4">
                Shipping Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name *"
                className={inputClass("firstName")}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name *"
                className={inputClass("lastName")}
              />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address *"
              className={inputClass("address")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="PIN Code *"
                  maxLength={6}
                  inputMode="numeric"
                  className={inputClass("pincode")}
                />
                {pincodeLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City *"
                className={inputClass("city")}
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State *"
                className={inputClass("state")}
              />
            </div>

            {Object.values(errors).some(Boolean) && (
              <p className="text-body-sm text-red-500">Please fill in all required fields.</p>
            )}

            <button
              onClick={handleSubmit}
              className="btn-gold w-full mt-4 gap-2 py-4 text-base"
            >
              <MessageCircle size={18} />
              Place Order via WhatsApp
            </button>

            <div className="flex items-center justify-center gap-4 pt-2 text-caption text-neutral-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} /> Secure & Private
              </span>
              <span className="flex items-center gap-1">
                <Lock size={12} /> Your data is safe
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 border border-neutral-100 shadow-soft-sm lg:sticky lg:top-24">
              <h3 className="text-body font-medium text-neutral-800 pb-4 border-b border-neutral-100 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto no-scrollbar">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
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

              {state.items.length === 0 && (
                <p className="text-body-sm text-neutral-400 text-center py-4">Your cart is empty</p>
              )}

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
      )}
    </div>
  );
}
