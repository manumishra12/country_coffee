"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="text-center max-w-md">
        <Image src="/logo.png" alt="Country Coffee" width={64} height={64} className="mx-auto mb-8 opacity-20" />
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-espresso mb-4">Something went wrong</h2>
        <p className="text-espresso/50 mb-8 text-sm">
          We spilled the beans. Please try again or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-espresso text-cream px-8 py-3.5 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-mocha transition-colors"
          >
            Try Again
          </button>
          <a href="/" className="border border-espresso/20 text-espresso px-8 py-3.5 rounded-full font-accent text-sm uppercase tracking-[0.15em] hover:bg-espresso hover:text-cream transition-colors">
            Go Home
          </a>
        </div>
      </div>
    </section>
  );
}
