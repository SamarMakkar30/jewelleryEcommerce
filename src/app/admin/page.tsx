"use client";

import { useAdmin } from "@/context/AdminContext";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  confirmed: "bg-blue-50 text-blue-600 border-blue-200",
  shipped: "bg-purple-50 text-purple-600 border-purple-200",
  delivered: "bg-emerald-50 text-emerald-600 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

const statusIcons: Record<string, React.ElementType> = {
  pending: Clock,
  confirmed: CheckCircle2,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

export default function AdminDashboard() {
  const { state } = useAdmin();
  const { products, orders } = state;

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.inStock).length;

  const stats = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Total Orders",
      value: orders.length.toString(),
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Products",
      value: totalProducts.toString(),
      subtitle: `${inStockProducts} in stock`,
      icon: Package,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Pending Orders",
      value: pendingOrders.toString(),
      subtitle: pendingOrders > 0 ? "Needs attention" : "All clear",
      icon: TrendingUp,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                <stat.icon size={18} className="text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-500 mt-0.5">{stat.subtitle || stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-neutral-200/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs font-medium text-gold hover:text-gold-dark transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {recentOrders.length === 0 ? (
              <div className="px-5 sm:px-6 py-10 text-center">
                <ShoppingCart size={28} className="mx-auto text-neutral-300 mb-2" />
                <p className="text-sm text-neutral-400">No orders yet</p>
                <p className="text-xs text-neutral-300 mt-1">Orders will appear here when customers place them</p>
              </div>
            ) : (
              recentOrders.map((order) => {
                const StatusIcon = statusIcons[order.status] || Clock;
                return (
                  <div key={order.id} className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-neutral-50/50 transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${statusColors[order.status]}`}>
                      <StatusIcon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate">{order.customerName}</p>
                      <p className="text-xs text-neutral-400">{order.id} · {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-neutral-900">₹{order.total.toLocaleString()}</p>
                      <p className={`text-[10px] font-medium uppercase tracking-wider ${
                        order.status === "delivered" ? "text-emerald-500" :
                        order.status === "shipped" ? "text-purple-500" :
                        order.status === "confirmed" ? "text-blue-500" :
                        order.status === "cancelled" ? "text-red-500" :
                        "text-amber-500"
                      }`}>{order.status}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 sm:p-6">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Package size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-800">Add New Product</p>
                <p className="text-xs text-neutral-400">Create a new listing</p>
              </div>
              <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-neutral-600 transition-colors" />
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <ShoppingCart size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-800">Manage Orders</p>
                <p className="text-xs text-neutral-400">{pendingOrders} pending</p>
              </div>
              <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-neutral-600 transition-colors" />
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <TrendingUp size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-800">Store Settings</p>
                <p className="text-xs text-neutral-400">Update your store</p>
              </div>
              <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-neutral-600 transition-colors" />
            </Link>
          </div>

          {/* Top Products */}
          <h3 className="text-sm font-semibold text-neutral-900 mt-6 mb-3">Top Products</h3>
          <div className="space-y-2.5">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-800 truncate">{product.name}</p>
                  <p className="text-[10px] text-neutral-400">{product.reviewCount} reviews</p>
                </div>
                <p className="text-xs font-semibold text-neutral-900">₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
