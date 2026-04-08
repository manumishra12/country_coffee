import type { Metadata } from "next";
import { products } from "@/data/products";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { title: "Product Not Found | Country Coffee" };
  }

  return {
    title: `${product.name} | Country Coffee`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Country Coffee`,
      description: product.description,
      images: [{ url: product.image, width: 800, height: 1000 }],
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}
