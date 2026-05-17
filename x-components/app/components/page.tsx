import Link from "next/link";
import { getAllComponents, getAssetCategories } from "@/lib/component-data";
import { ComponentSearch } from "./ComponentSearch";

export default function ComponentsIndexPage() {
  const categories = getAssetCategories();
  const items = getAllComponents();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Library overview</p>
          <h1 className="mt-4 text-4xl font-semibold">Browse every component category.</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            Explore the full component archive, browse categories, and open any item to see the live preview plus source code.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/components/${encodeURIComponent(category)}`}
                className="rounded-full border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-500/40 hover:text-sky-300"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <ComponentSearch items={items} />
        </div>
      </div>
    </main>
  );
}
