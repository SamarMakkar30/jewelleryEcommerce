"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from "react";
import { Product, products as defaultProducts } from "@/data/mock";
import {
  addOrderToFirestore,
  updateOrderStatusInFirestore,
  subscribeToOrders,
  saveSettingsToFirestore,
  loadSettingsFromFirestore,
  isFirebaseConfigured,
} from "@/lib/firestore";

// ─── Types ──────────────────────────────────────────────────────────────────
export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  date: string;
  paymentMethod: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  freeShippingThreshold: number;
  announcementText: string;
}

interface AdminState {
  products: Product[];
  orders: Order[];
  settings: SiteSettings;
  isAuthenticated: boolean;
}

type AdminAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: string; status: Order["status"] } }
  | { type: "SET_SETTINGS"; payload: SiteSettings }
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "LOAD_STATE"; payload: Partial<AdminState> };

interface AdminContextType {
  state: AdminState;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  updateSettings: (settings: SiteSettings) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

// ─── Default Data ───────────────────────────────────────────────────────────
const defaultSettings: SiteSettings = {
  siteName: "LUNARA JEWELS",
  tagline: "Premium Anti-Tarnish Jewellery",
  email: "hello@lunara.in",
  phone: "+91 98765 43210",
  address: "Mumbai, Maharashtra, India",
  instagram: "@lunara.jewels",
  freeShippingThreshold: 999,
  announcementText: "Free Shipping on Orders Above ₹999 ✦ Anti-Tarnish Guaranteed",
};

const sampleOrders: Order[] = [];

// ─── Reducer ────────────────────────────────────────────────────────────────
const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? { ...o, status: action.payload.status } : o
        ),
      };
    case "SET_SETTINGS":
      return { ...state, settings: action.payload };
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// ─── Context ────────────────────────────────────────────────────────────────
const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = "pakhi1602";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, {
    products: defaultProducts,
    orders: sampleOrders,
    settings: defaultSettings,
    isAuthenticated: false,
  });

  const firestoreActive = useRef(false);
  const isListeningToFirestore = useRef(false);

  // ─── 1. Load from localStorage on mount (instant, offline-first) ────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lunara-admin");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear legacy sample orders
        if (parsed.orders && Array.isArray(parsed.orders)) {
          const sampleIds = ["ORD-1001", "ORD-1002", "ORD-1003", "ORD-1004", "ORD-1005"];
          parsed.orders = parsed.orders.filter(
            (o: Order) => !sampleIds.includes(o.id)
          );
        }
        dispatch({ type: "LOAD_STATE", payload: parsed });
      }
      // Restore admin session
      const authSession = sessionStorage.getItem("lunara-admin-auth");
      if (authSession === "true") {
        dispatch({ type: "LOGIN" });
      }
    } catch {
      // ignore
    }
  }, []);

  // ─── 2. Connect to Firestore if configured ─────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      console.log("Firebase not configured — using localStorage only");
      return;
    }

    firestoreActive.current = true;

    // Subscribe to real-time orders from Firestore
    if (!isListeningToFirestore.current) {
      isListeningToFirestore.current = true;
      const unsubscribe = subscribeToOrders((orders) => {
        dispatch({ type: "SET_ORDERS", payload: orders });
      });

      // Load settings from Firestore
      loadSettingsFromFirestore().then((settings) => {
        if (settings) {
          dispatch({ type: "SET_SETTINGS", payload: settings });
        }
      });

      return () => {
        unsubscribe();
        isListeningToFirestore.current = false;
      };
    }
  }, []);

  // ─── 3. Save to localStorage on state change (always, as backup) ───────
  useEffect(() => {
    try {
      const toSave = {
        products: state.products,
        orders: state.orders,
        settings: state.settings,
      };
      localStorage.setItem("lunara-admin", JSON.stringify(toSave));
    } catch {
      // ignore
    }
  }, [state.products, state.orders, state.settings]);

  const addProduct = useCallback(
    (product: Product) => dispatch({ type: "ADD_PRODUCT", payload: product }),
    []
  );
  const updateProduct = useCallback(
    (product: Product) => dispatch({ type: "UPDATE_PRODUCT", payload: product }),
    []
  );
  const deleteProduct = useCallback(
    (id: string) => dispatch({ type: "DELETE_PRODUCT", payload: id }),
    []
  );
  const addOrder = useCallback(
    (order: Order) => {
      dispatch({ type: "ADD_ORDER", payload: order });
      // Sync to Firestore
      if (firestoreActive.current) {
        addOrderToFirestore(order);
      }
    },
    []
  );
  const updateOrderStatus = useCallback(
    (id: string, status: Order["status"]) => {
      dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id, status } });
      // Sync to Firestore
      if (firestoreActive.current) {
        updateOrderStatusInFirestore(id, status);
      }
    },
    []
  );
  const updateSettings = useCallback(
    (settings: SiteSettings) => {
      dispatch({ type: "SET_SETTINGS", payload: settings });
      // Sync to Firestore
      if (firestoreActive.current) {
        saveSettingsToFirestore(settings);
      }
    },
    []
  );
  const login = useCallback(
    (password: string) => {
      if (password === ADMIN_PASSWORD) {
        dispatch({ type: "LOGIN" });
        try { sessionStorage.setItem("lunara-admin-auth", "true"); } catch {}
        return true;
      }
      return false;
    },
    []
  );
  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    try { sessionStorage.removeItem("lunara-admin-auth"); } catch {}
  }, []);

  return (
    <AdminContext.Provider
      value={{
        state,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        updateSettings,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}

// Hook for store pages — returns live products & settings from admin
export function useStoreData() {
  const { state } = useAdmin();
  return {
    products: state.products,
    settings: state.settings,
  };
}
