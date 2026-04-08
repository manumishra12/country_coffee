"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-espresso"
          >
            {/* Radial glow behind logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.15, scale: 1.5 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute w-96 h-96 rounded-full bg-latte blur-[120px]"
            />

            <div className="relative flex flex-col items-center">
              {/* Rotating ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-latte/15"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-full h-full rounded-full border-t-2 border-latte/40"
                />
              </motion.div>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.3 }}
              >
                <Image
                  src="/logo.png"
                  alt="Country Coffee"
                  width={100}
                  height={100}
                  className="brightness-0 invert sm:w-[120px] sm:h-[120px]"
                  priority
                />
              </motion.div>

              {/* Brand name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="font-display text-2xl sm:text-3xl font-bold text-cream mt-8 tracking-tight"
              >
                Country Coffee
              </motion.h1>

              {/* Tagline with letter stagger */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-3 overflow-hidden"
              >
                <motion.p
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="font-accent text-[10px] sm:text-xs uppercase tracking-[0.4em] text-latte/50"
                >
                  Premium Artisan Roasters
                </motion.p>
              </motion.div>

              {/* Loading bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-10 w-32 sm:w-40 h-[2px] bg-cream/10 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.6, duration: 1.1, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-latte/40 via-latte to-latte/40 rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}
