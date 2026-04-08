"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Package, MapPin, Truck, Check, Coffee, Home, Clock, ArrowLeft } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const stepIcons = [Coffee, Package, Truck, MapPin, Truck, Home];

export default function TrackingPage() {
  const { currentOrder } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [liveTime, setLiveTime] = useState(new Date());
  const mapRef = useRef<HTMLDivElement>(null);

  // Animate through steps
  useEffect(() => {
    if (!currentOrder) return;
    const completedCount = currentOrder.trackingSteps.filter((s) => s.completed).length;
    let step = 0;
    const interval = setInterval(() => {
      if (step < completedCount) {
        setActiveStep(step);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [currentOrder]);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!currentOrder) {
    return (
      <section className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Truck size={48} className="mx-auto text-espresso/20 mb-6" strokeWidth={1} />
          <h1 className="font-display text-3xl font-bold text-espresso mb-4">No order to track</h1>
          <button onClick={() => router.push("/shop")} className="bg-espresso text-cream px-8 py-4 rounded-full font-accent text-sm uppercase tracking-[0.15em]">
            Browse Shop
          </button>
        </div>
      </section>
    );
  }

  const completedSteps = currentOrder.trackingSteps.filter((s) => s.completed).length;
  const progress = (completedSteps / currentOrder.trackingSteps.length) * 100;

  return (
    <section className="pt-28 pb-24 min-h-screen bg-cream-dark">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href={`/order/${currentOrder.id}`} className="inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.15em] text-espresso/50 hover:text-espresso transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Order
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-espresso">Live Tracking</h1>
              <p className="font-accent text-xs uppercase tracking-[0.2em] text-mocha mt-1">Order #{currentOrder.id}</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span className="font-accent text-xs text-espresso/60">
                Live &middot; {liveTime.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div ref={mapRef} className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {/* Animated Map */}
              <div className="relative h-[400px] lg:h-[500px] bg-gradient-to-br from-sage/10 via-cream to-latte/10 overflow-hidden">
                {/* Map grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <g key={i}>
                      <line x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="currentColor" strokeWidth="0.3" className="text-espresso" />
                      <line x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="currentColor" strokeWidth="0.3" className="text-espresso" />
                    </g>
                  ))}
                </svg>

                {/* Route path */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                  {/* Route line background */}
                  <motion.path
                    d="M 80 340 C 120 300 160 260 220 220 C 280 180 320 140 380 120 C 440 100 480 80 520 100"
                    fill="none"
                    stroke="#C4A882"
                    strokeWidth="3"
                    strokeDasharray="8 8"
                    opacity={0.2}
                  />

                  {/* Animated route line */}
                  <motion.path
                    d="M 80 340 C 120 300 160 260 220 220 C 280 180 320 140 380 120 C 440 100 480 80 520 100"
                    fill="none"
                    stroke="#6B4226"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />

                  {/* Waypoints */}
                  {currentOrder.trackingSteps.map((step, i) => {
                    const positions = [
                      [80, 340], [150, 280], [220, 220], [350, 140], [450, 100], [520, 100],
                    ];
                    const [cx, cy] = positions[i];
                    const isActive = i <= activeStep;
                    const isCurrent = i === activeStep;

                    return (
                      <g key={i}>
                        {/* Pulse ring for current */}
                        {isCurrent && (
                          <motion.circle
                            cx={cx} cy={cy} r={20}
                            fill="none" stroke="#6B4226" strokeWidth="1.5"
                            initial={{ r: 10, opacity: 1 }}
                            animate={{ r: 25, opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        )}
                        {/* Dot */}
                        <motion.circle
                          cx={cx} cy={cy}
                          initial={{ r: 0 }}
                          animate={{ r: isCurrent ? 8 : 6 }}
                          transition={{ delay: i * 0.4, type: "spring" }}
                          fill={isActive ? "#6B4226" : "#EDE6D6"}
                          stroke={isActive ? "#6B4226" : "#C4A882"}
                          strokeWidth="2"
                        />
                        {isActive && (
                          <motion.circle
                            cx={cx} cy={cy} r={3}
                            fill="white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.4 + 0.2 }}
                          />
                        )}
                        {/* Label */}
                        <motion.text
                          x={cx} y={cy - 16}
                          textAnchor="middle"
                          className="fill-espresso text-[9px] font-accent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isActive ? 1 : 0.3 }}
                          transition={{ delay: i * 0.4 }}
                        >
                          {step.label}
                        </motion.text>
                      </g>
                    );
                  })}

                  {/* Moving truck icon along path */}
                  <motion.g
                    initial={{ x: 80, y: 340 }}
                    animate={{
                      x: [80, 150, 220, 350, 450][Math.min(activeStep, 4)],
                      y: [340, 280, 220, 140, 100][Math.min(activeStep, 4)],
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#2C1810" />
                    <text x="0" y="5" textAnchor="middle" className="fill-cream text-[14px]">
                      ☕
                    </text>
                  </motion.g>
                </svg>

                {/* Location labels on map */}
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-espresso/40">Current Location</p>
                  <p className="font-display text-sm font-semibold text-espresso">
                    {currentOrder.trackingSteps[Math.min(activeStep, currentOrder.trackingSteps.length - 1)].location}
                  </p>
                </div>

                {/* ETA badge */}
                <div className="absolute top-4 right-4 bg-espresso text-cream rounded-xl px-4 py-2">
                  <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-cream/60">Est. Delivery</p>
                  <p className="font-display text-sm font-bold">
                    {new Date(currentOrder.estimatedDelivery).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-accent text-xs text-espresso/40 uppercase tracking-wider">Delivery Progress</p>
                  <p className="font-accent text-xs font-medium text-mocha">{Math.round(progress)}%</p>
                </div>
                <div className="h-2 bg-cream rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-mocha to-sage rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tracking Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-espresso mb-6">Tracking Timeline</h3>
              <div className="space-y-0">
                {currentOrder.trackingSteps.map((step, i) => {
                  const isActive = i <= activeStep;
                  const isCurrent = i === activeStep;
                  const StepIcon = stepIcons[i] || Package;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + 0.5 }}
                      className="relative flex gap-4"
                    >
                      {/* Connector line */}
                      {i < currentOrder.trackingSteps.length - 1 && (
                        <div className="absolute left-[19px] top-10 w-[2px] h-[calc(100%-10px)]">
                          <motion.div
                            className="w-full bg-mocha"
                            initial={{ height: 0 }}
                            animate={{ height: isActive ? "100%" : "0%" }}
                            transition={{ delay: i * 0.4 + 0.8, duration: 0.5 }}
                          />
                          <div className="absolute inset-0 bg-espresso/10" />
                        </div>
                      )}

                      {/* Icon */}
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                          isCurrent
                            ? "bg-mocha text-cream"
                            : isActive
                            ? "bg-sage/20 text-sage"
                            : "bg-espresso/5 text-espresso/20"
                        }`}
                        animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {isActive && !isCurrent ? <Check size={14} /> : <StepIcon size={14} />}
                      </motion.div>

                      {/* Content */}
                      <div className="pb-8 flex-1 min-w-0">
                        <p className={`font-display text-sm font-semibold ${isActive ? "text-espresso" : "text-espresso/30"}`}>
                          {step.label}
                        </p>
                        <p className={`text-xs mt-0.5 ${isActive ? "text-espresso/50" : "text-espresso/20"}`}>
                          {step.location}
                        </p>
                        <p className="text-[10px] text-espresso/30 font-accent mt-1 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(step.time).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          {" · "}
                          {new Date(step.time).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Order summary mini card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">
              <h3 className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-3">Order Summary</h3>
              <div className="flex items-center justify-between mb-3">
                <p className="font-display font-semibold text-espresso text-sm">{currentOrder.items.length} items</p>
                <p className="font-display font-bold text-espresso">${currentOrder.total.toFixed(2)}</p>
              </div>
              <Link href={`/order/${currentOrder.id}`} className="block w-full text-center bg-cream text-espresso py-3 rounded-full font-accent text-xs uppercase tracking-[0.15em] hover:bg-cream-dark transition-colors">
                View Invoice
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
