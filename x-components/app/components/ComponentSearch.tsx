"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ComponentEntry } from "@/lib/component-data";

export function ComponentSearch({ items }: { items: ComponentEntry[] }) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.author.toLowerCase().includes(normalized) ||
        item.slug.toLowerCase().includes(normalized)
      );
    });
  }, [items, query]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/25">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Search across the library</h2>
          <p className="mt-2 text-sm text-slate-400">Search by title, author, or component slug.</p>
        </div>
        <div className="min-w-[220px] flex-1 sm:max-w-xs">
          <label className="block text-sm font-medium text-slate-300" htmlFor="component-search">
            Search components
          </label>
          <input
            id="component-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search UI components..."
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Link
              key={`${item.category}-${item.slug}`}
              href={`/components/${encodeURIComponent(item.category)}/${encodeURIComponent(item.slug)}`}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-sky-500/40 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                  {item.category}
                </span>
                <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-400">
                  {item.author}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-sky-300">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">Slug: {item.slug}</p>
            </Link>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
            No matching components found. Try another search term.
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-slate-500">
        Showing {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"}.
      </div>
    </div>
  );
}
