# How to edit this website

A practical guide for updating content, projects, fonts, colours, and images without breaking the layout.

## Run the site locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Most edits hot-reload automatically — you do not need to restart the server.

Build for production:

```bash
npm run build
npm run preview   # optional — preview the production build locally
```

---

## The one file for most text content

**`src/data/site.ts`** holds almost everything visitors read:

| Section on the page | What to edit in `site.ts` |
|---|---|
| Hero name, role, intro | `profile` |
| About paragraphs | `profile.about` |
| GitHub / LinkedIn / email links | `links` |
| Top navigation | `nav` |
| Selected work cards | `featuredProjects` |
| Other experiments list | `otherProjects` |
| Areas of interest (hover synopses) | `interests` |
| Experience / education | `journey` |
| Contact section intro | `profile.contactIntro` |

Save the file and check the browser — changes should appear immediately in dev mode.

---

## Projects and GitHub repos

### Add a featured project

1. Open `src/data/site.ts`.
2. Find `featuredProjects`.
3. Copy an existing object and paste it in the array.
4. Fill in the fields:

```ts
{
  id: "my-new-project",          // unique slug, no spaces
  name: "My New Project",
  category: "AI × Web",
  description: "One sentence about what it does.",
  technologies: ["Python", "React"],
  github: "https://github.com/javeshK/repo-name",
  live: "https://example.com",   // optional — omit if there is no demo
  flagship: false,               // true = large hero card (use for one project only)
}
```

### Change a GitHub link

Find the project by `id` or `name` and update `github`:

```ts
github: "https://github.com/javeshK/your-repo-name",
```

If the repo is not public yet, set `github: null`. The card will show **GitHub coming soon**.

### Move a project to “Other experiments”

Cut the object from `featuredProjects` and paste it into `otherProjects`.

### Remove a project

Delete its object from the array.

### Flagship project

Only one project should have `flagship: true`. That card is shown larger at the top of the work section. Set `flagship: false` on the others.

---

## Areas of interest (hover synopses)

Each item in `interests` has a `title` and `synopsis`. The synopsis expands when a visitor hovers (or focuses) that row.

```ts
{
  title: "Generative AI",
  synopsis:
    "Models that create text, images, and code. Short explanation of what you mean by this interest.",
}
```

Add, remove, or reorder objects in the `interests` array. Keep synopses to one or two sentences.

---

## Experience section

Edit the `journey` array. Each entry uses:

```ts
{
  kind: "education",   // "education" | "training" | "program"
  title: "Degree or programme name",
  org: "Institution or company",
  detail: "Short subtitle",
  dates: "2024 — 2028",
  note: "One extra line of context.",
}
```

The label shown on the page (e.g. “Summer training”) comes from `kind` — see `src/components/Journey.tsx` if you need to add a new kind.

---

## Social links and contact form

In `links`:

```ts
export const links = {
  github: "https://github.com/javeshK",
  linkedin: "https://www.linkedin.com/in/javeshkhosla/",
  email: "you@example.com",   // recipient for the contact form
};
```

- **GitHub / LinkedIn** — used in the header, hero, contact buttons, and footer links.
- **Email** — powers the contact form via [FormSubmit](https://formsubmit.co). The first time you use an address, FormSubmit sends a confirmation email; you must confirm before messages are delivered.
- Leave `email` as `""` if you do not want the form to send anywhere (the form will show an error asking visitors to use GitHub or LinkedIn).

---

## Fonts

Fonts are loaded in two places:

### 1. Load the font files — `index.html`

The Google Fonts `<link>` in `<head>` must include the families and weights you want:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;1,400&display=swap"
  rel="stylesheet"
/>
```

To switch fonts, pick families on [Google Fonts](https://fonts.google.com), copy the embed link, and replace this tag.

### 2. Use the fonts — `src/index.css`

At the top of `:root`:

```css
--font-display: "Cinzel", "Times New Roman", serif;
--font-sans: "IBM Plex Sans", system-ui, sans-serif;
```

- **`--font-sans`** — body text, headings, buttons, navigation.
- **`--font-display`** — reserved for display accents (currently defined but most headings use sans).

Change the quoted family names to match what you loaded in `index.html`. Always keep a fallback (`system-ui`, `serif`, etc.) after the custom name.

---

## Colours and theme

All main colours live as CSS variables in `src/index.css` under `:root`:

```css
--void: #1c2128;      /* page background */
--slate: #252b33;     /* cards, inputs */
--ink: #e8edf1;       /* primary text */
--muted: #9aa3ad;     /* secondary text */
--line: rgba(168, 178, 188, 0.22);  /* borders */
--steel: #a8b2bc;    /* accents, links */
--crimson: #c41e3a;   /* hover / highlight */
```

Edit these hex values to retheme the site. You usually do not need to touch individual components — they reference the variables.

---

## Images

Files in **`public/`** are served from the site root. Reference them with a leading `/`:

| File | Used for |
|---|---|
| `public/hero-bg.jpg` | Landing hero background (fades on scroll) |
| `public/theme/ouroboros.jpg` | Header logo and back-to-top button |
| `public/theme/alphonse.jpg` | About section portrait |

### Replace the hero image

1. Save your image as `public/hero-bg.jpg` (or use another name and update `src/components/Hero.tsx`).
2. Landscape images around **16:9** work best.
3. The image is zoomed slightly in CSS (`scale(1.2)`). Adjust in `src/index.css` under `.hero-bg img` if needed.

### Replace theme images

Drop new files into `public/theme/` and update paths in:

- `src/components/Hero.tsx` — hero background
- `src/components/About.tsx` — about photo
- `src/components/SiteHeader.tsx` — wordmark icon
- `src/components/BackToTop.tsx` — floating button icon

---

## Page title and SEO

Edit **`index.html`**:

- `<title>` — browser tab title
- `<meta name="description">` — search snippet
- `og:title` / `og:description` — link previews on social apps

Keep these in sync with `profile.title` and `profile.description` in `site.ts` if you change your positioning.

---

## Navigation

Edit the `nav` array in `site.ts`:

```ts
export const nav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  // ...
];
```

`href` must match a section `id` on the page (`#about`, `#work`, `#journey`, `#contact`). The exploring section uses `id="exploring"` but is not in the nav by default — add it here if you want a link.

---

## Footer quote

The footer line *“To obtain, something of equal value must be lost.”* is in **`src/App.tsx`**, not `site.ts`. Edit the text inside `<footer className="site-footer">` if you want to change it.

---

## When to edit other files

| Goal | File |
|---|---|
| Change layout or structure of a section | `src/components/*.tsx` |
| Change spacing, colours, animations | `src/index.css` |
| Add a new page section | New component + import in `src/App.tsx` |
| Change scroll-reveal behaviour | `src/hooks/useReveal.ts` |

For routine content updates, **`site.ts` + images in `public/`** is enough.

---

## Deploying

After `npm run build`, the static site is in the **`dist/`** folder. Deploy that folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).

If you use **GitHub Pages** from this repo, point the host at the `dist` output of your build step (or use an action that runs `npm run build` and publishes `dist`).

---

## Quick checklist

- [ ] Text / projects / links → `src/data/site.ts`
- [ ] Fonts → `index.html` + `src/index.css` (`:root` variables)
- [ ] Colours → `src/index.css` (`:root` variables)
- [ ] Hero image → `public/hero-bg.jpg`
- [ ] Logo / about photo → `public/theme/`
- [ ] Contact email → `links.email` in `site.ts`
- [ ] Tab title & SEO → `index.html`
