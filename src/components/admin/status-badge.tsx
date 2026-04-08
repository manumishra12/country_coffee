const statusStyles: Record<string, string> = {
  confirmed: "bg-latte/20 text-mocha",
  processing: "bg-gold/15 text-gold",
  shipped: "bg-sage/15 text-forest",
  out_for_delivery: "bg-mocha/10 text-mocha",
  delivered: "bg-forest/15 text-forest",
};

const statusLabels: Record<string, string> = {
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-accent uppercase tracking-wider ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === "delivered" ? "bg-forest" : status === "processing" ? "bg-gold" : status === "shipped" ? "bg-sage" : "bg-mocha"}`} />
      {statusLabels[status] || status}
    </span>
  );
}
