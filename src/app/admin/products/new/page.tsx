"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/store/admin-context";
import { ProductForm } from "@/components/admin/product-form";
import { Toast } from "@/components/admin/toast";
import type { Product } from "@/data/products";

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useAdmin();
  const [toast, setToast] = useState(false);

  const handleSubmit = (product: Product) => {
    addProduct(product);
    setToast(true);
    setTimeout(() => router.push("/admin/products"), 1200);
  };

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} submitLabel="Add Product" />
      <Toast message="Product added successfully!" visible={toast} onClose={() => setToast(false)} />
    </div>
  );
}
