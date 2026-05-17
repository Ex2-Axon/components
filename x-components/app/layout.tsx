import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galaxy UI Library",
  description: "A gallery app for Uiverse-style UI components built from archived HTML assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-slate-950 text-white`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-slate-800 bg-slate-950/90 py-4 shadow-sm shadow-slate-950/10 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <a href="/" className="text-lg font-semibold tracking-tight text-white">
                Galaxy UI
              </a>
              <p className="text-sm text-slate-400">Browse archived UI components from the library.</p>
            </div>
            <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <a href="/" className="transition hover:text-sky-300">
                Home
              </a>
              <a href="/components" className="transition hover:text-sky-300">
                Components
              </a>
              <a href="/create" className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white transition hover:border-sky-500/40 hover:text-sky-300">
                Create
              </a>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
