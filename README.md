# Component Gallery App

Welcome to the `x-Component`, a collection of over 3000 unique UI elements.

This repository currently contains a full archive of UI component HTML files plus a starter Next.js application in `x-components/`.

## Repository Structure

- `Buttons/` — HTML examples for button designs
- `Cards/` — card-style component examples
- `Checkboxes/` — checkbox UI components
- `Forms/` — full form UI designs
- `Inputs/` — input field styles
- `loaders/` — loading animation and spinner examples
- `Notifications/` — notification/toast UI elements
- `Patterns/` — background and layout pattern components
- `Radio-buttons/` — radio button designs
- `Toggle-switches/` — toggle switch components
- `Tooltips/` — tooltip and hover UI examples
- `x-components/` — Next.js starter app for building the gallery website

## Current Status

- The asset library of HTML UI examples is available.
- The starter web app in `x-components/` is a fresh Next.js + Tailwind template.
- There is not yet a completed site for browsing/searching these UI elements.

## Goal

Build a website that:

- shows a searchable gallery of UI elements,
- renders previews for each design,
- supports category browsing,
- provides copyable HTML/CSS code,
- and behaves like `uiverse.io`.

## Work Plan

1. **Inventory component assets**
   - Read HTML files from the category folders.
   - Extract metadata from file names such as author, category, and component name.

2. **Create a data layer**
   - Load file names and file contents via Next.js server utilities.
   - Build JSON metadata for each component entry.

3. **Build the gallery page**
   - Display cards for components in a responsive grid.
   - Add search, category filter, and sort options.
   - Support pagination or infinite scrolling.

4. **Create detail pages**
   - Show the rendered HTML preview.
   - Provide raw source code for copy/paste.
   - Display metadata such as author, category, and title.

5. **Polish the UI**
   - Apply a modern layout with hover effects.
   - Add dark mode if desired.
   - Make it mobile-friendly.

6. **Deploy**
   - Deploy using Vercel, Netlify, or similar.
   - Ensure HTML assets are available at build time.

## ✅ Application Status

The Galaxy UI Library app is **fully functional** with the following features:

### Pages & Routes

- **`/`** — Home page with welcome message
- **`/components`** — Gallery view with all components, searchable by title/author/slug
- **`/components/[category]`** — Browse components by category
- **`/components/[category]/[slug]`** — Component detail page with live preview + source code
- **`/create`** — Create menu to choose a component type
- **`/create/[category]`** — Category intro page
- **`/create/[category]/editor`** — Live HTML/CSS editor with instant preview

### Features

✓ Automatic asset discovery from folder structure  
✓ Dynamic route generation with `generateStaticParams`  
✓ Real-time search across all components  
✓ Live component preview in iframe  
✓ Side-by-side HTML/CSS editor  
✓ Dark-themed UI  
✓ Responsive design  
✓ Mobile-friendly  

---

## Getting Started

### Setup & Running

```bash
cd x-components
pnpm install
pnpm dev
```

Then open **http://localhost:3000** in your browser.

### Build for Production

```bash
cd x-components
pnpm build
pnpm start
```

---

## Adding Components

The system automatically discovers new components. To add them:

### Option 1: Add to existing category

1. Save a new HTML file to a category folder, e.g.:
   ```
   Buttons/myauthor_my-component-name-123.html
   ```

2. **Restart the dev server** or **rebuild** to register the new component.

3. The component will appear in:
   - `/components` (searchable)
   - `/components/Buttons` (category page)
   - `/components/Buttons/myauthor_my-component-name-123` (detail page)

### Option 2: Create a new category

1. Create a new folder at the root level, e.g.:
   ```
   MyNewCategory/
   ```

2. Add HTML files inside:
   ```
   MyNewCategory/author_component-name-1.html
   MyNewCategory/author_component-name-2.html
   ```

3. **Restart dev server** or **rebuild**.

4. New category appears in:
   - `/create` menu
   - `/components` gallery
   - As a new browsable category

### Filename Format

Use this format for best results:
```
authorname_component-description-number.html
```

Example: `adamgiebl_big-moose-23.html`

- **authorname** — GitHub/creator username
- **component-description** — Kebab-case name
- **number** — Sequential ID (helps with uniqueness)

---

## File Structure

```
x-components/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with header/nav
│   ├── globals.css           # Global styles
│   ├── components/           # UI components
│   │   ├── [category]/       # Dynamic category routes
│   │   │   ├── page.tsx      # Category gallery page
│   │   │   └── [slug]/       # Dynamic detail page
│   │   │       └── page.tsx
│   │   ├── CreateEditor.tsx  # Live code editor component
│   │   └── ComponentSearch.tsx # Search bar
│   └── create/               # Component creation flow
│       ├── page.tsx          # Create menu
│       ├── [category]/
│       │   ├── page.tsx      # Category intro
│       │   └── editor/
│       │       └── page.tsx  # Live editor
├── lib/
│   └── component-data.ts     # Asset discovery & data loading
├── public/
└── package.json
```

### Key Implementation Files

- **`lib/component-data.ts`**  
  Reads HTML files from folders, extracts metadata, and exposes functions:
  - `findAssetRoot()` — Locates the asset directory
  - `getAssetCategories()` — Lists all categories
  - `getComponentsByCategory(category)` — Get components in a category
  - `getComponentDetail(category, slug)` — Load component HTML & metadata
  - `getAllComponents()` — All components (used for search)

- **`app/components/CreateEditor.tsx`**  
  Live editor component with:
  - HTML textarea
  - CSS textarea
  - Tab toggle (HTML / CSS view)
  - Live iframe preview

---

## How It Works

### Asset Discovery

When the app starts, it scans the folder structure:

1. Finds all category folders (e.g., `Buttons/`, `Cards/`)
2. Reads HTML files in each folder
3. Extracts metadata from filenames and HTML comments
4. Builds an in-memory index for fast lookup

### Dynamic Routes

Next.js generates routes dynamically using `generateStaticParams`:

- Each category → `/components/[category]`
- Each component → `/components/[category]/[slug]`
- Creator pages → `/create/[category]/editor`

No manual route registration needed—just add HTML files.

### Search

The search bar queries against:
- Component title (extracted from filename)
- Author name
- Category
- Slug

Real-time filtering updates the gallery view.

---

## Development Tips

### Local Development

- Changes to HTML files are **not** automatically hot-reloaded
- **Restart the dev server** after adding/removing components
- CSS files in the app are hot-reloaded normally

### Adding Custom Features

1. **New route?** Create a folder in `app/` using Next.js conventions
2. **New UI component?** Add `.tsx` file to `app/components/`
3. **Modify styling?** Edit Tailwind classes or `app/globals.css`
4. **Custom metadata?** Update `lib/component-data.ts` parsing logic

### Troubleshooting

**"404 on component detail page"**
- Ensure the filename follows the format: `author_name-slug-number.html`
- Restart the dev server
- Check that the HTML file exists in the correct category folder

**"Search isn't showing new components"**
- Rebuild or restart dev server
- Component must be in a recognized category folder

**"Editor changes don't show in preview"**
- Check browser console for HTML/CSS errors
- Ensure the iframe sandbox allows `allow-scripts` and `allow-same-origin`

---

## Tech Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **Styling:** Tailwind CSS v4
- **Runtime:** Node.js (for file system access)
- **Language:** TypeScript

---

## License

See `LICENSE` file in the repository.

If you want, I can create the first working prototype for the gallery page in `x-components/` now.
