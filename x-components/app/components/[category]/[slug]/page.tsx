import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllComponents, getComponentDetail } from "@/lib/component-data";

interface ComponentDetailPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllComponents().map((component) => ({
    category: component.category,
    slug: component.slug,
  }));
}

export default async function ComponentDetailPage({ params }: ComponentDetailPageProps) {
  const resolvedParams = await params;
  const detail = getComponentDetail(resolvedParams.category, resolvedParams.slug);
  if (!detail) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Component preview</p>
              <h1 className="mt-3 text-4xl font-semibold">{detail.title}</h1>
              <p className="mt-3 text-sm text-slate-400">
                Category: <strong className="text-white">{detail.category}</strong> · Author:{" "}
                <strong className="text-white">{detail.author}</strong>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/components/${encodeURIComponent(detail.category)}`}
                className="rounded-full border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-500/40 hover:text-sky-300"
              >
                Back to {detail.category}
              </Link>
              <Link
                href="/components"
                className="rounded-full border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-500/40 hover:text-sky-300"
              >
                Browse all
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <section className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Live preview</p>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <div className="min-h-[220px] rounded-3xl bg-slate-900 p-6 text-slate-200" dangerouslySetInnerHTML={{ __html: detail.html }} />
            </div>
          </section>

          <section className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Source code</p>
            <pre className="mt-6 max-h-[560px] overflow-auto rounded-3xl bg-slate-950 p-5 text-sm leading-6 text-slate-100">
              <code>{detail.html}</code>
            </pre>
          </section>
        </div>
      </div>
    </main>
  );
}
