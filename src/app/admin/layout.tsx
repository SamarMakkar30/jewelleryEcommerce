"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function AdminSidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { logout } = useAdmin();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-neutral-900 text-white z-50 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-neutral-800">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold tracking-wide">LUNARA</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest -mt-0.5">Admin Panel</p>
              </div>
            </Link>
            <button onClick={onClose} className="lg:hidden p-1.5 hover:bg-neutral-800 rounded-lg">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-gold/15 text-gold"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} className="text-gold/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-neutral-800 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
          >
            <Sparkles size={18} strokeWidth={1.5} />
            View Store
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function LoginScreen() {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(password);
      if (!success) {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logo.jpeg"
            alt="Lunara Jewels"
            className="w-32 h-32 object-contain rounded-2xl mx-auto mb-4 shadow-gold"
          />
          <h1 className="font-serif text-2xl text-white tracking-wide">LUNARA JEWELS</h1>
          <p className="text-sm text-neutral-500 mt-1">Admin Panel</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-neutral-800/50 border border-neutral-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-1">Welcome back</h2>
          <p className="text-sm text-neutral-400 mb-6">Enter your password to access the admin panel.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full bg-neutral-900/50 border ${
                  error ? "border-red-500" : "border-neutral-700 focus:border-gold"
                } rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-neutral-600`}
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-xs mt-2">Incorrect password. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-medium py-3 rounded-xl hover:shadow-gold active:scale-[0.98] active:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm select-none"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { state } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!state.isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Area */}
      <div className="lg:pl-[260px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-neutral-100 rounded-lg"
            >
              <Menu size={20} className="text-neutral-700" />
            </button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gold">A</span>
              </div>
              <span className="text-sm font-medium text-neutral-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutInner>{children}</AdminLayoutInner>;
}
