"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/store/admin-context";
import { ProductForm } from "@/components/admin/product-form";
import { EmptyState } from "@/components/admin/empty-state";
import { Toast } from "@/components/admin/toast";
import type { Product } from "@/data/products";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { products, updateProduct, hydrated } = useAdmin();
  const [toast, setToast] = useState(false);

  if (!hydrated) return null;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        message="This product may have been deleted."
        action={{ label: "Back to Products", onClick: () => router.push("/admin/products") }}
      />
    );
  }

  const handleSubmit = (updated: Product) => {
    updateProduct(id, updated);
    setToast(true);
    setTimeout(() => router.push("/admin/products"), 1200);
  };

  return (
    <div>
      <ProductForm initial={product} onSubmit={handleSubmit} submitLabel="Update Product" />
      <Toast message="Product updated successfully!" visible={toast} onClose={() => setToast(false)} />
    </div>
  );
}
