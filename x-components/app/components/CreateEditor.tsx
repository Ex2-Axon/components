"use client";

import { useMemo, useState } from "react";

const defaultHtml = `<div class="component-shell">
  <button class="button-shell">Button</button>
</div>`;
const defaultCss = `.component-shell {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 220px;
}

.button-shell {
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: white;
  cursor: pointer;
  font-weight: 600;
  padding: 0.95rem 1.75rem;
}
`;

export default function CreateEditor({ category }: { category: string }) {
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [previewMode, setPreviewMode] = useState<"html" | "css">("html");

  const previewHtml = useMemo(() => {
    return `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`;
  }, [css, html]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0 space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Preview</p>
            <h2 className="mt-2 text-2xl font-semibold">Live preview</h2>
          </div>
          <div className="rounded-full bg-slate-950 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
            {category}
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
          <iframe
            title="Live component preview"
            className="h-[420px] min-w-0 w-full border-0 bg-white"
            srcDoc={previewHtml}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        <div className="rounded-3xl bg-slate-900 p-5 text-sm text-slate-400">
          <p>Copy the HTML and CSS into your design system when you're done.</p>
        </div>
      </div>

      <div className="min-w-0 space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.27em] text-sky-300">Editor</p>
            <h2 className="mt-2 text-2xl font-semibold">{category} editor</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-950 px-2 py-1 text-sm text-slate-300">
            <button
              type="button"
              onClick={() => setPreviewMode("html")}
              className={`rounded-full px-3 py-1 transition ${previewMode === "html" ? "bg-sky-500 text-white" : "hover:bg-slate-800"}`}
            >
              HTML
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("css")}
              className={`rounded-full px-3 py-1 transition ${previewMode === "css" ? "bg-sky-500 text-white" : "hover:bg-slate-800"}`}
            >
              CSS
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <label className="text-sm font-medium text-slate-300" htmlFor="html-editor">
            HTML
          </label>
          <textarea
            id="html-editor"
            value={html}
            onChange={(event) => setHtml(event.target.value)}
            className="mt-2 h-56 min-w-0 w-full resize-none rounded-3xl border border-slate-800 bg-slate-950 p-4 text-sm text-white outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <div className="min-w-0">
          <label className="text-sm font-medium text-slate-300" htmlFor="css-editor">
            CSS
          </label>
          <textarea
            id="css-editor"
            value={css}
            onChange={(event) => setCss(event.target.value)}
            className="mt-2 h-56 min-w-0 w-full resize-none rounded-3xl border border-slate-800 bg-slate-950 p-4 text-sm text-white outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
      </div>
    </div>
  );
}
