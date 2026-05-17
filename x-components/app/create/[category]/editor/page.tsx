import CreateEditor from "@/app/components/CreateEditor";
import { getAssetCategories } from "@/lib/component-data";
import { notFound } from "next/navigation";

interface CreateEditorPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return getAssetCategories().map((category) => ({ category }));
}

export default async function CreateEditorPage({ params }: CreateEditorPageProps) {
  const resolvedParams = await params;
  const categories = getAssetCategories();
  if (!categories.includes(resolvedParams.category)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl shadow-slate-950/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Create editor</p>
              <h1 className="mt-4 text-4xl font-semibold">Build your {resolvedParams.category} component</h1>
              <p className="mt-4 max-w-2xl text-slate-400">
                Edit HTML and CSS side-by-side, and see live preview updates instantly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`/create/${encodeURIComponent(resolvedParams.category)}`}
                className="rounded-full border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-500/40 hover:text-sky-300"
              >
                Back
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <CreateEditor category={resolvedParams.category} />
        </div>
      </div>
    </main>
  );
}
