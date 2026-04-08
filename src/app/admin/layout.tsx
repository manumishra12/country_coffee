"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { AdminNavbar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [isLoginPage, router]);

  // Login page renders without nav
  if (isLoginPage) return <>{children}</>;

  // Wait for auth check
  if (!checked) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-mocha/30 border-t-mocha rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <AdminNavbar open={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
      <div className="max-w-[1400px] mx-auto">
        <AdminHeader />
        <main className="px-4 sm:px-6 lg:px-8 pb-8">{children}</main>
      </div>
    </div>
  );
}
