import Link from "next/link";
import { getAllComponents, getAssetCategories } from "@/lib/component-data";

export default function Home() {
  const categories = getAssetCategories();
  const featured = getAllComponents().slice(0, 12);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Galaxy UI Library</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Build a UI gallery from the component archive.</h1>
          <p className="mt-5 max-w-3xl text-slate-400">
            This app reads the archived HTML components and turns them into browseable pages. Open a category to explore previews and copy source code.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/components"
              className="rounded-full border border-slate-700 bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-500/40 hover:text-sky-300"
            >
              Browse components
            </Link>
            <Link
              href="/components"
              className="rounded-full border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-500/40 hover:text-sky-300"
            >
              View all categories
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Categories</h2>
              <p className="mt-2 text-slate-400">Browse the available UI categories from the archive.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/components/${encodeURIComponent(category)}`}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-slate-800"
              >
                <h3 className="text-xl font-semibold text-white">{category}</h3>
                <p className="mt-3 text-slate-400">Open the category to view components and preview them directly.</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Sample components</h2>
              <p className="mt-2 text-slate-400">A selection of components from the archive to get you started.</p>
            </div>
            <Link
              href="/components"
              className="text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              View full library
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <Link
                key={`${item.category}-${item.slug}`}
                href={`/components/${encodeURIComponent(item.category)}/${encodeURIComponent(item.slug)}`}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-slate-800"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-400">{item.author}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.slug}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
