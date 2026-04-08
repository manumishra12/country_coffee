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

export function AdminSidebar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Country Coffee" width={38} height={38} className="rounded-xl" />
          <div>
            <p className="text-cream font-display text-[17px] leading-tight">Country Coffee</p>
            <p className="text-cream/40 text-[9px] font-accent uppercase tracking-[0.2em]">Admin</p>
          </div>
        </Link>
        <button onClick={onToggle} aria-label="Close menu" className="lg:hidden text-cream/50 hover:text-cream">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-cream/10" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { if (window.innerWidth < 1024) onToggle(); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-accent transition-all ${
                active
                  ? "bg-mocha/20 text-latte border-l-2 border-latte"
                  : "text-cream/60 hover:text-cream hover:bg-white/5"
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6 space-y-1">
        <div className="mx-2 mb-3 border-t border-cream/10" />
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-accent text-cream/40 hover:text-cream hover:bg-white/5 transition-all"
        >
          <Store className="w-[18px] h-[18px]" />
          Back to Store
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-accent text-cream/40 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar — fixed left */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-espresso z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-espresso z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Toggle */}
      <button
        onClick={onToggle}
        aria-label="Open menu"
        className="fixed top-4 left-4 z-30 lg:hidden w-11 h-11 rounded-xl bg-espresso text-cream flex items-center justify-center shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
