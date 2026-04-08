import Image from "next/image";

export default function Loading() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-6">
        <Image src="/logo.png" alt="Loading" width={56} height={56} className="opacity-30 animate-pulse" />
        <div className="w-32 h-[2px] bg-espresso/10 rounded-full overflow-hidden">
          <div className="h-full bg-mocha/50 rounded-full animate-shimmer" style={{ width: "60%" }} />
        </div>
      </div>
    </section>
  );
}
