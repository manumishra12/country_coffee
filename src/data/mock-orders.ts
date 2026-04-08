import type { CartItem, ShippingAddress, TrackingStep } from "@/store/cart-context";

export interface AdminOrder {
  id: string;
  items: CartItem[];
  shipping: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered";
  createdAt: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
  customerName: string;
  customerEmail: string;
  notes: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  orderIds: string[];
}

export interface AdminCoupon {
  id: string;
  code: string;
  discount: number;
  minOrder: number;
  description: string;
  active: boolean;
  usageCount: number;
  createdAt: string;
  expiresAt?: string;
}

export interface StoreSettings {
  storeName: string;
  taxRate: number;
  freeShippingThreshold: number;
  shippingCost: number;
  contactEmail: string;
  contactPhone: string;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function deliveryDate(orderDate: string): string {
  const d = new Date(orderDate);
  d.setDate(d.getDate() + 5);
  return d.toISOString();
}

function makeTracking(orderDate: string, status: string): TrackingStep[] {
  const d = new Date(orderDate);
  const statuses = ["confirmed", "processing", "shipped", "out_for_delivery", "delivered"];
  const idx = statuses.indexOf(status);

  return [
    { label: "Order Confirmed", location: "Country Coffee HQ, Coorg", time: d.toISOString(), completed: idx >= 0, coordinates: [12.4244, 75.7382] },
    { label: "Roasted & Packed", location: "Roastery, Coorg", time: new Date(d.getTime() + 3600000).toISOString(), completed: idx >= 1, coordinates: [12.43, 75.74] },
    { label: "Shipped", location: "Coorg Distribution Center", time: new Date(d.getTime() + 7200000).toISOString(), completed: idx >= 2, coordinates: [12.9716, 77.5946] },
    { label: "In Transit", location: "Regional Hub", time: new Date(d.getTime() + 18000000).toISOString(), completed: idx >= 2, coordinates: [17.385, 78.4867] },
    { label: "Out for Delivery", location: "Local Delivery Center", time: new Date(d.getTime() + 28800000).toISOString(), completed: idx >= 3, coordinates: [19.076, 72.8777] },
    { label: "Delivered", location: "Doorstep", time: new Date(d.getTime() + 36000000).toISOString(), completed: idx >= 4, coordinates: [19.076, 72.8777] },
  ];
}

export const mockOrders: AdminOrder[] = [
  {
    id: "CC-ORD001",
    items: [
      { id: "sunrise-blend", name: "Sunrise Blend", price: 599, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=1000&fit=crop&q=80", quantity: 2 },
      { id: "artisan-mug-cream", name: "Artisan Ceramic Mug — Cream", price: 1299, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=1000&fit=crop&q=80", quantity: 1 },
    ],
    shipping: { fullName: "Priya Sharma", email: "priya.sharma@email.com", phone: "+91 98765 43210", address: "42, MG Road, Indiranagar", city: "Bangalore", state: "Karnataka", zip: "560038", country: "India" },
    subtotal: 2497, shippingCost: 0, tax: 199.76, total: 2696.76,
    paymentMethod: "UPI", status: "delivered",
    createdAt: daysAgo(25), estimatedDelivery: deliveryDate(daysAgo(25)),
    trackingSteps: makeTracking(daysAgo(25), "delivered"),
    customerName: "Priya Sharma", customerEmail: "priya.sharma@email.com", notes: "", updatedAt: daysAgo(20),
  },
  {
    id: "CC-ORD002",
    items: [
      { id: "midnight-roast", name: "Midnight Roast", price: 749, image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&h=1000&fit=crop&q=80", quantity: 3 },
    ],
    shipping: { fullName: "Arjun Patel", email: "arjun.patel@email.com", phone: "+91 87654 32109", address: "15, Park Street", city: "Mumbai", state: "Maharashtra", zip: "400001", country: "India" },
    subtotal: 2247, shippingCost: 0, tax: 179.76, total: 2426.76,
    paymentMethod: "Card", status: "delivered",
    createdAt: daysAgo(22), estimatedDelivery: deliveryDate(daysAgo(22)),
    trackingSteps: makeTracking(daysAgo(22), "delivered"),
    customerName: "Arjun Patel", customerEmail: "arjun.patel@email.com", notes: "Regular customer", updatedAt: daysAgo(17),
  },
  {
    id: "CC-ORD003",
    items: [
      { id: "pour-over-set", name: "Pour Over Starter Set", price: 2499, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop&q=80", quantity: 1 },
      { id: "countryside-medium", name: "Countryside Medium", price: 649, image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&h=1000&fit=crop&q=80", quantity: 2 },
    ],
    shipping: { fullName: "Kavitha Nair", email: "kavitha.n@email.com", phone: "+91 76543 21098", address: "28, Anna Salai", city: "Chennai", state: "Tamil Nadu", zip: "600002", country: "India" },
    subtotal: 3797, shippingCost: 0, tax: 303.76, total: 4100.76,
    paymentMethod: "UPI", status: "delivered",
    createdAt: daysAgo(18), estimatedDelivery: deliveryDate(daysAgo(18)),
    trackingSteps: makeTracking(daysAgo(18), "delivered"),
    customerName: "Kavitha Nair", customerEmail: "kavitha.n@email.com", notes: "", updatedAt: daysAgo(13),
  },
  {
    id: "CC-ORD004",
    items: [
      { id: "harvest-reserve", name: "Harvest Reserve", price: 999, image: "https://images.unsplash.com/photo-1695653422259-8a74ffe90401?w=800&h=1000&fit=crop&q=80", quantity: 1 },
      { id: "tote-bag", name: "Country Coffee Tote", price: 899, image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&h=1000&fit=crop&q=80", quantity: 1 },
    ],
    shipping: { fullName: "Priya Sharma", email: "priya.sharma@email.com", phone: "+91 98765 43210", address: "42, MG Road, Indiranagar", city: "Bangalore", state: "Karnataka", zip: "560038", country: "India" },
    subtotal: 1898, shippingCost: 99, tax: 151.84, total: 2148.84,
    paymentMethod: "Card", status: "shipped",
    createdAt: daysAgo(12), estimatedDelivery: deliveryDate(daysAgo(12)),
    trackingSteps: makeTracking(daysAgo(12), "shipped"),
    customerName: "Priya Sharma", customerEmail: "priya.sharma@email.com", notes: "", updatedAt: daysAgo(10),
  },
  {
    id: "CC-ORD005",
    items: [
      { id: "hand-grinder", name: "Manual Burr Grinder", price: 2999, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=1000&fit=crop&q=80", quantity: 1 },
    ],
    shipping: { fullName: "Rahul Mehta", email: "rahul.mehta@email.com", phone: "+91 65432 10987", address: "7, Connaught Place", city: "New Delhi", state: "Delhi", zip: "110001", country: "India" },
    subtotal: 2999, shippingCost: 0, tax: 239.92, total: 3238.92,
    paymentMethod: "COD", status: "out_for_delivery",
    createdAt: daysAgo(8), estimatedDelivery: deliveryDate(daysAgo(8)),
    trackingSteps: makeTracking(daysAgo(8), "out_for_delivery"),
    customerName: "Rahul Mehta", customerEmail: "rahul.mehta@email.com", notes: "Cash on delivery — collect ₹3,239", updatedAt: daysAgo(6),
  },
  {
    id: "CC-ORD006",
    items: [
      { id: "sunrise-blend", name: "Sunrise Blend", price: 599, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=1000&fit=crop&q=80", quantity: 4 },
      { id: "notebook", name: "Brew Journal", price: 499, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=1000&fit=crop&q=80", quantity: 1 },
    ],
    shipping: { fullName: "Deepika Reddy", email: "deepika.r@email.com", phone: "+91 54321 09876", address: "33, Jubilee Hills", city: "Hyderabad", state: "Telangana", zip: "500033", country: "India" },
    subtotal: 2895, shippingCost: 0, tax: 231.60, total: 3126.60,
    paymentMethod: "UPI", status: "shipped",
    createdAt: daysAgo(6), estimatedDelivery: deliveryDate(daysAgo(6)),
    trackingSteps: makeTracking(daysAgo(6), "shipped"),
    customerName: "Deepika Reddy", customerEmail: "deepika.r@email.com", notes: "", updatedAt: daysAgo(4),
  },
  {
    id: "CC-ORD007",
    items: [
      { id: "artisan-mug-forest", name: "Artisan Ceramic Mug — Forest", price: 1299, image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&h=1000&fit=crop&q=80", quantity: 2 },
      { id: "apron", name: "Barista Apron", price: 1999, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop&q=80", quantity: 1 },
    ],
    shipping: { fullName: "Vikram Singh", email: "vikram.s@email.com", phone: "+91 43210 98765", address: "12, Sector 17", city: "Chandigarh", state: "Punjab", zip: "160017", country: "India" },
    subtotal: 4597, shippingCost: 0, tax: 367.76, total: 4964.76,
    paymentMethod: "Card", status: "processing",
    createdAt: daysAgo(3), estimatedDelivery: deliveryDate(daysAgo(3)),
    trackingSteps: makeTracking(daysAgo(3), "processing"),
    customerName: "Vikram Singh", customerEmail: "vikram.s@email.com", notes: "", updatedAt: daysAgo(3),
  },
  {
    id: "CC-ORD008",
    items: [
      { id: "countryside-medium", name: "Countryside Medium", price: 649, image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&h=1000&fit=crop&q=80", quantity: 1 },
      { id: "travel-tumbler", name: "Country Travel Tumbler", price: 1599, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&h=1000&fit=crop&q=80", quantity: 1 },
    ],
    shipping: { fullName: "Arjun Patel", email: "arjun.patel@email.com", phone: "+91 87654 32109", address: "15, Park Street", city: "Mumbai", state: "Maharashtra", zip: "400001", country: "India" },
    subtotal: 2248, shippingCost: 0, tax: 179.84, total: 2427.84,
    paymentMethod: "UPI", status: "confirmed",
    createdAt: daysAgo(2), estimatedDelivery: deliveryDate(daysAgo(2)),
    trackingSteps: makeTracking(daysAgo(2), "confirmed"),
    customerName: "Arjun Patel", customerEmail: "arjun.patel@email.com", notes: "", updatedAt: daysAgo(2),
  },
  {
    id: "CC-ORD009",
    items: [
      { id: "midnight-roast", name: "Midnight Roast", price: 749, image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&h=1000&fit=crop&q=80", quantity: 2 },
      { id: "artisan-mug-cream", name: "Artisan Ceramic Mug — Cream", price: 1299, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=1000&fit=crop&q=80", quantity: 1 },
    ],
    shipping: { fullName: "Ananya Gupta", email: "ananya.g@email.com", phone: "+91 32109 87654", address: "5, Salt Lake City", city: "Kolkata", state: "West Bengal", zip: "700091", country: "India" },
    subtotal: 2797, shippingCost: 0, tax: 223.76, total: 3020.76,
    paymentMethod: "Card", status: "confirmed",
    createdAt: daysAgo(1), estimatedDelivery: deliveryDate(daysAgo(1)),
    trackingSteps: makeTracking(daysAgo(1), "confirmed"),
    customerName: "Ananya Gupta", customerEmail: "ananya.g@email.com", notes: "Gift wrapping requested", updatedAt: daysAgo(1),
  },
  {
    id: "CC-ORD010",
    items: [
      { id: "sunrise-blend", name: "Sunrise Blend", price: 599, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=1000&fit=crop&q=80", quantity: 1 },
      { id: "harvest-reserve", name: "Harvest Reserve", price: 999, image: "https://images.unsplash.com/photo-1695653422259-8a74ffe90401?w=800&h=1000&fit=crop&q=80", quantity: 1 },
      { id: "pour-over-set", name: "Pour Over Starter Set", price: 2499, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop&q=80", quantity: 1 },
    ],
    shipping: { fullName: "Kavitha Nair", email: "kavitha.n@email.com", phone: "+91 76543 21098", address: "28, Anna Salai", city: "Chennai", state: "Tamil Nadu", zip: "600002", country: "India" },
    subtotal: 4097, shippingCost: 0, tax: 327.76, total: 4424.76,
    paymentMethod: "UPI", status: "processing",
    createdAt: daysAgo(0), estimatedDelivery: deliveryDate(daysAgo(0)),
    trackingSteps: makeTracking(daysAgo(0), "processing"),
    customerName: "Kavitha Nair", customerEmail: "kavitha.n@email.com", notes: "Repeat customer — second order", updatedAt: daysAgo(0),
  },
];

export const defaultCoupons: AdminCoupon[] = [
  { id: "cpn-1", code: "WELCOME10", discount: 10, minOrder: 0, description: "10% off your first order", active: true, usageCount: 24, createdAt: daysAgo(60) },
  { id: "cpn-2", code: "BREW20", discount: 20, minOrder: 2000, description: "20% off orders over ₹2,000", active: true, usageCount: 12, createdAt: daysAgo(45) },
  { id: "cpn-3", code: "COFFEE15", discount: 15, minOrder: 1000, description: "15% off orders over ₹1,000", active: true, usageCount: 18, createdAt: daysAgo(30) },
  { id: "cpn-4", code: "FREESHIP", discount: 5, minOrder: 0, description: "Free shipping equivalent", active: true, usageCount: 31, createdAt: daysAgo(90) },
  { id: "cpn-5", code: "SUMMER25", discount: 25, minOrder: 3000, description: "Summer sale — 25% off orders over ₹3,000", active: false, usageCount: 0, createdAt: daysAgo(5), expiresAt: daysAgo(-30) },
];

export const defaultSettings: StoreSettings = {
  storeName: "Country Coffee",
  taxRate: 8,
  freeShippingThreshold: 2000,
  shippingCost: 99,
  contactEmail: "hello@countrycoffee.in",
  contactPhone: "+91 80 4567 8901",
};
