"use client";

import { useState, useEffect } from "react";

interface ClientVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function ClientVideo({ src, poster, className = "" }: ClientVideoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return poster ? (
      <img src={poster} alt="" className={className} />
    ) : (
      <div className={`${className} bg-espresso`} />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className={className}
      poster={poster}
      suppressHydrationWarning
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
