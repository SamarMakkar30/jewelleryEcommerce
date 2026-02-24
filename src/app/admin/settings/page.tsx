"use client";

import { useState, useEffect } from "react";
import { useAdmin, SiteSettings } from "@/context/AdminContext";
import {
  Save,
  Store,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Truck,
  Megaphone,
  CheckCircle2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { state, updateSettings } = useAdmin();
  const [form, setForm] = useState<SiteSettings>(state.settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(state.settings);
  }, [state.settings]);

  const handleChange = (field: keyof SiteSettings, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields: {
    section: string;
    icon: React.ElementType;
    items: { key: keyof SiteSettings; label: string; type?: string; placeholder: string; icon?: React.ElementType }[];
  }[] = [
    {
      section: "Store Information",
      icon: Store,
      items: [
        { key: "siteName", label: "Store Name", placeholder: "LUNARA JEWELS", icon: Store },
        { key: "tagline", label: "Tagline", placeholder: "Premium Anti-Tarnish Jewellery" },
      ],
    },
    {
      section: "Contact Details",
      icon: Mail,
      items: [
        { key: "email", label: "Email Address", type: "email", placeholder: "hello@lunara.in", icon: Mail },
        { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", icon: Phone },
        { key: "address", label: "Address", placeholder: "Mumbai, India", icon: MapPin },
        { key: "instagram", label: "Instagram Handle", placeholder: "@lunara.jewels", icon: Instagram },
      ],
    },
    {
      section: "Store Policies",
      icon: Truck,
      items: [
        { key: "freeShippingThreshold", label: "Free Shipping Threshold (₹)", type: "number", placeholder: "999", icon: Truck },
      ],
    },
    {
      section: "Announcements",
      icon: Megaphone,
      items: [
        { key: "announcementText", label: "Announcement Bar Text", placeholder: "Free Shipping on Orders Above ₹999", icon: Megaphone },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your store configuration</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {fields.map((section) => (
          <div key={section.section} className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
              <section.icon size={15} className="text-neutral-400" />
              {section.section}
            </h3>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.key}>
                  <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    {item.label}
                  </label>
                  <div className="relative">
                    {item.icon && (
                      <item.icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    )}
                    <input
                      type={item.type || "text"}
                      value={form[item.key]}
                      onChange={(e) =>
                        handleChange(
                          item.key,
                          item.type === "number" ? Number(e.target.value) : e.target.value
                        )
                      }
                      placeholder={item.placeholder}
                      className={`w-full border border-neutral-200 rounded-xl ${
                        item.icon ? "pl-10" : "pl-4"
                      } pr-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-6 py-3 rounded-xl text-sm font-medium hover:shadow-lg transition-all"
          >
            <Save size={14} />
            Save Settings
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium animate-fade-in">
              <CheckCircle2 size={15} />
              Settings saved successfully!
            </span>
          )}
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-200/60 p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h3>
        <p className="text-sm text-neutral-500 mb-4">
          Clear all admin data and reset to defaults. This cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm("Are you sure? This will reset all products, orders, and settings to defaults.")) {
              localStorage.removeItem("lunara-admin");
              window.location.reload();
            }
          }}
          className="px-4 py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
}
