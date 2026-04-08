import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="text-center max-w-md">
        <Image src="/logo.png" alt="Country Coffee" width={80} height={80} className="mx-auto mb-8 opacity-20" />
        <h1 className="font-display text-7xl sm:text-8xl font-bold text-espresso/10 mb-2">404</h1>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-espresso mb-4">Page Not Found</h2>
        <p className="text-espresso/50 mb-8 text-sm">
          Looks like this page has been over-extracted. Let&apos;s get you back to the good stuff.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="bg-espresso text-cream px-8 py-3.5 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors">
            Go Home
          </Link>
          <Link href="/shop" className="border border-espresso/20 text-espresso px-8 py-3.5 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-espresso hover:text-cream transition-colors">
            Browse Shop
          </Link>
        </div>
      </div>
    </section>
  );
}
