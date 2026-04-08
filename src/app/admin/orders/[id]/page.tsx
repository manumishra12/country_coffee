"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Package, Truck, MapPin, Coffee, CheckCircle2, Clock, Printer, ArrowLeft, MessageSquare,
} from "lucide-react";
import { useAdmin } from "@/store/admin-context";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { formatPrice } from "@/lib/format";

const statusOptions = [
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
];

const stepIcons = [Coffee, Package, Truck, Truck, MapPin, CheckCircle2];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { orders, updateOrderStatus, updateOrderNotes, hydrated } = useAdmin();
  const [newStatus, setNewStatus] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [notesInit, setNotesInit] = useState(false);

  if (!hydrated) return null;

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return <EmptyState title="Order not found" message="This order may not exist." action={{ label: "Back to Orders", onClick: () => router.push("/admin/orders") }} />;
  }

  if (!notesInit) {
    setNotes(order.notes);
    setNewStatus(order.status);
    setNotesInit(true);
  }

  const handleStatusUpdate = () => {
    if (newStatus && newStatus !== order.status) {
      updateOrderStatus(order.id, newStatus as typeof order.status);
    }
  };

  const handleNotesSave = () => {
    updateOrderNotes(order.id, notes);
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <button onClick={() => router.push("/admin/orders")} className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-espresso font-accent transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-display text-lg sm:text-xl text-espresso">{order.id}</h2>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-warm-gray font-body">
            Placed {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            &nbsp;&middot;&nbsp;{order.customerName}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-latte-light bg-cream/30 text-sm font-accent text-espresso focus:outline-none focus:border-mocha"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={newStatus === order.status}
            className="px-5 py-2.5 rounded-xl bg-espresso text-cream text-sm font-accent hover:bg-espresso-light transition-colors disabled:opacity-30"
          >
            Update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items + Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-latte-light/30">
              <h3 className="font-display text-base text-espresso">Order Items</h3>
            </div>
            <div className="divide-y divide-latte-light/20">
              {order.items.map((item) => (
                <div key={item.id} className="px-5 sm:px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-espresso truncate">{item.name}</p>
                    <p className="text-xs text-warm-gray">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-accent text-espresso">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="px-5 sm:px-6 py-4 bg-cream/30 space-y-1">
              <div className="flex justify-between text-sm text-warm-gray"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between text-sm text-warm-gray"><span>Shipping</span><span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}</span></div>
              <div className="flex justify-between text-sm text-warm-gray"><span>Tax</span><span>{formatPrice(order.tax)}</span></div>
              <div className="flex justify-between text-sm font-accent text-espresso pt-2 border-t border-latte-light/30"><span>Total</span><span>{formatPrice(order.total)}</span></div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5 sm:p-6">
            <h3 className="font-display text-base text-espresso mb-5">Tracking Timeline</h3>
            <div className="space-y-0">
              {order.trackingSteps.map((step, i) => {
                const Icon = stepIcons[i] || CheckCircle2;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed ? "bg-forest/10 text-forest" : "bg-latte-light/30 text-warm-gray"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      {i < order.trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-8 ${step.completed ? "bg-forest/20" : "bg-latte-light/30"}`} />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className={`text-sm font-medium ${step.completed ? "text-espresso" : "text-warm-gray"}`}>{step.label}</p>
                      <p className="text-xs text-warm-gray">{step.location}</p>
                      <p className="text-[11px] text-warm-gray/60 font-accent flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(step.time).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5 sm:p-6">
            <h3 className="font-display text-base text-espresso mb-4">Customer</h3>
            <div className="space-y-3 text-sm">
              <div><p className="text-xs font-accent text-warm-gray uppercase tracking-widest mb-0.5">Name</p><p className="text-espresso">{order.shipping.fullName}</p></div>
              <div><p className="text-xs font-accent text-warm-gray uppercase tracking-widest mb-0.5">Email</p><p className="text-espresso">{order.shipping.email}</p></div>
              <div><p className="text-xs font-accent text-warm-gray uppercase tracking-widest mb-0.5">Phone</p><p className="text-espresso">{order.shipping.phone}</p></div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5 sm:p-6">
            <h3 className="font-display text-base text-espresso mb-4">Shipping Address</h3>
            <p className="text-sm text-espresso leading-relaxed wrap-break-word">
              {order.shipping.address}<br />
              {order.shipping.city}, {order.shipping.state} {order.shipping.zip}<br />
              {order.shipping.country}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5 sm:p-6">
            <h3 className="font-display text-base text-espresso mb-3">Payment</h3>
            <p className="text-sm text-espresso">{order.paymentMethod}</p>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-5 sm:p-6">
            <h3 className="font-display text-base text-espresso mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-warm-gray" /> Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-latte-light bg-cream/30 text-sm text-espresso focus:outline-none focus:border-mocha resize-none font-body"
              placeholder="Add internal notes..."
            />
            <button
              onClick={handleNotesSave}
              className="mt-2 w-full py-2 rounded-xl border border-latte-light text-xs font-accent text-espresso hover:bg-cream transition-colors"
            >
              Save Notes
            </button>
          </div>

          {/* Actions */}
          <button
            onClick={() => window.print()}
            className="w-full py-2.5 rounded-xl border border-latte-light text-sm font-accent text-espresso hover:bg-cream transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
