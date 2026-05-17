import { notFound } from "next/navigation";
import Link from "next/link";
import { getAssetCategories, getComponentsByCategory } from "@/lib/component-data";
import { ComponentSearch } from "../ComponentSearch";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return getAssetCategories().map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categories = getAssetCategories();
  if (!categories.includes(resolvedParams.category)) {
    notFound();
  }

  const items = getComponentsByCategory(resolvedParams.category);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Category</p>
            <h1 className="mt-3 text-4xl font-semibold">{params.category}</h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              Browse all UI components in the {params.category} category. Click any item to open the preview and source code.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/components"
              className="rounded-full border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-500/40 hover:text-sky-300"
            >
              All categories
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-500/40 hover:text-sky-300"
            >
              Home
            </Link>
          </div>
        </div>

        <div>
          <ComponentSearch items={items} />
        </div>
      </div>
    </main>
  );
}
