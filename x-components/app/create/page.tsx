import Link from "next/link";
import { getAssetCategories } from "@/lib/component-data";

export default async function CreatePage() {
  const categories = getAssetCategories();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Create</p>
          <h1 className="mt-4 text-4xl font-semibold">What are you making?</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            Choose a component type to start creating a new UI element. This is the first step in building your own Uiverse-style component.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/create/${encodeURIComponent(category)}`}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-slate-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sky-300">
                {category.slice(0, 2).toUpperCase()}
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">{category}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Start creating a new {category.toLowerCase()} component from the archive style.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
