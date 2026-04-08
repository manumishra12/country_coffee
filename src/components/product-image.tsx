"use client";

import { useState } from "react";
import Image from "next/image";
import { Coffee, CupSoda, Wrench, ShoppingBag } from "lucide-react";

const categoryIcons = {
  beans: Coffee,
  mugs: CupSoda,
  equipment: Wrench,
  merch: ShoppingBag,
};

const categoryColors = {
  beans: "from-mocha/20 to-espresso/10",
  mugs: "from-forest/10 to-sage/10",
  equipment: "from-latte/20 to-cream-dark",
  merch: "from-espresso/10 to-latte/10",
};

interface ProductImageProps {
  src: string;
  alt: string;
  category?: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export function ProductImage({ src, alt, category = "beans", fill = true, className = "object-cover", priority = false }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    const Icon = categoryIcons[category as keyof typeof categoryIcons] || Coffee;
    const gradient = categoryColors[category as keyof typeof categoryColors] || categoryColors.beans;

    return (
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3`}>
        <Icon size={40} className="text-espresso/20" strokeWidth={1} />
        <span className="font-accent text-[10px] uppercase tracking-[0.2em] text-espresso/20">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
