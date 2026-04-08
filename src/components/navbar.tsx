"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Heart, Search } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";
import { CartDrawer } from "./cart-drawer";
import { SearchModal } from "./search-modal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, isOpen, setIsOpen } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl+K to open search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Image
                src="/logo.png"
                alt="Country Coffee"
                width={48}
                height={48}
                className="transition-transform duration-300 group-hover:scale-105 sm:w-14 sm:h-14"
                priority
              />
              <span className="font-display text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-espresso group-hover:text-mocha transition-colors hidden xs:inline">
                Country Coffee
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-accent text-xs lg:text-sm uppercase tracking-[0.2em] text-espresso/70 hover:text-espresso transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-mocha transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-espresso/5 rounded-full transition-colors"
                aria-label="Search products"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 hover:bg-espresso/5 rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 hover:bg-espresso/5 rounded-full transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-mocha text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 hover:bg-espresso/5 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-cream/95 backdrop-blur-md border-t border-espresso/10 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-2xl text-espresso hover:text-mocha transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="font-display text-2xl text-espresso hover:text-mocha transition-colors">
                    Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
