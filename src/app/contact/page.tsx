"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-blush">
        <div className="luxury-container py-12 md:py-16 text-center">
          <span className="text-overline uppercase tracking-[0.2em] text-gold font-medium">
            Get in Touch
          </span>
          <h1 className="font-serif text-display text-neutral-900 mt-3">
            Contact Us
          </h1>
          <p className="text-body text-neutral-400 mt-3 max-w-md mx-auto">
            Have a question or need help? We&apos;re always here for you.
          </p>
        </div>
      </div>

      <div className="luxury-container py-16 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-heading-3 text-neutral-900 mb-6">
                Reach Us
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@pakhi.in",
                    href: "mailto:hello@pakhi.in",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 98765 43210",
                    href: "tel:+919876543210",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "Mumbai, Maharashtra, India",
                  },
                  {
                    icon: Clock,
                    label: "Working Hours",
                    value: "Mon – Sat, 10 AM – 7 PM IST",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-caption text-neutral-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-body text-neutral-800 hover:text-gold transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-body text-neutral-800">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 border border-neutral-100 shadow-soft-sm">
              <h2 className="font-serif text-heading-3 text-neutral-900 mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your Name"
                    required
                    className="w-full border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Your Email"
                    required
                    className="w-full border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors"
                  />
                </div>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Subject"
                  className="w-full border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors"
                />
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full border border-neutral-200 px-4 py-3 text-body-sm outline-none focus:border-gold transition-colors resize-none"
                />
                <button type="submit" className="btn-primary gap-2">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
