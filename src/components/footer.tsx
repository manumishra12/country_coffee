import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, MessageCircle } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "Coffee Beans", href: "/shop?category=beans" },
    { label: "Mugs & Tumblers", href: "/shop?category=mugs" },
    { label: "Equipment", href: "/shop?category=equipment" },
    { label: "Merch", href: "/shop?category=merch" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#story" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/faq" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Track Order", href: "/tracking/latest" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-espresso text-cream/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Country Coffee" width={56} height={56} className="brightness-0 invert opacity-80" />
              <h3 className="font-display text-3xl font-bold text-cream">
                Country Coffee
              </h3>
            </div>
            <p className="text-cream/50 max-w-sm leading-relaxed text-sm">
              From farm to cup, we craft every blend with care. Experience the
              taste of tradition, reimagined for the modern coffee lover.
            </p>
            <div className="flex gap-4 mt-6">
              {[Globe, Mail, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream/10 hover:border-cream/40 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-accent text-xs uppercase tracking-[0.2em] text-cream/40 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30 font-accent">
            &copy; {new Date().getFullYear()} Country Coffee. All rights
            reserved.
          </p>
          <p className="text-xs text-cream/30 font-accent">
            Crafted with care, roasted with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
