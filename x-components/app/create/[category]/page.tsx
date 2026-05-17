import Link from "next/link";
import { getAssetCategories } from "@/lib/component-data";
import { notFound } from "next/navigation";

interface CreateCategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return getAssetCategories().map((category) => ({ category }));
}

export default async function CreateCategoryPage({ params }: CreateCategoryPageProps) {
  const resolvedParams = await params;
  const categories = getAssetCategories();
  if (!categories.includes(resolvedParams.category)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Create</p>
          <h1 className="mt-4 text-4xl font-semibold">Create a {resolvedParams.category}</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            You can start from a blank canvas or preview an existing archived UI element. When you're ready, continue to the editor.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/create"
              className="rounded-full border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-500/40 hover:text-sky-300"
            >
              Choose another type
            </Link>
            <Link
              href={`/create/${encodeURIComponent(resolvedParams.category)}/editor`}
              className="rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
            >
              Continue to editor
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold text-white">Type</h2>
            <p className="mt-3 text-slate-400">{resolvedParams.category}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold text-white">Technology</h2>
            <p className="mt-3 text-slate-400">HTML + CSS</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold text-white">Preview</h2>
            <p className="mt-3 text-slate-400">Build a new {resolvedParams.category.toLowerCase()} component for the library.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
