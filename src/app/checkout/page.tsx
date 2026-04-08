"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, Shield, ChevronRight, Lock, Check, Tag, X } from "lucide-react";
import { useCart, type ShippingAddress } from "@/store/cart-context";
import { useCoupon } from "@/store/coupon-context";
import { ProductImage } from "@/components/product-image";
import Image from "next/image";

type Step = "shipping" | "payment" | "review";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
  { id: "upi", label: "UPI", icon: Shield, description: "Google Pay, PhonePe, Paytm" },
  { id: "cod", label: "Cash on Delivery", icon: Truck, description: "Pay when you receive" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, placeOrder } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [processing, setProcessing] = useState(false);

  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: "", email: "", phone: "", address: "", city: "", state: "", zip: "", country: "India",
  });

  const shippingCost = totalPrice > 2000 ? 0 : 99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shippingCost + tax;

  const steps: { key: Step; label: string }[] = [
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ];

  if (items.length === 0 && !processing) {
    return (
      <section className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Truck size={48} className="mx-auto text-espresso/20 mb-6" strokeWidth={1} />
            <h1 className="font-display text-3xl font-bold text-espresso mb-4">Your cart is empty</h1>
            <p className="text-espresso/50 mb-8">Add some products before checking out.</p>
            <button onClick={() => router.push("/shop")} className="bg-espresso text-cream px-8 py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors">
              Browse Shop
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2500));
    const order = placeOrder(shipping, selectedPayment);
    router.push(`/order/${order.id}`);
  };

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="pt-28 pb-24 min-h-screen bg-cream-dark">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Image src="/logo.png" alt="Country Coffee" width={32} height={32} />
            <span className="font-display text-lg font-bold text-espresso">Checkout</span>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (s.key === "shipping") setStep("shipping");
                    if (s.key === "payment" && shipping.fullName) setStep("payment");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-accent text-xs uppercase tracking-[0.15em] transition-all ${
                    step === s.key
                      ? "bg-espresso text-cream"
                      : steps.indexOf(steps.find((x) => x.key === step)!) > i
                      ? "bg-sage/20 text-sage"
                      : "bg-espresso/5 text-espresso/40"
                  }`}
                >
                  {steps.indexOf(steps.find((x) => x.key === step)!) > i ? <Check size={12} /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && <ChevronRight size={14} className="text-espresso/20" />}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* SHIPPING STEP */}
              {step === "shipping" && (
                <motion.form
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleShippingSubmit}
                  className="bg-white rounded-3xl p-8 shadow-sm"
                >
                  <h2 className="font-display text-2xl font-bold text-espresso mb-6">Shipping Details</h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Full Name" value={shipping.fullName} onChange={(v) => updateField("fullName", v)} required placeholder="John Doe" />
                      <InputField label="Email" type="email" value={shipping.email} onChange={(v) => updateField("email", v)} required placeholder="john@email.com" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Phone" type="tel" value={shipping.phone} onChange={(v) => updateField("phone", v)} required placeholder="+91 98765 43210" />
                      <InputField label="Country" value={shipping.country} onChange={(v) => updateField("country", v)} required placeholder="India" />
                    </div>
                    <InputField label="Address" value={shipping.address} onChange={(v) => updateField("address", v)} required placeholder="123 Brew Street, Apt 4" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                      <InputField label="City" value={shipping.city} onChange={(v) => updateField("city", v)} required placeholder="Mumbai" />
                      <InputField label="State" value={shipping.state} onChange={(v) => updateField("state", v)} required placeholder="Maharashtra" />
                      <InputField label="ZIP Code" value={shipping.zip} onChange={(v) => updateField("zip", v)} required placeholder="400001" />
                    </div>
                  </div>
                  <button type="submit" className="mt-8 w-full bg-espresso text-cream py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors flex items-center justify-center gap-2">
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </motion.form>
              )}

              {/* PAYMENT STEP */}
              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl p-8 shadow-sm"
                >
                  <h2 className="font-display text-2xl font-bold text-espresso mb-6">Payment Method</h2>
                  <div className="space-y-4 mb-8">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                          selectedPayment === method.id
                            ? "border-mocha bg-mocha/5"
                            : "border-espresso/10 hover:border-espresso/20"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedPayment === method.id ? "bg-mocha text-cream" : "bg-espresso/5 text-espresso/40"
                        }`}>
                          <method.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-display font-semibold text-espresso">{method.label}</p>
                          <p className="text-xs text-espresso/40 font-accent">{method.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id ? "border-mocha" : "border-espresso/20"
                        }`}>
                          {selectedPayment === method.id && <div className="w-2.5 h-2.5 rounded-full bg-mocha" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Card form (shown only for card) */}
                  {selectedPayment === "card" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-5 mb-8 overflow-hidden">
                      <InputField label="Card Number" placeholder="4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-5">
                        <InputField label="Expiry" placeholder="MM / YY" />
                        <InputField label="CVV" placeholder="123" />
                      </div>
                      <InputField label="Name on Card" placeholder="John Doe" />
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <button onClick={() => setStep("shipping")} className="flex-1 border border-espresso/20 text-espresso py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-espresso/5 transition-colors">
                      Back
                    </button>
                    <button onClick={() => setStep("review")} className="flex-1 bg-espresso text-cream py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors flex items-center justify-center gap-2">
                      Review Order <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* REVIEW STEP */}
              {step === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl p-8 shadow-sm"
                >
                  <h2 className="font-display text-2xl font-bold text-espresso mb-6">Review Your Order</h2>

                  {/* Shipping summary */}
                  <div className="p-5 bg-cream rounded-2xl mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-accent text-xs uppercase tracking-[0.15em] text-espresso/40">Shipping To</p>
                      <button onClick={() => setStep("shipping")} className="text-xs text-mocha font-accent uppercase tracking-wider hover:underline">Edit</button>
                    </div>
                    <p className="font-display font-semibold text-espresso">{shipping.fullName}</p>
                    <p className="text-sm text-espresso/60">{shipping.address}</p>
                    <p className="text-sm text-espresso/60">{shipping.city}, {shipping.state} {shipping.zip}</p>
                    <p className="text-sm text-espresso/60">{shipping.email} &middot; {shipping.phone}</p>
                  </div>

                  {/* Payment summary */}
                  <div className="p-5 bg-cream rounded-2xl mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-accent text-xs uppercase tracking-[0.15em] text-espresso/40">Payment</p>
                      <button onClick={() => setStep("payment")} className="text-xs text-mocha font-accent uppercase tracking-wider hover:underline">Edit</button>
                    </div>
                    <p className="font-display font-semibold text-espresso">
                      {paymentMethods.find((m) => m.id === selectedPayment)?.label}
                    </p>
                    {selectedPayment === "card" && <p className="text-sm text-espresso/60">**** **** **** 4242</p>}
                  </div>

                  {/* Items */}
                  <div className="space-y-4 mb-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-14 h-14 rounded-xl bg-cream overflow-hidden relative flex-shrink-0">
                          <ProductImage src={item.image} alt={item.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm font-semibold text-espresso truncate">{item.name}</p>
                          <p className="text-xs text-espresso/40 font-accent">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-accent text-sm font-medium text-espresso">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep("payment")} className="flex-1 border border-espresso/20 text-espresso py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-espresso/5 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={processing}
                      className="flex-1 bg-espresso text-cream py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {processing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock size={14} />
                          Place Order &middot; ₹{orderTotal.toLocaleString("en-IN")}
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-[10px] text-espresso/30 font-accent mt-4 flex items-center justify-center gap-1">
                    <Shield size={10} /> Secured with 256-bit SSL encryption
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-28">
              <h3 className="font-display text-lg font-semibold text-espresso mb-5">Order Summary</h3>
              <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-cream overflow-hidden relative flex-shrink-0">
                      <ProductImage src={item.image} alt={item.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-display font-semibold text-espresso truncate">{item.name}</p>
                      <p className="text-[10px] text-espresso/40 font-accent">x{item.quantity}</p>
                    </div>
                    <p className="text-xs font-accent font-medium text-espresso">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-espresso/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/50 font-accent">Subtotal</span>
                  <span className="font-accent font-medium">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/50 font-accent">Shipping</span>
                  <span className="font-accent font-medium">{shippingCost === 0 ? <span className="text-sage">Free</span> : `₹${shippingCost.toLocaleString("en-IN")}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-espresso/50 font-accent">Tax (8%)</span>
                  <span className="font-accent font-medium">₹{Math.round(tax).toLocaleString("en-IN")}</span>
                </div>
                <div className="border-t border-espresso/10 pt-3 flex justify-between">
                  <span className="font-display font-bold text-espresso">Total</span>
                  <span className="font-display text-xl font-bold text-espresso">₹{orderTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mt-4">
                <CouponInput subtotal={totalPrice} />
              </div>

              {totalPrice < 2000 && (
                <p className="text-[10px] text-mocha font-accent mt-4 bg-mocha/5 p-3 rounded-xl text-center">
                  Add ₹{(2000 - totalPrice).toLocaleString("en-IN")} more for free shipping!
                </p>
              )}

              <div className="mt-5 flex items-center gap-2 text-[10px] text-espresso/30 font-accent justify-center">
                <Truck size={12} /> Estimated delivery: 3-5 business days
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CouponInput({ subtotal }: { subtotal: number }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const { appliedCoupon, applyCoupon, removeCoupon, getDiscount } = useCoupon();

  const handleApply = () => {
    const result = applyCoupon(code, subtotal);
    setMessage(result.message);
    if (result.success) setCode("");
  };

  if (appliedCoupon) {
    return (
      <div className="bg-sage/10 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag size={12} className="text-sage" />
          <span className="text-xs font-accent text-sage font-medium">{appliedCoupon.code}</span>
          <span className="text-[10px] text-sage/70">−₹{Math.round(getDiscount(subtotal)).toLocaleString("en-IN")}</span>
        </div>
        <button onClick={removeCoupon} className="p-1 hover:bg-sage/10 rounded-full"><X size={12} className="text-sage" /></button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="flex-1 px-3 py-2 rounded-lg bg-cream border border-transparent text-xs font-accent text-espresso placeholder:text-espresso/25 focus:outline-none focus:border-mocha" />
        <button onClick={handleApply} disabled={!code.trim()} className="px-3 py-2 bg-espresso text-cream rounded-lg font-accent text-xs disabled:opacity-40">Apply</button>
      </div>
      {message && <p className={`text-[10px] mt-1.5 font-accent ${message.includes("Invalid") || message.includes("Minimum") ? "text-red-400" : "text-sage"}`}>{message}</p>}
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", required = false, placeholder = "" }: {
  label: string; value?: string; onChange?: (v: string) => void; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-accent text-[10px] uppercase tracking-[0.15em] text-espresso/40 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-xl bg-cream border border-transparent text-espresso placeholder:text-espresso/25 font-body text-sm focus:outline-none focus:border-mocha transition-colors"
      />
    </div>
  );
}
