import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/store/cart-context";
import { WishlistProvider } from "@/store/wishlist-context";
import { CouponProvider } from "@/store/coupon-context";
import { RecentlyViewedProvider } from "@/store/recently-viewed";
import { AdminProvider } from "@/store/admin-context";
import { LayoutShell } from "@/components/layout-shell";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Country Coffee",
  description:
    "Experience the finest hand-roasted coffee beans sourced from the world's best farms. Country Coffee — where tradition meets taste.",
  keywords: ["coffee", "artisan", "single origin", "premium coffee", "coffee beans", "pour over", "country coffee"],
  openGraph: {
    title: "Country Coffee",
    description: "Hand-roasted in small batches, sourced from the world's finest farms.",
    type: "website",
    locale: "en_IN",
    siteName: "Country Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Country Coffee",
    description: "Hand-roasted in small batches, sourced from the world's finest farms.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/logo.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="grain-overlay min-h-full flex flex-col bg-cream text-espresso">
        <CartProvider>
          <WishlistProvider>
            <CouponProvider>
              <RecentlyViewedProvider>
                <AdminProvider>
                  <LayoutShell>{children}</LayoutShell>
                </AdminProvider>
              </RecentlyViewedProvider>
            </CouponProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
