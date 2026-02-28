import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  getDoc,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Order, SiteSettings } from "@/context/AdminContext";

// ─── Collection References ──────────────────────────────────────────────────
const ORDERS_COLLECTION = "orders";
const SETTINGS_DOC = "config/settings";

// ─── Orders ─────────────────────────────────────────────────────────────────

/** Add a new order to Firestore */
export async function addOrderToFirestore(order: Order): Promise<void> {
  try {
    await setDoc(doc(db, ORDERS_COLLECTION, order.id), {
      ...order,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to save order to Firestore:", error);
    // Non-blocking — order still works via localStorage as fallback
  }
}

/** Update order status in Firestore */
export async function updateOrderStatusInFirestore(
  orderId: string,
  status: Order["status"]
): Promise<void> {
  try {
    await updateDoc(doc(db, ORDERS_COLLECTION, orderId), { status });
  } catch (error) {
    console.error("Failed to update order in Firestore:", error);
  }
}

/** Delete an order from Firestore */
export async function deleteOrderFromFirestore(orderId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
  } catch (error) {
    console.error("Failed to delete order from Firestore:", error);
  }
}

/** Subscribe to real-time order updates — returns unsubscribe function */
export function subscribeToOrders(
  callback: (orders: Order[]) => void
): Unsubscribe {
  const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const orders: Order[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: data.id || doc.id,
          customerName: data.customerName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          items: data.items || [],
          total: data.total || 0,
          status: data.status || "pending",
          date: data.date || "",
          paymentMethod: data.paymentMethod || "",
        } as Order;
      });
      callback(orders);
    },
    (error) => {
      console.error("Firestore orders listener error:", error);
    }
  );
}

// ─── Settings ───────────────────────────────────────────────────────────────

/** Save settings to Firestore */
export async function saveSettingsToFirestore(settings: SiteSettings): Promise<void> {
  try {
    await setDoc(doc(db, "config", "settings"), settings);
  } catch (error) {
    console.error("Failed to save settings to Firestore:", error);
  }
}

/** Load settings from Firestore */
export async function loadSettingsFromFirestore(): Promise<SiteSettings | null> {
  try {
    const snap = await getDoc(doc(db, "config", "settings"));
    if (snap.exists()) return snap.data() as SiteSettings;
    return null;
  } catch (error) {
    console.error("Failed to load settings from Firestore:", error);
    return null;
  }
}

// ─── Health check ───────────────────────────────────────────────────────────

/** Check if Firebase is configured (not placeholder values) */
export function isFirebaseConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  return Boolean(projectId && projectId !== "YOUR_PROJECT_ID" && projectId.length > 3);
}
