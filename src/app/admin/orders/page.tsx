"use client";

import { useState } from "react";
import { useAdmin, Order } from "@/context/AdminContext";
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Package,
  ChevronDown,
  Eye,
  X,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
} from "lucide-react";

const STATUS_CONFIG: Record<Order["status"], { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "text-blue-600", bg: "bg-blue-50 border-blue-200", icon: CheckCircle2 },
  shipped: { label: "Shipped", color: "text-purple-600", bg: "bg-purple-50 border-purple-200", icon: Truck },
  delivered: { label: "Delivered", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-50 border-red-200", icon: XCircle },
};

const STATUS_ORDER: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const { state, updateOrderStatus } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusDropdown, setStatusDropdown] = useState<string | null>(null);

  const filteredOrders = state.orders
    .filter((o) => {
      const matchSearch =
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === "all" || o.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const statusCounts = STATUS_ORDER.reduce(
    (acc, s) => ({ ...acc, [s]: state.orders.filter((o) => o.status === s).length }),
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Orders</h1>
        <p className="text-sm text-neutral-500 mt-1">{state.orders.length} total orders</p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setFilterStatus("all")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            filterStatus === "all"
              ? "bg-neutral-900 text-white"
              : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          All Orders
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
            filterStatus === "all" ? "bg-white/20" : "bg-neutral-100"
          }`}>{state.orders.length}</span>
        </button>
        {STATUS_ORDER.map((status) => {
          const config = STATUS_CONFIG[status];
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                filterStatus === status
                  ? `${config.bg} ${config.color}`
                  : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {config.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                filterStatus === status ? `${config.color} bg-white/60` : "bg-neutral-100"
              }`}>{statusCounts[status]}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name or order ID..."
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_100px] gap-4 px-6 py-3 bg-neutral-50 border-b border-neutral-100 text-xs font-medium text-neutral-500 uppercase tracking-wider">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Date</span>
          <span>Status</span>
          <span></span>
        </div>

        <div className="divide-y divide-neutral-100">
          {filteredOrders.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Package size={40} className="mx-auto text-neutral-300 mb-3" />
              <p className="text-neutral-500 font-medium">
                {state.orders.length === 0 ? "No orders yet" : "No orders found"}
              </p>
              <p className="text-sm text-neutral-400 mt-1">
                {state.orders.length === 0
                  ? "Orders will appear here when customers place them via WhatsApp"
                  : "Try adjusting your search or filters"}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const config = STATUS_CONFIG[order.status];
              const StatusIcon = config.icon;
              return (
                <div key={order.id} className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr_1fr_1fr_100px] gap-3 lg:gap-4 items-center px-5 sm:px-6 py-4 hover:bg-neutral-50/50 transition-colors">
                    {/* Order ID */}
                    <p className="text-sm font-mono font-semibold text-neutral-800">{order.id}</p>

                    {/* Customer */}
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{order.customerName}</p>
                      <p className="text-xs text-neutral-400">{order.email}</p>
                    </div>

                    {/* Total */}
                    <div className="hidden lg:block">
                      <p className="text-sm font-semibold text-neutral-900">₹{order.total.toLocaleString()}</p>
                      <p className="text-[11px] text-neutral-400">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-neutral-600 hidden lg:block">{order.date}</p>

                    {/* Status */}
                    <div className="relative hidden lg:block">
                      <button
                        onClick={() => setStatusDropdown(statusDropdown === order.id ? null : order.id)}
                        className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full border ${config.bg} ${config.color} cursor-pointer hover:shadow-sm transition-all`}
                      >
                        <StatusIcon size={12} />
                        {config.label}
                        <ChevronDown size={10} />
                      </button>

                      {/* Status Dropdown */}
                      {statusDropdown === order.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setStatusDropdown(null)} />
                          <div className="absolute left-0 top-10 z-20 bg-white border border-neutral-200 rounded-xl shadow-lg py-1.5 min-w-[150px] animate-fade-in">
                            {STATUS_ORDER.map((s) => {
                              const sc = STATUS_CONFIG[s];
                              const Icon = sc.icon;
                              return (
                                <button
                                  key={s}
                                  onClick={() => {
                                    updateOrderStatus(order.id, s);
                                    setStatusDropdown(null);
                                  }}
                                  className={`flex items-center gap-2 px-3 py-2 text-xs w-full hover:bg-neutral-50 transition-colors ${
                                    order.status === s ? `${sc.color} font-semibold` : "text-neutral-600"
                                  }`}
                                >
                                  <Icon size={12} />
                                  {sc.label}
                                  {order.status === s && <span className="ml-auto text-[10px]">✓</span>}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 justify-end">
                      {/* Mobile extras */}
                      <div className="flex items-center gap-2 lg:hidden mr-auto">
                        <span className="text-sm font-semibold text-neutral-900">₹{order.total.toLocaleString()}</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full border ${config.bg} ${config.color}`}>
                          <StatusIcon size={10} />
                          {config.label}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye size={16} className="text-neutral-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">{selectedOrder.id}</h3>
                <p className="text-xs text-neutral-400">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-neutral-100 rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Customer Info */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Customer</h4>
                <div className="space-y-2.5">
                  <p className="text-sm font-medium text-neutral-800">{selectedOrder.customerName}</p>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Mail size={13} /> {selectedOrder.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Phone size={13} /> {selectedOrder.phone}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-neutral-500">
                    <MapPin size={13} className="mt-0.5 flex-shrink-0" /> {selectedOrder.address}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Items</h4>
                <div className="space-y-2.5 bg-neutral-50 rounded-xl p-4">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-800">{item.productName}</p>
                        <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-neutral-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  <hr className="border-neutral-200" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-neutral-900">Total</p>
                    <p className="text-base font-bold text-neutral-900">₹{selectedOrder.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Payment & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard size={13} className="text-neutral-400" />
                    <span className="text-xs text-neutral-400">Payment</span>
                  </div>
                  <p className="text-sm font-medium text-neutral-800">{selectedOrder.paymentMethod}</p>
                </div>
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={13} className="text-neutral-400" />
                    <span className="text-xs text-neutral-400">Status</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${STATUS_CONFIG[selectedOrder.status].color}`}>
                    {STATUS_CONFIG[selectedOrder.status].label}
                  </span>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {STATUS_ORDER.map((s) => {
                    const sc = STATUS_CONFIG[s];
                    return (
                      <button
                        key={s}
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, s);
                          setSelectedOrder({ ...selectedOrder, status: s });
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                          selectedOrder.status === s
                            ? `${sc.bg} ${sc.color} border-current`
                            : "border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                        }`}
                      >
                        {sc.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
