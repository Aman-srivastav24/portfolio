# Aman Srivastav — Portfolio

Personal portfolio built with Next.js 16 + Tailwind CSS v4. Design inspired by pamidordesign.co.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000 (auto-reloads as you edit)
npm run build   # production build — run this before deploying to catch mistakes
```

## Deploy

Push to GitHub and import the repo on https://vercel.com (zero config). Every push redeploys.

---

# How to update the site

**Almost everything is in one file: `src/data/portfolio.ts`.** Edit it, save, and the page updates.
You don't need to touch the components for normal content changes.

Rules of thumb when editing that file:

- Text goes inside quotes: `"like this"`. If your text contains `"`, use `'` around it instead.
- Every item in a list ends with a comma.
- Keep the `{ }` and `[ ]` brackets balanced — copy an existing item and change its values.
- Run `npm run build` afterwards. If you broke the syntax, it tells you the file and line.

## Quick map: what's where

| I want to change…                                   | Where                                                         |
| --------------------------------------------------- | ------------------------------------------------------------- |
| Name, email, location, "Open to…" badge             | `profile` in `src/data/portfolio.ts`                          |
| About paragraph                                     | `profile.intro`                                               |
| Rotating words in hero ("I design & build …")       | `profile.roles`                                               |
| Tags under the rotating words                       | `profile.services`                                            |
| GitHub / LinkedIn links                             | `profile.socials`                                             |
| Scrolling tech strip                                | `toolbelt`                                                    |
| Freelance work (Work section)                       | `freelance` + screenshot in `public/work/`                    |
| Internship / jobs (Experience section)              | `experience`                                                  |
| Personal projects (Projects section)                | `projects`                                                    |
| Early Work list                                     | `archive`                                                     |
| Skillset rows                                       | `skillset`                                                    |
| Education cards                                     | `education`                                                   |
| Hero stats (6 / 2+ years / MCA)                     | `src/app/page.tsx` — search for `HeroStats`                   |
| Downloadable CV                                     | replace `public/Aman_Srivastav_CV.pdf` (keep the same name)   |
| Page title shown in Google / browser tab            | `src/app/layout.tsx` → `metadata` (uses `profile` by default) |

## Add a freelance project (Work section)

Each freelance project is a stacked card with a tilted screenshot of the site. Clicking it opens
the details panel.

### 1. Take a full-page screenshot of the client's site

In Chrome:

1. Open the client's website.
2. Press `F12` (DevTools), then `Ctrl+Shift+M` (device toolbar).
3. At the top, choose **Responsive** and set the width to **1440**.
4. Click the **⋮** menu at the top of the device toolbar → **Capture full size screenshot**.

Save it as `public/work/<slug>-full.jpg` (PNG works too — just use `.png` in the path below).
Use a short lowercase name with dashes for `<slug>`, e.g. `public/work/acme-bakery-full.jpg`.

Tips:

- Close any popups / cookie banners on the site before capturing.
- Very long pages make big files. Cropping to the top ~4000px is plenty — the card only shows
  the first few screens. Aim for under ~600 KB.

### 2. Note the screenshot's height

Check the image's size (right-click → Properties → Details on Windows, or open it in any image
viewer). Then:

```
imageHeight = image height × 1440 ÷ image width
```

Example: if Chrome saved it at 2880 × 8000 (it often doubles the size), `imageHeight` is
`8000 × 1440 ÷ 2880 = 4000`. If it's already 1440 wide, `imageHeight` is just the height.

### 3. Add an entry to `freelance` in `src/data/portfolio.ts`

Copy this block into the `freelance` list (order in the list = order of the cards):

```ts
  {
    slug: "acme-bakery",
    image: "/work/acme-bakery-full.jpg",
    imageHeight: 4000,
    title: "Acme Bakery",
    category: "Client Work · Business Website",
    summary: "One or two sentences on what the site is and who it's for.",
    role: "Freelance Web Developer",
    timeline: "Freelance",
    year: "2026",
    team: "Independent",
    stack: ["React", "Vite", "Tailwind CSS"],
    highlights: [
      "First thing you built or solved.",
      "Second thing.",
      "Third thing.",
    ],
    links: { live: "https://acmebakery.com/" },
  },
```

That's it — the card, the details panel and the **Freelance Projects** count in the hero all
update automatically.

## Add a personal project

Add an entry to `projects` (same fields as above, minus `image`/`imageHeight`). Extra optional
fields that make it look richer:

```ts
    flow: ["Step 1", "Step 2", "Step 3"],                  // shown as pipeline chips
    metric: { value: "2.0s → 0.06s", label: "What the number means" },  // big red number
    links: { github: "https://github.com/...", live: "https://..." },
```

On phones, the title, category and `metric` show up front; everything else is behind
**View details**.

## Add an old / learning project (Early Work)

Add to `archive`:

```ts
  {
    title: "Weather App",
    year: "2023",
    note: "One short line about it",
    stack: ["React", "OpenWeather API"],
    github: "https://github.com/Aman-srivastav24/weather-app",
    live: "https://...",
  },
```

## Add a job or internship (Experience)

Add to `experience` (newest first):

```ts
  {
    role: "Backend Developer",
    company: "Company Name",
    period: "Jan 2027 – Present",
    location: "Remote",
    summary: "One or two sentences on what you worked on.",
    stack: ["Python", "FastAPI", "PostgreSQL"],
    highlights: ["Achievement one.", "Achievement two.", "Achievement three."],
  },
```

When your experience grows, also update the hero stat: in `src/app/page.tsx` search for
`label: "Experience"` and change `value: 2` and its `detail` text.

## Skills, education, hero text

- **New skill** → add it to the right group's `items` in `skillset`. New group → copy a whole
  `{ title, description, items }` block.
- **Education** → edit `education`. To change the hero's "MCA" stat, search for
  `label: "Education"` in `src/app/page.tsx`.
- **Rotating words** → `profile.roles` (keep the trailing `.` for style).
- **Availability badge** → `profile.availability`.

## Tuning the animations (optional)

Each animation has its timing at the top of its file, as named constants:

| Animation                                  | File                                | Constants                                                  |
| ------------------------------------------ | ----------------------------------- | ---------------------------------------------------------- |
| Opening screen (AMAN / icon / SRIVASTAV)   | `src/components/IntroLoader.tsx`    | `CYCLES` (icons shown), `ICON_MS` (per icon), `EXIT_MS`    |
| Cursor / finger sticker trail              | `src/components/CursorTrail.tsx`    | `SPACING`, `LIFETIME`, `MAX`; sizes inside `drop()`        |
| Sticker icons (trail + opening screen)     | `src/components/icons.tsx`          | add/remove SVGs in the `ICONS` list                        |
| Freelance stacked cards                    | `src/components/StackedWork.tsx`    | `SCALE_STEP`, `MAX_SCROLL_SCREENS`, tilt in `TiltedSheets` |
| Rotating words speed                       | `src/components/RotatingWords.tsx`  | `INTERVAL_MS`                                              |
| Stat count-up speed                        | `src/components/HeroStats.tsx`      | `DURATION`                                                 |

To turn the sticker trail off for a section, remove its `<CursorTrail />` line in
`src/app/page.tsx`.

Visitors who enable "reduce motion" in their OS skip the opening screen and the sticker trail
automatically — don't remove those checks.

## Checklist after any change

1. `npm run dev` and look at the page on desktop.
2. In Chrome DevTools (`Ctrl+Shift+M`), check a phone size (e.g. iPhone 12/13).
3. `npm run build` — must finish without errors.
4. Commit and push; Vercel redeploys.
