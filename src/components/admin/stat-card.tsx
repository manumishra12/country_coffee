"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  color?: "mocha" | "sage" | "forest" | "latte" | "gold";
}

const colorMap = {
  mocha: "bg-mocha/10 text-mocha",
  sage: "bg-sage/10 text-sage",
  forest: "bg-forest/10 text-forest",
  latte: "bg-latte/20 text-mocha",
  gold: "bg-gold/10 text-gold",
};

export function StatCard({ label, value, icon: Icon, trend, color = "mocha" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-latte-light/30"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-accent px-2 py-1 rounded-full ${trend.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            {trend.positive ? "+" : ""}{trend.value}
          </span>
        )}
      </div>
      <p className="font-display text-2xl sm:text-3xl text-espresso">{value}</p>
      <p className="text-warm-gray text-xs font-accent uppercase tracking-widest mt-1">{label}</p>
    </motion.div>
  );
}
