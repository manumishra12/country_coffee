"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, pageSize = 10, keyExtractor, onRowClick, emptyMessage = "No data found" }: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const col = columns.find((c) => c.key === sortKey);
        if (!col) return 0;
        const aVal = String(col.render(a));
        const bVal = String(col.render(b));
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      })
    : data;

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  };

  if (data.length === 0) {
    return <p className="text-center text-warm-gray py-12 font-body text-sm">{emptyMessage}</p>;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-latte-light/30">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-latte-light/30 bg-cream/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 sm:px-4 py-3 text-[10px] sm:text-[11px] font-accent uppercase tracking-widest text-warm-gray ${col.className || ""} ${col.sortable ? "cursor-pointer hover:text-espresso select-none" : ""}`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && <ChevronsUpDown className="w-3 h-3" />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-latte-light/20 last:border-0 ${onRowClick ? "cursor-pointer hover:bg-cream/50" : ""} transition-colors`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-sm font-body text-espresso ${col.className || ""}`}>
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-xs text-warm-gray font-accent">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Previous page"
              className="w-9 h-9 rounded-lg border border-latte-light flex items-center justify-center text-warm-gray hover:text-espresso hover:bg-cream disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-9 h-9 rounded-lg text-xs font-accent ${page === i ? "bg-espresso text-cream" : "text-warm-gray hover:bg-cream"} transition-colors`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              aria-label="Next page"
              className="w-9 h-9 rounded-lg border border-latte-light flex items-center justify-center text-warm-gray hover:text-espresso hover:bg-cream disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
