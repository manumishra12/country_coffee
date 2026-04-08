"use client";

import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon = PackageOpen, title, message, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-latte/10 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-latte" />
      </div>
      <h3 className="font-display text-lg text-espresso mb-1">{title}</h3>
      <p className="text-warm-gray text-sm font-body text-center max-w-xs">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-5 py-2.5 rounded-xl bg-espresso text-cream text-sm font-accent hover:bg-espresso-light transition-colors"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
