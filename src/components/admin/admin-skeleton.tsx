export function AdminSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-latte-light/30">
            <div className="w-10 h-10 rounded-xl bg-latte-light/30 mb-3" />
            <div className="h-8 w-24 bg-latte-light/30 rounded-lg mb-2" />
            <div className="h-3 w-20 bg-latte-light/20 rounded" />
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 p-6">
        <div className="h-5 w-32 bg-latte-light/30 rounded mb-6" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-latte-light/10 last:border-0">
            <div className="w-10 h-10 rounded-lg bg-latte-light/20 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 bg-latte-light/20 rounded" />
              <div className="h-3 w-24 bg-latte-light/10 rounded" />
            </div>
            <div className="h-6 w-16 bg-latte-light/20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-latte-light/30 overflow-hidden animate-pulse">
      <div className="px-5 py-3 border-b border-latte-light/30 bg-cream/30">
        <div className="h-3 w-full max-w-md bg-latte-light/30 rounded" />
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-latte-light/10 last:border-0">
          <div className="h-4 w-20 bg-latte-light/20 rounded" />
          <div className="h-4 w-28 bg-latte-light/15 rounded" />
          <div className="flex-1" />
          <div className="h-5 w-14 bg-latte-light/20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
