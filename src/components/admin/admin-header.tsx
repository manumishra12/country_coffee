"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/products/new": "Add Product",
  "/admin/orders": "Orders",
  "/admin/customers": "Customers",
  "/admin/coupons": "Coupons",
  "/admin/settings": "Settings",
};

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];

  let current = "";
  for (const part of parts) {
    current += `/${part}`;
    if (part === "edit") {
      crumbs.push({ label: "Edit", href: current });
    } else if (part.match(/^CC-/i)) {
      // Order IDs like CC-ORD001
      crumbs.push({ label: part, href: current });
    } else if (!pageTitles[current] && crumbs.length >= 2) {
      // Dynamic ID segment — show truncated ID
      const label = part.length > 12 ? part.slice(0, 12) + "..." : part;
      crumbs.push({ label, href: current });
    } else {
      const label = pageTitles[current] || part.charAt(0).toUpperCase() + part.slice(1);
      crumbs.push({ label, href: current });
    }
  }

  return crumbs;
}

export function AdminHeader() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);
  const title = crumbs[crumbs.length - 1]?.label || "Dashboard";

  return (
    <header className="bg-white border-b border-latte-light/50 px-4 sm:px-6 lg:px-8 py-4">
      <nav className="flex items-center gap-1 text-xs font-accent text-warm-gray mb-1 overflow-x-auto whitespace-nowrap">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1 shrink-0">
            {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
            {i < crumbs.length - 1 ? (
              <Link href={crumb.href} className="hover:text-espresso transition-colors truncate max-w-[120px]">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-espresso truncate max-w-[150px]">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
      <h1 className="font-display text-xl sm:text-2xl text-espresso">{title}</h1>
    </header>
  );
}
