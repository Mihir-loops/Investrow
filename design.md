# Investrow design system

This document records the design rules used in the completed Investrow website so future pages and edits stay consistent. Most numbers live as CSS custom properties in `src/styles/tokens.css`; repeat page-specific values deliberately follow them.

---

## 1. Overall design intent

- **Quiet, financial, editorial.** The site reads more like a well-organised advisory document than a hard-sell landing page.
- **Content-first typography.** Long H1/H2 statements carry the page; card copy is small and factual.
- **Single accent language.** The lime accent is used selectively (labels, key results, one CTA background), never as body text.
- **Semantic honesty.** Regulatory identifiers and "as published" figures are shown in dedicated labelled panels/notes instead of being woven into marketing claims.
- **Progressive, not flashy motion.** Reveal-on-scroll entrances are soft and short; every meaningful motion can be disabled by `prefers-reduced-motion`.

---

## 2. File architecture

- `src/styles/tokens.css` – colour, type, spacing, radius, shadow and easing tokens.
- `src/styles/base.css` – resets, global typography, container/section rhythm, skip link.
- `src/styles/layout.css` – header, utility bar, nav, footer.
- `src/styles/components.css` – buttons, links, forms, calculator UI, accordion, misc shared components.
- `src/styles/pages.css` – page layouts and responsive page-specific breakpoints.
- `src/styles/animations.css` – the entire motion system, imported last so its reduced-motion rules win.

Fonts are bundled locally with `@fontsource-variable/manrope`, `@fontsource-variable/dm-sans` and `@fontsource/instrument-serif` in `src/main.tsx`; there are no external font requests.

---

## 3. Colour palette

Main palette (exact tokens from `tokens.css`):

| Role | Token | Hex / value | Usage |
| --- | --- | --- | --- |
| Deep forest | `--forest-950` | `#0d201c` | footer and dark utility surfaces |
| Forest | `--forest-900` | `#142c27` | dark sections, portraits background, primary hover surface |
| Forest tint | `--forest-800` | `#103a2f` | supporting dark surface |
| Primary green | `--green-700` | `#176b50` | primary buttons, icons, links, key accents |
| Secondary green | `--green-600` | `#238361` | secondary accents/charts |
| Chart green | `--green-500` | `#2f9a73` | chart/indicator variants |
| Sage | `--sage-100` | `#e6eee3` | icon chips, soft panels, banner fallback |
| Sage light | `--sage-50` | `#eef3ea` | hover tint, soft cards |
| Off-white | `--offwhite` | `#f7f8f3` | page background |
| White | `--white` | `#ffffff` | cards, input fills, light text |
| Lime accent | `--lime` | `#d7f36a` | progress bar, dark-section accent, special CTA |
| Soft lime | `--lime-soft` | `#e9f9b5` | subtle lime-tinted panels |

Text and line colours:

| Token | Value | Usage |
| --- | --- | --- |
| `--ink` | `#142c27` | headings and primary body on light |
| `--ink-soft` | `#2c4038` | secondary body/check-list items |
| `--muted` | `#5d6f67` | descriptive body, captions |
| `--muted-light` | `#91a29a` | ranges/very quiet labels |
| `--line` | `rgba(20, 44, 39, 0.13)` | standard card/divider lines |
| `--line-strong` | `rgba(20, 44, 39, 0.24)` | stronger lines/secondary button borders |
| `--line-light` | `rgba(255, 255, 255, 0.16)` | dividers on dark backgrounds |
| `--dark-muted` | `rgba(247, 248, 243, 0.68)` | muted body text on dark |

Rules around colour:

- Light pages default to `--offwhite` background and `--ink` text; white cards are separated with `--line` rather than heavy shadows.
- Dark sections use `--forest-900`/`--forest-950` with `--offwhite` text and lime accents.
- The accent green, rather than lime, is the main interactive colour: buttons, icons, focused elements and links move toward green or deep forest on hover.
- Selection text/background is green-on-lime (`::selection` in `tokens.css`).
- Large source/verification notes are visually quiet (small, muted, bordered) so they do not look like marketing claims.

---

## 4. Typography

### 4.1 Families

| Token | Family | Where used |
| --- | --- | --- |
| `--font-display` | `"Manrope Variable", "Manrope", "Segoe UI", sans-serif` | headings, wordmark, nav, numbers/results |
| `--font-body` | `"DM Sans Variable", "DM Sans", "Segoe UI", sans-serif` | body copy, buttons, forms, eyebrows, footers |
| `--font-serif` | `"Instrument Serif", "Iowan Old Style", Georgia, serif` | italic accent words inside headings (`em`) |

Basic typography rules:

- All headings (`h1`–`h6`) default to Manrope 700, line-height `1.06`, letter-spacing `-0.035em`, with `text-wrap: balance`.
- `em` is globally reinterpreted as Instrument Serif *italic* and colored `--green-700` on light surfaces (lime on dark), giving the site its editorial accent word style.
- Body text is DM Sans, base `16px`/`1.62`. Secondary and card body copy may drop to `14px`, `12px` or `10.5–11px` for factual/micro-copy.
- Numeric results set `font-variant-numeric: tabular-nums` so calculator figures don't jitter while updating.

### 4.2 Type hierarchy

There are four main text tiers. Sizes are fluid with `clamp()`, so they scale between the listed mobile and desktop values.

| Tier | Typical component | Size | Weight / tracking | Colour |
| --- | --- | --- | --- | --- |
| Display H1 | Home hero title | `clamp(50px, 6.6vw, 94px)`, line-height ≈ `0.94`, tracking ≈ `-0.058em` | Manrope 650 | ink, serif accent in green |
| Page H1 | Interior `PageHero` | `clamp(44px, 7.2vw, 92px)`, line-height ≈ `0.96` | Manrope 650 | ink, serif accent |
| Section H2 | `SectionHead`, major blocks | `clamp(32px, 4.6vw, 58px)` | Manrope 650, tracking `-0.045em` | ink (offwhite/lime variants on dark) |
| Large H2 | CTA/footer banner | `clamp(34px, 4.8vw, 62px)` | Manrope 600 | offwhite |
| Card/module H3 | service/calculator/goal/request cards | commonly `16–28px` (e.g. service list `clamp(24px,2.6vw,32px)`, cards `16–20px`) | Manrope 600 | ink / offwhite |
| Eyebrow label | above most H1/H2 | `10.5px`, `letter-spacing 0.17em`, uppercase, with a 22px rule | DM Sans 700 | green (lime on dark) |
| Body paragraph | standard page copy | `14–16px`, line-height `1.62–1.72` | DM Sans 400–500 | ink / ink-soft |
| Card body / micro copy | card descriptions, captions, legal notes | `10.5–12px`, line-height `1.6–1.75` | DM Sans 400–500 | muted |
| Results figures | calculator result hero | `clamp(32px, 4vw, 48px)`, tabular | Manrope 650 | green |
| Footer headings | column labels | `9.5px`, uppercase, `0.18em` | DM Sans 700 | muted light on dark |

Hierarchy rules followed throughout:

1. One H1 per page, always in `PageHero`/hero.
2. `h2` marks a section; `h3` marks a named item/card; the eyebrow above a heading is not a heading tag (`p.eyebrow`), just a visual label.
3. Headlines place the branded/important phrase in `em` (serif italic) once, not repeatedly.
4. Body copy is quieter than the heading, with `--muted` rather than pure grey.
5. All large text uses negative letter-spacing; small labels use generous positive tracking.

---

## 5. Layout, spacing and surfaces

- **Container:** `min(100% - gutter*2, 1240px)`; `--gutter: clamp(20px, 4vw, 44px)`.
- **Section rhythm:** `--section-space: clamp(76px, 9vw, 132px)` vertical padding.
- **Header height:** `--header-height: 76px`; `scroll-padding-top` compensates for anchored navigation.
- **Radii:**
  - `--radius-xs: 8px` – tiny chips/notifications
  - `--radius-sm: 12px` – small panels/inputs
  - `--radius-md: 18px` – cards, process steps, type cards
  - `--radius-lg: 26px` – major banners/calculator panel/hero frames
  - `--radius-pill: 999px` – buttons, chips, icons
- **Shadows** sit only on interactive/prominent cards:
  - `--shadow-sm` small inputs thumbnail
  - `--shadow-md` card raise
  - `--shadow-lg` hero/phone frame
- **Surfaces:** light sections are offwhite; cards may be white or `sage-50`; dark sections/panels are forest; the calculator output panel is white against the soft panel.
- **Portrait and banner treatment:** downloaded source images are presented inside framed, rounded containers; some source illustrations are shown with a slightly desaturated/muted treatment so original campaign colours do not fight the palette.

### Responsive breakpoints

In-page breakpoints are intentionally content-based rather than one global breakpoint. The main ones are approximately:

| Width | Typical behaviour |
| --- | --- |
| ≤1200px | hero side card and dense grids stack/flatten |
| ≤1120px | header switches from desktop nav to mobile menu |
| ≤1000–950px | hero grids become single/two-column, big H2s drop |
| ≤900–820px | team/process/calculator columns collapse further |
| ≤760–720px | card grids become 1–2 columns, service banner moves to a portrait-friendly ratio, captions move |
| ≤640–560px | footer and contact nav simplify |
| ≤540–480px | results, charts and published cards stack |

---

## 6. Components and visual rules

- **Header:** fixed/sticky light glassy header (`backdrop-filter: blur`), dark utility bar that collapses on scroll, brand + desktop dropdowns + soft pill CTA; mobile menu becomes a full-screen panel.
- **Nav:** Home/Contact are direct links; About/Services/Goals/Calculators/Resources are groups. Desktop hover / keyboard opens a white dropdown with compact links.
- **Buttons:** pill; three main variants:
  - primary: green fill → forest on hover
  - secondary: transparent, bordered, fills green on hover
  - light: lime on dark CTA (or offwhite on lime), with arrow drift
  - ghost/quiet: bordered, used for phone calls and low-emphasis CTAs
- **Links:** two main forms: plain green underlined text link and `text-link` pill/underline with arrow drift.
- **Cards:** consistent white/sage cards, 18/26px radii, `--line` borders, hover lift `translateY(-3/‑4px)` plus shadow/border shift.
- **Forms:** soft white containers; labels above inputs; red accents come from a warning/danger token used only on errors (not palette-decorative); success and info status messages use small panels with icons.
- **Calculators:** input panel + results panel side by side; results show a large tabular number, a small key/value grid, then a chart or summary graphic, then an "Assumptions" note. `aria-live="polite"` announces result updates.
- **Disclosure notes:** small bordered `source-note`/`inline-caveat` blocks; a verification/provenance note accompanies published figures, certificates and third-party maps.
- **Icons:** lightweight, 1.5–1.7 stroke, used in 38–46px circular chips (green icon on sage background, inverting on hover).

---

## 7. Animation system

All standard work happens in `src/styles/animations.css`. Reveal behaviour is driven by two small React components (`Reveal`, `RevealGroup`) plus `useInView` in `src/hooks/useReveal.ts`.

### 7.1 Easing tokens

- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` – standard entrance easing, slightly over-eased without bounce.
- `--ease-soft: cubic-bezier(0.4, 0, 0.2, 1)` – fades/softening/UI state changes.
- Long durations are kept below ~1.5s so scroll feel stays responsive.

### 7.2 Page and hero entrances

| Name | Element | Detail |
| --- | --- | --- |
| `pageEnter` | every `main.site-main` | whole page fades up 8px over 0.55s on route change |
| `heroUp` | hero-copy elements | fades elements up 30px over 0.9s |
| `hero-delay-1 … hero-delay-5` | hero stage pieces | cascading delays 0.06s → 0.44s |
| `heroVisual` | hero image/frame | image/frame starts scaled `0.985` and offset, animates for 1.1s (visual wrapper) or 1.4s with 0.3s delay (inner image) |
| `floatSoft` | hero "Est." stamp | gentle 6s infinite float (-7px at midpoint) |

### 7.3 Scroll reveal

Two wrapper types:

- `<Reveal>` – a single block. Adds `data-reveal="<variant>"`, then `.is-visible` once it enters view.
- `<RevealGroup>` – a grid/list. Adds `data-reveal-group`, then `.is-visible`, and the group's direct children are staggered.

Default IntersectionObserver settings: threshold 0.12–0.15, negative bottom root margin of -8%, `once: true` so sections do not repeatedly blink.

Reveal variants:

| Variant | Start state | Used for |
| --- | --- | --- |
| `fade-up` (default) | opacity 0, translate 34px down | most copy blocks and panels |
| `fade-in` | opacity 0 only | large images/strips |
| `slide-left` | opacity 0, translate 46px from right | asymmetric/editorial layouts |
| `slide-right` | opacity 0, translate 46px from left | matching mirrored layouts |
| `scale-in` | opacity 0, scale `0.945` | app/device renders, featured media |
| `image-reveal` | child image clip-path `inset(0 0 100% 0)` upward | banners/portraits |

Image reveal details:

- The clip-path is applied to the immediate visual child (`.editorial-frame`, `.service-banner`), not the observed wrapper. This keeps the observer target from being fully clipped, so the reveal can never get stuck invisible.
- The inner photo also starts scaled to `1.055` and eases to `1` over 1.5s, producing a subtle Ken-Burns settle.

Timing for reveals:

- Standard fade/slide transitions: `opacity 0.8s`, `transform 0.95s`, clip-path `1.1s`.
- Manual per-element delay: up to ~240ms on paired hero copy/media.
- Group children: fade/translate 0.7s/0.85s with stagger delays from 0.02s to 0.68s; for groups longer than about 8 items, later children settle to a 0.46s delay so the grid does not feel derailed.

### 7.4 Count-up / status / charts

- Number stats (`Stat`) count from 0 to the target over 1.4s with cubic easing (`1 - pow(1-t, 3)`) when the stat is 40% visible; reduced motion jumps directly to the final value.
- Chart updates use `chartFade` (0.35s) and SVG dasharray transition so recalculated lines/pie segments ease.
- Calculator result grid/hero updates immediately; the whole output panel is `aria-live="polite"` for screen readers.

### 7.5 Micro and UI motion

- Buttons lift 1px and their arrow drifts `2px, -2px`.
- Cards lift 3–4px with border/shadow transitions over 0.3–0.4s.
- Text links/related-card arrows drift on hover; rows shift content left with a padded background tint.
- Header: utility bar collapses to `max-height: 0` on scroll; border/shadow/backdrop change over 0.35s; nav dropdowns fade/translate in 0.24–0.32s.
- Scroll progress: 2px lime bar at the top of the viewport, `scaleX` updated on scroll.
- Mobile menu: slides in from -14px over 0.45s (`menuIn`); groups toggle hidden panels; chevrons rotate.
- Form status messages enter with `statusIn` 0.4s.
- Sliders: range thumb scales to 1.12 and briefly lime on hover/focus; the filled track uses an inline `--range-progress` variable.
- Testimonials: the arrow controls were removed (they fought the old
  `scroll-snap-type: x mandatory` track and could not scroll). The row is now a
  seamless marquee: `Testimonials.tsx` renders the list twice inside a static
  window (`.testimonials__window`, overflow hidden + 4% edge fade mask), and the
  `max-content` track animates `testimonialMarquee` from `translateX(-50%)` to
  `translateX(0)` over 46s linear — cards drift left-to-right and loop with no
  visible seam (each card carries a fixed 18px right margin so one copy is an
  exact half). Card width is `clamp(280px, 27.4vw, 396px)` (76vw at ≤640px)
  since %-widths cannot resolve inside a max-content track. Hover/focus pauses
  the loop; duplicated cards are `aria-hidden`.
- Marquee under reduced motion: `animation: none`, mask off, window becomes
  `overflow-x: auto` (7.6's global block also zeroes the animation).

### 7.6 Reduced motion

A single `prefers-reduced-motion: reduce` block removes/disable motion rather than leaving content hidden:

- all animation/transition durations are forced to `0.001ms` and not repeated
- every `[data-reveal]`, `[data-reveal-group] > *` and image-reveal child is forced to `opacity:1`, no transform and no clip
- page/hero entrance animations are disabled
- smooth scroll (`html`) is reset to `auto`

The React hooks also check `prefersReducedMotion()` (and IntersectionObserver support) so counters and reveal state skip to final values. There is a `<noscript>` override un-hiding `[data-reveal]` elements in `index.html`.

---

## 8. Accessibility and content guardrails

- Motion, focus outlines (`:focus-visible` green), skip link, keyboard-closeable mobile menu and form/focus behavior are part of the design rules.
- Every page has a single, readable H1; headings and semantic lists/labels are used rather than decorative-only text.
- Source/verification language is displayed visually as its own note instead of hidden footnotes.
- Fictional performance/outcome language is avoided; claims that appear "as published" are labelled in the note attached to that panel.

---

## 9. Hero 3D bull, background dynamics and header type (latest pass)

### 9.1 Background (was ChromaCurrents — now static dot grid)

- ChromaCurrents was removed in the gradient-cleanup round (see 10.3b):
  `Layout.tsx` no longer mounts it, the component file was deleted, and the
  background is `--canvas` with a static CSS dot grid painted on `body`.
- (Historical) It was an in-house equivalent of the React Bits Pro
  "Chroma Current"; `components.json` still carries the
  `@reactbits-starter`/`@reactbits-pro` registries for a future install if the
  background animation is ever reintroduced with a license key.

### 9.2 Premium interaction layer

- `SpotlightCard`: cursor-tracked radial highlight via `--mx/--my` custom properties,
  applied to service, calculator, goal, related and trust cards.
- Magnetic buttons/links in `UI.tsx`: primary buttons and text links read the cursor
  position and translate slightly toward it (spring-lerped, disabled under reduced motion).
- Text-reveal utility for section headings (`data-text-reveal`), driven by the existing
  IntersectionObserver reveal system.

### 9.3 3D black bull (hero centrepiece)

- Stack: `three@0.186.1` + `@react-three/fiber@8` (v8 pinned for React 18),
  `@types/three` in devDependencies. The scene lives in
  `src/components/herobull/BullCanvas.tsx` and is code-split: the main bundle stays
  ~389 kB (115 kB gzip); the bull chunk (~891 kB / 239 kB gzip, three.js included)
  lazy-loads via `React.lazy` in `src/components/HeroBull.tsx`.
- Design: stylised low-poly matte-black bull bust on a dark pedestal with a lime glow
  ring — the "charging bull" of the markets, in Investrow colours.
  - Flat-shaded icosahedron cranium, crown shard, muzzle with glossy nostrils.
  - Horns are a custom tapered-tube `BufferGeometry` solved along a Catmull-Rom
    curve (bone-white, 7 radial segments for the faceted look).
  - Lime emissive eyes (pulsing) + lime rim light from behind = brand glow.
  - Four faceted coins orbit the bust (finance/market motif; the upright lime coin
    spins edge-on like a glint).
- Motion: ease-out-back entrance, idle bob/sway, horn sway, cursor parallax
  (rotation + lateral shift), click/tap anywhere on the stage triggers a "charge"
  (lunge + light flash + eye surge, `bull:charge` window event).
- Performance/safety: DPR capped at 2, IntersectionObserver pauses the frameloop
  when scrolled offscreen, `frameloop="demand"` + static pose under
  `prefers-reduced-motion` (`data-bull-static` flag), and an error boundary +
  hand-drawn SVG `StaticBull` fallback covers WebGL-unavailable.
- Hero composition: the 3D stage replaces the former photo frame; the mission quote
  card (`.hero-side-card`) is lifted clear of it, and the caption pill
  ("01 · The charging bull, at your side") is right-aligned below the stage
  (`.hero-bull-caption`). Soft CSS contact shadow + faint lime halo echo the 3D lighting.
- Verified headless (Edge + SwiftShader): canvas renders, zero console errors,
  0px horizontal overflow at 360px, reduced-motion static confirmed.

### 9.4 Header typography

- Wordmark (site header only): gradient ink (forest → green-700) via
  `background-clip: text`, 20px / `-0.05em`; sub-label in green-700 at 7.5px
  with 0.26em tracking.
- Primary nav: Manrope (display font), uppercase 11.5px weight 650, 0.09em
  tracking; hover underline is a 2px rounded green→lime gradient bar sweeping
  from the left; the active link carries a glowing lime dot.
- Dropdown items: 12.5px display font, weight 550, hover background/translation.
- Header CTA: uppercase 11px / 0.12em weight 700 with a lime glow shadow on hover.

---

## 10. Dark theme ("black website") conversion

The entire site moved to a near-black canvas with elevated dark panels; brand
hues (greens, lime) stay and pop brighter on black.

### 10.1 Token remap (`src/styles/tokens.css`)

- `--offwhite` is now the flipped legacy **canvas** alias (`#060a08`, green-tinted
  near-black); new semantic tokens `--canvas: #060a08` and `--panel: #0e1713`
  (cards/forms/dropdowns) were added.
- Text roles flipped: `--ink: #ecf2ed`, `--ink-soft: #bfd0c7`, `--muted: #93a49b`.
- Tints flipped: `--sage-50: #101712`, `--sage-100: #16221d` (inset panels/chips).
- Borders flipped to light-alpha: `--line: rgba(255,255,255,0.11)`,
  `--line-strong: rgba(255,255,255,0.22)`.
- Greens brightened for dark-canvas legibility: `--green-700: #1d8a64`,
  `--green-600: #27a87b`, `--green-500: #33c291`.
- Shadows deepened to pure-black alphas; `theme-color` meta set to `#060a08`.

### 10.2 Mechanical sweep (`scripts/dark-sweep.mjs`, 101 replacements)

Role-consistent literal flips across base/layout/components/pages CSS:

- `background: var(--white)` → `var(--panel)` (all card/form surfaces)
- `color: var(--offwhite)` → `var(--white)` (text on dark bands)
- `background: var(--offwhite)` and `, var(--offwhite))` gradient stops → `var(--canvas)`
- translucent white glass fills (0.5/0.55/0.85/0.86/0.92) → dark glass equivalents
- header glass → `rgba(6,10,8,0.9/0.96)` (blur kept)
- green-alpha rings/focus glows → brighter `rgba(46,160,120,…)` / lime-alpha ring
- calculator input side `#f1f4ec` → `#0d1411`; range track `#d3ddd0` → white-alpha

### 10.3 Targeted fixes after the sweep

- Wordmark gradient → white→lime (`background-clip: text`), fallback white.
- `.brand` mark colour → `--ink`; header CTA → `--green-700` base with
  `--green-600` hover + lime glow shadow.
- `.btn--light:hover` restored to pure white (guard against the sweep).
- About mission/vision/values icon PNGs (baked orange) monochrome-ed via
  `filter: brightness(0) invert(1) opacity(0.85)`.
- Bull ground shadow → soft lime under-glow (a dark shadow is invisible on black).

### 10.3b Polish round after user review (gradients removed except nav)

- **Gray sections fixed**: `.principles-section` → `rgba(22, 34, 29, 0.6)`,
  `.testimonials-section` → `rgba(18, 28, 24, 0.6)` (light sage-alpha fills had
  survived the sweep, killing contrast). `.service-banner__source` credit text
  restored to `rgba(255, 255, 255, 0.55)` (sweep had made it invisible).
- **ChromaCurrents removed entirely** (user decision): component deleted, import
  removed from `Layout.tsx`; body now paints a static CSS dot grid
  (1px white dots at 4.5% alpha, 42px spacing) on `--canvas`.
- **Gradient scoping (user decision)**: gradients removed everywhere except the
  navigation bar (wordmark + underline) — decorative halos deleted
  (`home-hero`, `hero-bull-wrap::before`, `hero-bull-shadow` under-glow,
  `section--calculator::before`, `mission-section::before`, `page-hero::before`);
  phone-frame backdrop and promise-panel top bar flattened to solid colours.
  **Kept by decision**: cursor-reactive hover glows (spotlight cards, magnetic
  buttons), functional fills (slider progress, image scrim, grid-line texture).
- **Quote card / bull overlap**: below 1000px `.hero-side-card` is now static and
  flows under the stage instead of floating over the bull.
- **AMC logo strip enlarged**: `.amc-strip` now `min(100%, 820px)` wide with
  `aspect-ratio: 1.42/1`; the 1400×300 collage's baked-in white side margins are
  cropped via `object-fit: cover` so logos render ~2× larger (≈100px tiles).
- **Charge animation de-clipped**: lunge depth 0.9→0.5, head tilt 0.26→0.16 rad,
  camera pulls back (z +0.65 at lunge peak) so horn tips stay in frame; scale
  dips 5% and a fast yaw wobble (±0.03, 34 rad/s) sells impact; charge window
  stretched 0.95→1.05s. Flat coins now self-spin (0.48–0.7 rad/s) with a slow
  z-wheel so no coin sits statically edge-on.

### 10.4 ChromaCurrents on black (recolor) — REMOVED in 10.3b

- (Historical) `hueToColor` remapped to a bright glow palette; trails composited
  additively. The whole component was later deleted per user decision — see 10.3b.

### 10.5 Verification (headless Edge)

- No console errors on `/`, `/about`, `/services/mutual-funds`, `/calculators/sip`,
  `/contact`, `/resources` + footer; 0px horizontal overflow at 360px;
  reduced-motion static bull intact; screenshots for desktop, mobile,
  calculator, contact, footer and about all reviewed.
