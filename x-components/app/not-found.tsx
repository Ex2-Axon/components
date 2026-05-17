import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Page not found</p>
          <h1 className="mt-6 text-5xl font-semibold">404</h1>
          <p className="mt-4 text-slate-400">
            The page you were looking for does not exist. Return to the gallery or explore components.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              href="/components"
              className="rounded-full border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-500/40 hover:text-sky-300"
            >
              Browse components
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
