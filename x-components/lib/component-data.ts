import fs from "fs";
import path from "path";

const IGNORED_DIRS = new Set([".git", "x-components", ".github", "node_modules"]);

function findAssetRoot(): string {
  const expected = [
    "Buttons",
    "Cards",
    "Inputs",
    "Forms",
    "loaders",
    "Tooltips",
    "Patterns",
    "Notifications",
    "Checkboxes",
    "Radio-buttons",
    "Toggle-switches",
  ];

  const candidates = [
    path.resolve(process.cwd(), ".."),
    path.resolve(__dirname, "..", ".."),
    path.resolve(process.cwd(), "..", ".."),
    path.resolve(process.cwd()),
  ];

  for (const cand of candidates) {
    try {
      if (!fs.existsSync(cand)) continue;
      const entries = fs.readdirSync(cand, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
      if (entries.some((n) => expected.includes(n))) return cand;
    } catch (e) {
      // ignore and try next
    }
  }

  // fallback to project parent of this module
  return path.resolve(__dirname, "..", "..");
}

const ASSET_ROOT = findAssetRoot();

export type ComponentEntry = {
  category: string;
  categoryUrl: string;
  filename: string;
  slug: string;
  title: string;
  author: string;
  id: string;
};

function parseComponentFile(category: string, filename: string): ComponentEntry {
  const slug = filename.replace(/\.html$/i, "");
  const [author, rawTitle = slug] = slug.split(/_(.+)/);
  const idMatch = rawTitle.match(/-(\d+)$/);
  const id = idMatch?.[1] ?? "";
  const titleKey = id ? rawTitle.slice(0, rawTitle.length - id.length - 1) : rawTitle;
  const title = titleKey
    .split("-")
    .filter(Boolean)
    .map((word) => word.replace(/\s+/g, " "))
    .join(" ");

  return {
    category,
    categoryUrl: `/components/${encodeURIComponent(category)}`,
    filename,
    slug,
    title: title || slug,
    author: author || "unknown",
    id,
  };
}

export function getAssetCategories(): string[] {
  const entries = fs.readdirSync(ASSET_ROOT, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !IGNORED_DIRS.has(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

export function getComponentsByCategory(category: string): ComponentEntry[] {
  if (!category || typeof category !== "string") return [];
  const directory = path.join(ASSET_ROOT, category);
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.toLowerCase().endsWith(".html"))
    .map((filename) => parseComponentFile(category, filename))
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
}

export function getAllComponents(): ComponentEntry[] {
  return getAssetCategories().flatMap((category) => getComponentsByCategory(category));
}

export function getComponentDetail(category: string, slug: string) {
  const items = getComponentsByCategory(category);
  const entry = items.find((item) => item.slug === slug);
  if (!entry) {
    return null;
  }

  const filePath = path.join(ASSET_ROOT, category, entry.filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const html = fs.readFileSync(filePath, "utf8");
  return {
    ...entry,
    html,
  };
}
