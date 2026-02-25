"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { SiteSettings } from "@/context/AdminContext";
import { Save, Store, Mail, Phone, MapPin, Instagram, Truck, Megaphone } from "lucide-react";

export default function AdminSettingsPage() {
  const { state, updateSettings } = useAdmin();
  const [form, setForm] = useState<SiteSettings>({ ...state.settings });
  const [saved, setSaved] = useState(false);

  const update = (key: keyof SiteSettings, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Store Settings</h1>
          <p className="text-neutral-500 mt-1">Manage your store information and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
        >
          <Save size={16} />
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      {/* Store Information */}
      <section className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
            <Store size={20} className="text-neutral-600" />
          </div>
          <div>
            <h2 className="font-semibold text-neutral-900">Store Information</h2>
            <p className="text-sm text-neutral-500">Basic details about your store</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Store Name</label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => update("siteName", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => update("tagline", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
            <Mail size={20} className="text-neutral-600" />
          </div>
          <div>
            <h2 className="font-semibold text-neutral-900">Contact Details</h2>
            <p className="text-sm text-neutral-500">How customers can reach you</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <span className="flex items-center gap-1.5"><Mail size={14} /> Email</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <span className="flex items-center gap-1.5"><Phone size={14} /> Phone</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> Address</span>
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <span className="flex items-center gap-1.5"><Instagram size={14} /> Instagram</span>
            </label>
            <input
              type="text"
              value={form.instagram}
              onChange={(e) => update("instagram", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Store Policies */}
      <section className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
            <Truck size={20} className="text-neutral-600" />
          </div>
          <div>
            <h2 className="font-semibold text-neutral-900">Store Policies</h2>
            <p className="text-sm text-neutral-500">Shipping and order thresholds</p>
          </div>
        </div>
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Free Shipping Threshold (₹)</label>
          <input
            type="number"
            value={form.freeShippingThreshold}
            onChange={(e) => update("freeShippingThreshold", Number(e.target.value))}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          />
          <p className="text-xs text-neutral-400 mt-1.5">Orders above this amount get free shipping</p>
        </div>
      </section>

      {/* Announcements */}
      <section className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
            <Megaphone size={20} className="text-neutral-600" />
          </div>
          <div>
            <h2 className="font-semibold text-neutral-900">Announcements</h2>
            <p className="text-sm text-neutral-500">Top banner announcement bar text</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Announcement Text</label>
          <input
            type="text"
            value={form.announcementText}
            onChange={(e) => update("announcementText", e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            placeholder="e.g. Free shipping on orders above ₹999!"
          />
          <p className="text-xs text-neutral-400 mt-1.5">Leave empty to hide the announcement bar</p>
        </div>
      </section>
    </div>
  );
}
