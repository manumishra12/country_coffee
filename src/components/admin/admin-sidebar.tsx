"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag, Settings,
  LogOut, Store, X, Menu,
} from "lucide-react";
import { logout } from "@/lib/admin-auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export function AdminNavbar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-latte-light/40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-2.5 shrink-0">
              <Image src="/logo.png" alt="Country Coffee" width={36} height={36} className="rounded-lg" />
              <div className="hidden sm:block">
                <p className="font-display text-base text-espresso leading-tight">Country Coffee</p>
                <p className="text-[9px] font-accent uppercase tracking-[0.2em] text-warm-gray">Admin</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-accent transition-all ${
                      active
                        ? "bg-espresso text-cream"
                        : "text-warm-gray hover:text-espresso hover:bg-cream-dark/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-accent text-warm-gray hover:text-espresso hover:bg-cream-dark/50 transition-all"
              >
                <Store className="w-3.5 h-3.5" />
                Store
              </Link>
              <button
                onClick={logout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-accent text-warm-gray hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
              {/* Mobile Hamburger */}
              <button
                onClick={onToggle}
                aria-label="Open menu"
                className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-espresso hover:bg-cream-dark/50 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 z-50 bg-white rounded-b-2xl shadow-xl lg:hidden"
            >
              <div className="p-5">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-5">
                  <Link href="/admin" className="flex items-center gap-2.5" onClick={onToggle}>
                    <Image src="/logo.png" alt="Country Coffee" width={32} height={32} className="rounded-lg" />
                    <p className="font-display text-base text-espresso">Country Coffee</p>
                  </Link>
                  <button onClick={onToggle} aria-label="Close menu" className="w-10 h-10 rounded-lg flex items-center justify-center text-warm-gray hover:text-espresso hover:bg-cream-dark/50 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onToggle}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-accent transition-all ${
                          active
                            ? "bg-espresso text-cream"
                            : "text-espresso/70 hover:text-espresso hover:bg-cream-dark/40"
                        }`}
                      >
                        <item.icon className="w-[18px] h-[18px]" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Footer Actions */}
                <div className="mt-4 pt-4 border-t border-latte-light/30 flex gap-2">
                  <Link
                    href="/"
                    onClick={onToggle}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-accent text-warm-gray border border-latte-light/30 hover:bg-cream-dark/40 transition-all"
                  >
                    <Store className="w-4 h-4" />
                    Store
                  </Link>
                  <button
                    onClick={logout}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-accent text-red-500 border border-red-200 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
