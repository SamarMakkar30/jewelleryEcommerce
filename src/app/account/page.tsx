"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Package, Heart, ChevronRight, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

const defaultProfile: UserProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
};

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const saved = localStorage.getItem("lunara-profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("lunara-profile", JSON.stringify(profile));
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const hasProfile = profile.name || profile.email;

  return (
    <div className="bg-ivory min-h-screen">
      {/* Page Header */}
      <div className="bg-cream border-b border-blush">
        <div className="luxury-container py-8 sm:py-12 md:py-16 text-center">
          <h1 className="font-serif text-heading-1 sm:text-display text-neutral-900">
            My Account
          </h1>
          <p className="text-body-sm sm:text-body text-neutral-400 mt-2 sm:mt-3">
            Manage your profile and preferences
          </p>
        </div>
      </div>

      <div className="luxury-container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-3">
            {/* Profile Card */}
            <div className="bg-white border border-neutral-100 p-6 text-center">
              <div className="w-20 h-20 bg-cream border border-blush rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-neutral-400" />
              </div>
              <h3 className="font-serif text-heading-4 text-neutral-900">
                {profile.name || "Guest User"}
              </h3>
              <p className="text-body-sm text-neutral-400 mt-1">
                {profile.email || "No email added"}
              </p>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-neutral-100 divide-y divide-neutral-50">
              <Link
                href="/track-order"
                className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50 transition-colors"
              >
                <span className="flex items-center gap-3 text-body-sm text-neutral-700">
                  <Package size={18} className="text-neutral-400" />
                  Track Orders
                </span>
                <ChevronRight size={16} className="text-neutral-300" />
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50 transition-colors"
              >
                <span className="flex items-center gap-3 text-body-sm text-neutral-700">
                  <Heart size={18} className="text-neutral-400" />
                  Wishlist
                  {wishlistItems.length > 0 && (
                    <span className="text-[11px] bg-gold text-white w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {wishlistItems.length}
                    </span>
                  )}
                </span>
                <ChevronRight size={16} className="text-neutral-300" />
              </Link>
              <Link
                href="/shop"
                className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50 transition-colors"
              >
                <span className="flex items-center gap-3 text-body-sm text-neutral-700">
                  <ShoppingBag size={18} className="text-neutral-400" />
                  Continue Shopping
                </span>
                <ChevronRight size={16} className="text-neutral-300" />
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Details */}
            <div className="bg-white border border-neutral-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-heading-3 text-neutral-900">
                  Profile Details
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-body-sm font-medium text-gold hover:text-neutral-900 transition-colors py-2 px-3 min-h-[44px] flex items-center"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-body-sm text-neutral-400 hover:text-neutral-700 transition-colors py-2 px-3 min-h-[44px] flex items-center"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="text-body-sm font-medium text-gold hover:text-neutral-900 transition-colors py-2 px-3 min-h-[44px] flex items-center"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              {saved && (
                <div className="mb-4 px-4 py-3 bg-green-50 border border-green-100 text-green-700 text-body-sm rounded">
                  Profile saved successfully!
                </div>
              )}

              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-overline uppercase tracking-widest text-neutral-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-200 focus:border-gold outline-none text-body-sm transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-overline uppercase tracking-widest text-neutral-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-200 focus:border-gold outline-none text-body-sm transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-overline uppercase tracking-widest text-neutral-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-200 focus:border-gold outline-none text-body-sm transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-overline uppercase tracking-widest text-neutral-400 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={profile.pincode}
                      onChange={(e) =>
                        setProfile({ ...profile, pincode: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-200 focus:border-gold outline-none text-body-sm transition-colors"
                      placeholder="110001"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-overline uppercase tracking-widest text-neutral-400 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-200 focus:border-gold outline-none text-body-sm transition-colors"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-overline uppercase tracking-widest text-neutral-400 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) =>
                        setProfile({ ...profile, city: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-200 focus:border-gold outline-none text-body-sm transition-colors"
                      placeholder="City"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                  <div>
                    <p className="text-overline uppercase tracking-widest text-neutral-400 mb-1">
                      Full Name
                    </p>
                    <p className="text-body text-neutral-800">
                      {profile.name || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-overline uppercase tracking-widest text-neutral-400 mb-1">
                      Email
                    </p>
                    <p className="text-body text-neutral-800">
                      {profile.email || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-overline uppercase tracking-widest text-neutral-400 mb-1">
                      Phone
                    </p>
                    <p className="text-body text-neutral-800">
                      {profile.phone || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-overline uppercase tracking-widest text-neutral-400 mb-1">
                      Pincode
                    </p>
                    <p className="text-body text-neutral-800">
                      {profile.pincode || "—"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-overline uppercase tracking-widest text-neutral-400 mb-1">
                      Address
                    </p>
                    <p className="text-body text-neutral-800">
                      {profile.address
                        ? `${profile.address}${profile.city ? `, ${profile.city}` : ""}`
                        : "—"}
                    </p>
                  </div>
                </div>
              )}

              {!hasProfile && !isEditing && (
                <div className="mt-6 text-center py-6 border border-dashed border-neutral-200">
                  <User size={32} className="text-neutral-300 mx-auto mb-3" />
                  <p className="text-body-sm text-neutral-400 mb-3">
                    Add your details for a faster checkout experience
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 bg-neutral-900 text-white text-body-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Add Profile
                  </button>
                </div>
              )}
            </div>

            {/* Info Note */}
            <div className="bg-cream/50 border border-blush px-6 py-4">
              <p className="text-body-sm text-neutral-500">
                Your details are saved locally on this device and used to
                pre-fill your checkout information. We do not store any data on
                our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
