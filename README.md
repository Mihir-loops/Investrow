# Investrow Financial Services — Web Platform

Modern web application for **Investrow Financial Services Pvt. Ltd.**, an AMFI-registered Mutual Fund Distributor based in Dhanbad, Jharkhand (ARN-194720 · CIN U67190JH2021PTC016813).

Built with React 18, TypeScript, Vite, and Three.js, following an Apple visionOS / iOS "Liquid Glass" dark design language with pure black (`#000000`) surfaces, interactive particle dynamics, and editorial typography.

---

## Tech Stack & Architecture

- **Core:** React 18.3.1, TypeScript 5.7.2, Vite 6.0.5
- **3D & Graphics:** Three.js 0.186.1, `@react-three/fiber` 8.18.0
- **Typography:** Instrument Serif, Manrope Variable, DM Sans Variable (bundled locally via `@fontsource`)
- **Styling Architecture:**
  - `src/styles/tokens.css` — Design tokens, color system, and easings
  - `src/styles/base.css` — Global resets, container structures, base layout
  - `src/styles/layout.css` — Header, navigation, telemetry progress, footer
  - `src/styles/components.css` — Buttons, cards, calculator widgets, interactive states
  - `src/styles/pages.css` — Page grid layouts and responsive styles
  - `src/styles/animations.css` — Motion system, text reveals, magnetic states, and reduced-motion fallbacks

---

## Project Status & Completed Tasks

> **Rule:** This section is updated after every completed task.

### 1. Fix "More About Investrow" Secondary Button Styling & Theme Contrast (Latest)
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`base.css`](src/styles/base.css), [`components.css`](src/styles/components.css)
- **What changed:**
  - **Fixed Invisible White-on-White Text in Light Theme:**
    - Root cause: A blanket rule `[data-theme="light"] .btn { color: #ffffff !important; }` in `base.css` was overriding all secondary buttons, causing `.btn--secondary` on transparent light backgrounds to render white text on white/light background.
    - Fix: Refined selector targeting so `[data-theme="light"] .btn--primary` retains `#ffffff`, while `[data-theme="light"] .btn--secondary` correctly applies crisp dark ink text (`#0c1410 !important`) on light frosted background (`rgba(0, 0, 0, 0.04)`), with a clean hover state to `var(--brand-blue)` with `#ffffff !important` text.
  - **Enhanced Dark Theme Secondary Button:**
    - Upgraded `.btn--secondary` in `components.css` with a frosted glass backdrop (`rgba(255, 255, 255, 0.05)`, `backdrop-filter: blur(12px)`), solid hairline border (`1px solid var(--line-strong)`), and a smooth hover transition to `var(--green-700)` with emerald shadow glow.

### 2. Refined Bull Eye Sockets & Eliminated Mechanical Faceted Hinges
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`BullCanvas.tsx`](src/components/herobull/BullCanvas.tsx)
- **What changed:**
  - **Eliminated Black Jagged Mechanical Hinges Around Eyeballs:**
    - Removed the sharp, angular `<icosahedronGeometry args={[0.095, 0]}>` meshes with flat-shading that were positioned behind each eyeball ball. These jagged polygonal backings previously created faceted black triangular protrusions around the eye's equator, looking like mechanical clamps/hinges connecting the eyeball to the head.
    - Replaced the inner back cup with a smooth organic sphere geometry (`sphereGeometry args={[0.088, 18, 14]}`) that wraps cleanly behind the sclera without any sharp corners or protruding hinges.
  - **Sculpted Anatomical Supraorbital Brow Ridges:**
    - Added subtle, organic bovine brow arches (`scale={[0.13, 0.042, 0.07]}`) seamlessly integrated into the skull structure above each eye socket.
  - **Preserved Pupil & Iris Intact:**
    - Left the entire pupil and iris region completely untouched: glowing candlestick green iris (`#10b981` / `#00dc82`), dark center pupil, specular catchlight, dynamic cursor tracking rotation, and emissive pulsing are 100% preserved.

### 2. Interactive "Scroll to Enter" Restored on Cinematic Preloader
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`CinematicPreloader.tsx`](src/components/CinematicPreloader.tsx)
- **What changed:**
  - **Restored "Scroll to Enter" User-Driven Experience:**
    - Removed the automatic advance timer so the preloader holds and displays the full typography and the animated "Scroll to enter" visual cue (pulsating vertical light track and uppercase indicator).
    - Re-enabled dynamic scroll control: when the user scrolls down with a mouse wheel or swipes up on touch, `targetProgress` responds smoothly and proportionately. Once the user scrolls past halfway (`>= 0.45`), the fly-through gracefully carries all the way in to reveal the homepage.
    - Preserved zero-lag exit: upon reaching completion, `preloader-active` is removed immediately so there is never any black freeze or delay before the hero section and text are revealed.

### 2. Fix Homepage Black Screen Glitch, Remove Page Loading Popup & Refine Header Dropdowns
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`CinematicPreloader.tsx`](src/components/CinematicPreloader.tsx), [`TextReveal.tsx`](src/components/TextReveal.tsx), [`Home.tsx`](src/pages/Home.tsx), [`PageTransition.tsx`](src/components/PageTransition.tsx), [`Header.tsx`](src/components/Header.tsx), [`layout.css`](src/styles/layout.css), [`animations.css`](src/styles/animations.css)
- **What changed:**
  - **Eliminated 3-5s Black Screen & Invisible Text on Homepage Load:**
    - Root cause: `CinematicPreloader.tsx` required excessive wheel scroll deltas (`0.00115` multiplier) and slow `0.075` lerping before completing, while `preloader-active` forced `background-color: #000000 !important` and `overflow: hidden` on `html` and `body`. In addition, `TextReveal` for the hero H1 was stuck at `opacity: 0` waiting for an `IntersectionObserver` that was suppressed under `overflow: hidden` + CSS scale transform.
    - Fixes:
      - Any natural scroll flick (or touch swipe) now immediately initiates the fly-through to `targetProgress = 1` with a responsive `0.12` exit lerp.
      - Added a 1.8s auto-advance timer so users who don't scroll are never stuck waiting on the preloader.
      - Removed `background-color: #000000 !important` from `html.preloader-active, body.preloader-active`, allowing the true page background (`var(--theme-bg)`) to display.
      - Added `immediate` prop to `TextReveal` and enabled it on the hero H1 in [`Home.tsx`](src/pages/Home.tsx), ensuring the headline renders and animates immediately without delay.
      - Unlocked page scroll and resumed Lenis immediately upon preloader completion.
  - **Removed "INVESTROW Loading" Popup on Route Transitions:**
    - Removed `BrandTransitionVeil` from [`PageTransition.tsx`](src/components/PageTransition.tsx).
    - Route transitions now immediately swap routes, scroll to top, and smoothly slide/fade the new page in (`pageSlideIn 0.28s`) without any artificial modal overlay or blocking loading badge.
  - **Refined Header Dropdown Behavior & Light Theme Fix:**
    - Removed the full-screen `.nav-backdrop` that previously covered the entire page with `rgba(0, 0, 0, 0.85)` and `blur(24px)`.
    - Dropdowns now float cleanly over the page without blurring or darkening the background behind them.
    - Fixed light theme dropdown: `.nav-dropdown__inner` now renders as a clean light glass card (`rgba(255, 255, 255, 0.98)`, border `rgba(0, 0, 0, 0.12)`, dark text `#0c1410`), eliminating the bug where hovering over nav items made the entire screen appear to switch to dark theme.

### 2. Fix Theme Flash on Load + Cinematic Dark-Mode Wipe Animation
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`index.html`](index.html), [`ThemeToggle.tsx`](src/components/ThemeToggle.tsx), [`animations.css`](src/styles/animations.css)
- **What changed:**
  - **Eliminated Flash-of-Wrong-Theme (FOWT) on Page Load:**
    - Root cause: `data-theme` was applied inside the JS module (`useTheme.ts`), which runs after React hydrates — causing the page to render in the wrong (dark) theme before flipping after ~5s.
    - Fix: Added a blocking synchronous inline `<script>` in [`index.html`](index.html) that reads `localStorage.getItem("investrow_theme")` and sets `document.documentElement.setAttribute("data-theme", theme)` **before** the first pixel is painted. This is the standard FOWT prevention technique used by sites like GitHub and Linear.
  - **Cinematic Dark-Mode Wipe Transition:**
    - Updated [`ThemeToggle.tsx`](src/components/ThemeToggle.tsx) to intercept clicks and fire a cinematic ink-circle sweep expanding from the exact click point on the button.
    - **View Transition API path (Chrome 111+, Edge 111+):** Uses `document.startViewTransition()` with a `clip-path: circle(...)` animation on `::view-transition-new(root)` for going dark (ink expands from button) and `::view-transition-old(root)` for going light (white uncovers from button).
    - **CSS Ripple Fallback (all other browsers):** Appends a full-screen fixed `div.theme-wipe-overlay` with inline `clip-path` transition — black for dark mode, white for light mode — that expands from the click coordinates at 650ms, applies the theme midway, then self-removes on `transitionend`.
    - Added `::view-transition-old/new(root)` CSS rules in [`animations.css`](src/styles/animations.css) to suppress the default browser cross-fade and layer the snapshots correctly (`z-index: 9999` for new, `z-index: 1` for old).
    - Reduced-motion users skip the animation and get an instant theme switch.

### 2. Solid Pure Black Bull Horns (No Gradient)
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`BullCanvas.tsx`](src/components/herobull/BullCanvas.tsx), [`HeroBull.tsx`](src/components/HeroBull.tsx)
- **What changed:**
  - **Full Solid Black Horns in 3D Scene (`BullCanvas.tsx`):**
    - Removed `hornGradientTexture` completely.
    - Updated both `leftHornRef` and `rightHornRef` materials to solid deep obsidian black (`#050706`) with zero emission (`emissive: #000000`, `emissiveIntensity: 0`).
    - Tuned high-end metallic specular properties (`metalness: 0.65`, `roughness: 0.28`) so the horns have an authentic polished obsidian sheen catching the ambient lights without any green or colored gradient.
  - **Solid Black Horns in 2D SVG Fallback (`HeroBull.tsx`):**
    - Removed `linearGradient` horn definitions (`#bull-horn-left` and `#bull-horn-right`).
    - Filled both horn paths with solid `#050706`.

### 2. Organic Rounded Bovine Muzzle, Realistic Septum Ring Piercing & Overlay Textbox Removal
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`BullCanvas.tsx`](src/components/herobull/BullCanvas.tsx), [`HeroBull.tsx`](src/components/HeroBull.tsx), [`Home.tsx`](src/pages/Home.tsx), [`pages.css`](src/styles/pages.css)
- **What changed:**
  - **Eliminated All Boxy Snout Corners:**
    - Replaced all rectilinear `boxGeometry` meshes with organic, smooth-tessellated geometries (`sphereGeometry`, `torusGeometry`, `cylinderGeometry` with 24–48 radial subdivisions).
    - Sculpted the rhinarium (nasal pad) as a soft, pillowed ellipsoid (`[0.96, 0.46, 0.4]`) that blends seamlessly into the muzzle cheeks with zero sharp 90-degree corners.
    - Softened upper lip and chin cushions with organic curved geometry (`sphereGeometry args={[0.34, 32, 20]}`).
    - Modeled smooth recessed nostril cavities with curved alar rim folds hugging each aperture.
  - **Corrected Septum Ring Piercing Placement & Gravity Hang:**
    - Repositioned the Wall Street gold septum ring (`[0, -0.06, 0.46]` with radius `0.125`) so its upper arch pierces directly through the central septum cartilage between the nostril openings.
    - Added an authentic golden piercing clasp/hinge stud (`[0, 0.125, 0]`) locking through the septum tissue.
    - Calibrated the hang angle (`rotation={[0.24, 0, 0]}`) so the ring hangs naturally downward with a gentle forward drape over the upper lip.
    - Upgraded ring material to high-polish gold (`#f59e0b`, `metalness: 0.96`, `roughness: 0.16`).
  - **Removed Overlapping Textboxes Over the 3D Bull:**
    - Removed `.hero-bull-caption` and `.hero-side-card` (and `.hero-stamp`) floating cards from `home-hero__visual` in [`Home.tsx`](src/pages/Home.tsx), completely clearing the visual field so the 3D bull is unobstructed.
    - Centered `.home-hero__visual` in its grid column without offset padding in [`pages.css`](src/styles/pages.css).

### 2. Realistic Bovine Muzzle & Stock Market Bullish Green Recolor
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`BullCanvas.tsx`](src/components/herobull/BullCanvas.tsx), [`HeroBull.tsx`](src/components/HeroBull.tsx)
- **What changed:**
  - **Authentic Anatomical Bovine Muzzle (Replaced "Two Spheres"):**
    - Eliminated the two spherical meshes that looked like "two balls" sticking out.
    - Sculpted a realistic anatomical bovine snout with a planar, leathery nasal pad (rhinarium) using a tapered box geometry (`[0.82, 0.44, 0.32]`) and central dividing septum crease.
    - Modeled recessed crescent/tear nostril cavities (`#010402`, shadowed interior) angled naturally outward at $\pm 22^\circ$.
    - Added flared muscular alar folds (nostril wings) wrapping around each cavity rim.
    - Integrated a classic Wall Street golden septum ring (`torusGeometry`, `#eab308` metallic) dangling naturally from the nose bridge.
  - **Stock Market Bullish Green Recolor (TradingView / NSE Candlestick Green):**
    - Replaced all crimson/red textures, materials, and point lights with high-intensity Stock Market Candlestick Green:
      - Head & Horns: Obsidian carbon base (`#020704`, `#040d08`) transitioning through deep emerald (`#064e3b`) into vibrant trading candlestick green (`#059669`, `#10b981`) and electric neon tips (`#00dc82`, `#00ff88`).
      - Lighting: Transformed key directional light and eye rim-lights from red to bullish emerald (`#00dc82` and `#10b981`).
      - Orbiting Coins: Synchronized floating metallic coins with vibrant bullish green rim illumination.
      - 2D SVG Fallback: Updated [`HeroBull.tsx`](src/components/HeroBull.tsx) SVG gradients, curved nostril slits, golden septum ring, and cursor-tracking irises to match the exact stock market green colorway.

### 2. Zero-Overlap Stacking Alignment Fix & Viewport Coverage
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`components.css`](src/styles/components.css), [`Pillars.tsx`](src/components/Pillars.tsx)
- **What changed:**
  - **Eliminated Text & Alphabet Overlap Leakage:**
    - Root cause: A cumulative 18px offset across 9 cards pushed Card 8 (the last card, "W") down by 144px (`top: 229px`), leaving the top 144px of previous cards (their letters and titles) exposed above Card 8.
    - Solution: Set `--deck-offset: 0px` so every card pins at the exact same anchor (`top: 85px`). As each card scrolls up, its solid background (`var(--theme-bg)`) completely covers the previous card with zero top gap.
  - **Full-Viewport Height Coverage (`min-height: calc(100vh - 100px)`):**
    - Configured `.pillar-editorial-slide` and `.service-editorial-slide` with `min-height: calc(100vh - 100px)` and `justify-content: center`.
    - This ensures every card's background extends all the way to the bottom of the viewport, eliminating any bottom text leakage from previous cards.
  - **Corrected Letter & Typography Alignment:**
    - Added `display: inline-block; min-width: 1.1ch; padding-right: 4px; letter-spacing: 0;` to `.pillar-editorial-slide__letter`.
    - Guaranteed consistent right-edge alignment across all letters (narrow `I` through wide `W`) without glyph clipping or baseline jitter.

### 2. Right-Aligned Editorial Stacking Principles — "Nine words. One standard."
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`Pillars.tsx`](src/components/Pillars.tsx), [`Home.tsx`](src/pages/Home.tsx), [`About.tsx`](src/pages/About.tsx), [`components.css`](src/styles/components.css)
- **What changed:**
  - **Identical Editorial Typography & Zero-Box Design:**
    - Stripped all card containers, borders, rounded boxes, box-shadows, and top blue stripes from the "Nine words. One standard." section.
    - Each pillar slide now floats as pure, unobstructed typography directly on the canvas (`var(--theme-bg)`) with a clean hairline top divider (`1px solid var(--theme-border)`).
    - Preserved the sticky deck-stacking animation (`top: calc(85px + (var(--deck-index) * 18px)); margin-bottom: clamp(140px, 24vh, 280px);`) where each principle pins and stacks gracefully over the previous one as you scroll.
  - **Complete Right-Aligned Layout (Alternating Visual Rhythm):**
    - Section header ("Nine words. One standard.") is completely right-aligned (`text-align: right; margin-left: auto; align-items: flex-end;`).
    - Top row features the giant Instrument Serif italic letter (`I`, `N`, `V`, `E`, `S`, `T`, `R`, `O`, `W`) in commanding scale (`clamp(56px, 7.5vw, 112px)`) on the right, paired with the uppercase step index (`Investrow Principle · 01 of 09`).
    - Headings (`clamp(38px, 5.5vw, 76px)`), paragraphs (`clamp(18px, 1.8vw, 25px)`), and foot links are all right-aligned (`margin-left: auto; text-align: right;`).
    - Hover animation gracefully shifts text leftwards (`translateX(-8px)`).
  - **Theme Support:** Solid monochrome white (`#ffffff`) in dark mode, pure black (`#000000`) in light mode.

### 2. Editorial Stacking Services Redesign (Zero Boxes, Pure Typography)
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`Home.tsx`](src/pages/Home.tsx), [`components.css`](src/styles/components.css)
- **What changed:**
  - **Zero Boxes & Zero Top Color Stripes:** Completely removed the card container boundaries, borders, rounded corners, box-shadows, and top accent color bars from the "Advice for every stage of the journey" services section.
  - **Preserved Stacking Deck Scroll Interaction:** Maintained the pinned sticky stacking interaction (`position: sticky; top: calc(85px + (var(--deck-index) * 22px)); margin-bottom: clamp(140px, 24vh, 280px);`) where each service pins in place as you scroll and the next service glides up and cleanly stacks over the previous one.
  - **Harmonized Editorial Typography System:**
    - Master Section Title enlarged to `clamp(44px, 6.6vw, 90px)` with graceful Instrument Serif italic emphasis.
    - Giant Instrument Serif italic index numerals (`clamp(56px, 7.5vw, 112px)`) with delicate `0.35` opacity.
    - Service Titles expanded to `clamp(40px, 5.8vw, 80px)` in Manrope with subtle hover translation.
    - Teasers styled in DM Sans (`clamp(18px, 1.8vw, 25px)`) with generous leading and maximum readability.
    - Clean plain text action links (`Explore practice →`) with underline offset and arrow glide.
  - **Deliberate Negative Space:** Generous vertical spacing (`padding: clamp(48px, 8vh, 88px) 0 clamp(40px, 6vh, 72px)`) and clean canvas backgrounds (`var(--theme-bg)`) with a single hairline top divider (`1px solid var(--theme-border)`), ensuring previous text is cleanly masked without artificial boxes or visual clutter.
  - **Full Theme Support:** Pure solid white (`#ffffff`) in dark mode, pure solid black (`#000000`) in light mode.

### 2. Pure Editorial Typography Horizontal Journey
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`FinancialJourney.tsx`](src/components/FinancialJourney.tsx), [`journey.css`](src/styles/journey.css), [`Home.tsx`](src/pages/Home.tsx), [`ScrollHUD.tsx`](src/components/ScrollHUD.tsx), [`main.tsx`](src/main.tsx)
- **What changed:**
  - **Zero Gradients & Zero Background Artifacts:** Completely eliminated all color gradients, glowing halos, radial beams, iris overlays, floor grids, and progress bars.
  - **Zero Boxes / Zero Cards:** Removed all bounding card containers, borders, pills, and box-shadows. The content now floats as pure, unobstructed typography directly over the canvas.
  - **Seamless Flow from "Built in Dhanbad, Built Around People":** Right after the company about preview section, vertical scrolling directly and naturally drives horizontal translation from left to right, transitioning directly into the next vertical section (`#services`) upon completion with zero interstitial delay or portal curtain animations.
  - **Global Cursor-Reactive Dot Grid Background:** Set `background: transparent !important` across the horizontal container so the global `InteractiveGrid` canvas with its dynamic cursor spotlight and particle physics shines directly behind the text, matching the rest of the homepage.
  - **Editorial Typography System:**
    - High-contrast typography pairing Manrope grotesque headings with graceful Instrument Serif italic numerals and emphasis words.
    - Solid monochrome plain text: pure white (`#ffffff`) in dark mode, pure black (`#000000`) in light mode.
    - Minimal plain text stage switchers (`01 Where You Are` · `02 Where You Want To Be` · `03 How We Help You Reach` · `04 Where We Make You Arrive`).

### 2. Aggressive Obsidian & Crimson Gradient Bull
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`BullCanvas.tsx`](src/components/herobull/BullCanvas.tsx), [`HeroBull.tsx`](src/components/HeroBull.tsx)
- **What changed:**
  - **Procedural Black-to-Red Body Gradient:** Created a custom 512x512 procedural canvas gradient mapping obsidian black (`#060102`) at the crown down through deep sinister maroon (`#5a080d`), blood red (`#991b1b`), and fiery aggressive scarlet (`#dc2626`) across the faceted skull geometry.
  - **Lethal Gradient Horns:** Computed custom UV coordinates for `taperedTubeGeometry` to render a gradient transition from pitch-black horn roots (`#050102`) up into glowing crimson spines and razor molten red tips (`#ff2a2a`).
  - **Fierce Crimson Gaze:** Replaced lime eyes with predatory glowing blood-red irises (`#ef4444` / `#ff1a1a`), dark obsidian sockets, and cursor-tracking jet-black pupils with sharp catchlight reflections.
  - **Dramatic Volcanic Lighting:** Configured an intense crimson silhouette rim light (`#ef4444` @ 2.8 intensity) and a warm volcanic underglow (`#dc2626`) paired with cool key illumination.
  - **Orbiting Ruby & Onyx Tokens:** Updated orbital market tokens to ruby red, crimson ember, and obsidian onyx.
  - **SVG Fallback Gradients:** Mirrored the aggressive black-to-crimson gradient system in [`HeroBull.tsx`](src/components/HeroBull.tsx) for SVG fallback mode.

### 2. Dynamic Hero Bull Eye Tracking
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`BullCanvas.tsx`](src/components/herobull/BullCanvas.tsx), [`HeroBull.tsx`](src/components/HeroBull.tsx)
- **What changed:**
  - **3D Bull Eye Gaze Mechanics:** Upgraded the 3D bull's eyes with anatomical depth: dark sculpted eye socket, luminous almond sclera, glowing lime iris, intense dark pupil, and specular catchlight reflection.
  - **Full-Viewport Cursor Following:** Attached a global pointer tracker calculating the exact gaze vector from the bull's head center in screen space to the cursor anywhere on the window (headline, CTA buttons, navigation, or visual).
  - **Organic Motion Dynamics:** Pupils translate smoothly inside the eye sockets along X/Y with natural optical convergence, while each eyeball independently articulates in 3D pitch and yaw towards the cursor coordinates using exponential damping (`delta * 8.5`).
  - **Fallback SVG Tracking:** Also updated `StaticBull` in `HeroBull.tsx` so that fallback rendering maintains real-time pupil gaze tracking towards the cursor.

### 2. High-Contrast Light Theme Text, Cursor-Only Grid Spotlight & Black Cursor
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`InteractiveGrid.tsx`](src/components/InteractiveGrid.tsx), [`components.css`](src/styles/components.css), [`tokens.css`](src/styles/tokens.css), [`base.css`](src/styles/base.css), [`layout.css`](src/styles/layout.css), [`pages.css`](src/styles/pages.css)
- **What changed:**
  - **Light Theme Pure Black Text:** Fixed all low-contrast/white text in light mode. Set `--white: #000000;`, `--ink: #000000;`, and `--theme-text: #000000;` under `[data-theme="light"]`, with explicit overrides across `base.css`, `components.css`, `layout.css`, and `pages.css` so headings, paragraphs, deck cards, calculator panels, trust cards, labels, and stats render in crisp, readable pure black (`#000000`) and dark forest tones.
  - **Dark Mode Background Dots Spotlight:** In dark mode, all dots outside the cursor's interaction radius are hidden. Only dots within proximity of the mouse pointer smoothly reveal with a luminous radial falloff and constellation hairlines.
  - **Black Custom Cursor in Light Mode:** Updated `.custom-cursor__dot` to switch to pure black (`#000000`) under `[data-theme="light"]` with smooth color transition, ensuring high visibility against the light background.

### 2. Blue + Orange Color System & Dark/Light Theme Toggle
- **Status:** Completed & Verified (build exit code 0)
- **Files:** [`tokens.css`](src/styles/tokens.css), [`base.css`](src/styles/base.css), [`layout.css`](src/styles/layout.css), [`components.css`](src/styles/components.css), [`useTheme.ts`](src/hooks/useTheme.ts), [`ThemeToggle.tsx`](src/components/ThemeToggle.tsx), [`Header.tsx`](src/components/Header.tsx), [`Layout.tsx`](src/components/Layout.tsx), [`Home.tsx`](src/pages/Home.tsx)
- **What changed:**
  - Deck card color palette replaced: Services 1–4 → Blue (`#2563eb`), Services 5–8 → Orange (`#ea580c`). Trust cards: Blue top border. Goals: Orange top border + Blue horizon badges. Pillars: Blue letter glow + Orange tag.
  - New CSS variables: `--brand-blue`, `--brand-orange`, `--brand-blue-dim`, `--brand-orange-dim`, and a full set of `--theme-*` surface tokens.
  - `[data-theme="light"]` overrides across all CSS files — background, surfaces, text, borders, nav, footer, deck cards, hero, typography.
  - `useTheme.ts` hook — reads/writes `localStorage` key `investrow_theme`, applies `data-theme` on `<html>` immediately before first paint (no flash).
  - `ThemeToggle.tsx` — animated pill toggle (Sun/Moon icon swap, sliding thumb) mounted in `Header.tsx` `header-actions` area.
  - Smooth `0.38s` CSS transitions on `html` and `body` background/color — no abrupt flashes.
  - Preloader always pitch-black regardless of theme.
  - `::selection` color updated to `--brand-blue` on both themes.

### 2. "Deck of Cards" Stacking System
- **Status:** Completed & Verified
- **Components:** [`Home.tsx`](src/pages/Home.tsx), [`Pillars.tsx`](src/components/Pillars.tsx), [`components.css`](src/styles/components.css)
- **Physics & Motion Architecture:** Replaced static grids and flat rows with hardware-accelerated CSS sticky stacking. Each card pins to the viewport as the user scrolls, while subsequent cards glide up from below and stack into a tactile, layered deck of visionOS liquid-glass cards.
- **Applied to 4 Core Sections:**
  1. **The 8 Services ([`Home.tsx`](src/pages/Home.tsx)):**
     - Stacks all 8 services into a multi-colored deck (`.services-deck`).
     - Each card features a 2.5px glowing accent line (`meta.accent`), service index (`01`–`08`), category pill tag, icon badge, headline, teaser copy, and animated "Explore service" link.
     - As cards stack, the top 16px lip of each card remains visible, forming a stacked palette of all service lines.
  2. **The 4 Trust Cards ([`Home.tsx`](src/pages/Home.tsx)):**
     - The left-hand lead copy ("Trust is built in the details") pins stickily in place (`position: sticky; top: 120px`).
     - The 4 trust cards stack on the right (`.trust-deck`) with a 22px incremental offset: "01 Goals before products", "02 Registered distribution", "03 Risk comes first", "04 A relationship, not a sale".
  3. **The 5 Financial Goals ([`Home.tsx`](src/pages/Home.tsx)):**
     - Stacks the 5 life goals into an interactive 5-card deck (`.goals-deck`).
     - Features neon-lime accent bevels, time-horizon badges ("3–10 years", "10–35 years"), custom icons, titles, and callout arrows.
  4. **The INVESTROW Pillars ([`Pillars.tsx`](src/components/Pillars.tsx)):**
     - Stacks the 9 principles (**I**, **N**, **V**, **E**, **S**, **T**, **R**, **O**, **W**) into an iconic 9-card deck (`.pillars-deck`).
     - Displays 56px glowing neon-lime display letters with step indicators (`01 / 09` through `09 / 09`) and detailed principle breakdowns.
- **Liquid Glass Materials & Depth:**
  - High-density frosted glass surface (`rgba(13, 19, 16, 0.95)`, `backdrop-filter: blur(28px) saturate(180%)`) prevents background text bleed-through.
  - Multi-tier spatial drop shadows (`0 -4px 20px rgba(0, 0, 0, 0.5), 0 24px 54px -10px rgba(0, 0, 0, 0.85)`) create physical card separation.
  - Fully responsive with calibrated offsets for mobile (`max-width: 768px`) and graceful fallback for `prefers-reduced-motion`.

---

### 2. Branded Cinematic Page Transitions
- **Status:** Completed & Verified
- **Components:** [`PageTransition.tsx`](src/components/PageTransition.tsx), [`App.tsx`](src/App.tsx), [`Layout.tsx`](src/components/Layout.tsx), [`animations.css`](src/styles/animations.css)
  - **Decoupled Route Lifecycle Orchestration:** When clicking any link or navigating history, React Router's `<Routes location={displayLocation}>` is controlled via `PageTransitionProvider`. Instead of an instant unmount/mount swap, outgoing pages smoothly animate out while the next page loads cleanly behind a branded veil.
  - **Fluid Page Fade/Slide Out:** Outgoing content in `<main className="site-main page-exiting">` glides upward (`translate3d(0, -20px, 0)`), fades to `0`, and dissolves with optical blur (`blur(5px)`) over 220ms.
  - **Apple visionOS Branded Transition Veil (`BrandTransitionVeil`):**
    - A full-screen frosted liquid-glass backdrop (`background: rgba(0, 0, 0, 0.92)`, `backdrop-filter: blur(28px) saturate(180%)`) sweeps across the screen.
    - **Top Neon-Lime Laser Shutter Beam:** An animated neon-lime photon beam (`var(--lime)`) sweeps across the top viewport edge.
    - **Investrow Brand Emblem Badge:** The signature geometric Investrow monogram SVG mark with a neon-lime dot, uppercase `INVESTROW` wordmark in Syne typography, and regulatory tagline (`AMFI-REGISTERED · MUTUAL FUNDS & WEALTH`) scales into the center with an ambient lime radial halo.
  - **Hidden Scroll Top Pin:** At the 220ms switch point (behind the veil), `window.scrollTo(0, 0)` and `lenis.scrollTo(0, { immediate: true })` instantly reset the scroll to the top of the incoming page with zero visual jump or artifact.
  - **Fluid Page Fade/Slide In:** The incoming page `<main className="site-main page-entering">` smoothly glides up from below (`translate3d(0, 24px, 0) -> (0, 0, 0)`) and illuminates into full focus as the veil dissolves.
  - **Hash & Accessibility Smart Bypass:** Anchor links on the same page (e.g., `#contact-form`) and `prefers-reduced-motion` bypass the transition for zero-delay accessibility.

---

### 3. Buttery-Smooth Lenis Inertia Scrolling
- **Status:** Completed & Verified
- **Hook:** [`useLenis.ts`](src/hooks/useLenis.ts)
  - **Inertia Momentum Physics:** Powered by **Lenis** (`v1.3.27`) with custom quintic exponential ease-out curve (`easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `duration: 1.2s`) for iOS / iPhone-like smooth gliding.
  - **Single RAF Loop:** Integrated with `requestAnimationFrame` for buttery-smooth 60/120fps display refresh rate synchronization without micro-stutters.
  - **Native Compatibility:** Emits standard native `scroll` events so `window.scrollY`, `IntersectionObserver`, `ScrollHUD.tsx`, and CSS custom properties continue operating seamlessly.
  - **Route Navigation & Hash Sync:** Connected to `ScrollManager` in [`Layout.tsx`](src/components/Layout.tsx) to immediately snap to top on route change via `lenis.scrollTo(0, { immediate: true })`, eliminating inertia bleed across page navigations.
  - **Mobile & Accessibility:** Keeps native touch scrolling on touchscreens (`syncTouch: false`) and automatically disables when `prefers-reduced-motion` is detected.
- **Integration:** Initialized in [`Layout.tsx`](src/components/Layout.tsx) with styling support in `lenis/dist/lenis.css` and `base.css`.

---

### 4. Nav Dropdown Liquid Glass & Frosted Background Blur
- **Status:** Completed & Verified
- **Components:** [`Header.tsx`](src/components/Header.tsx) and [`layout.css`](src/styles/layout.css)
  - **Full-Screen Frosted Backdrop:** When any navigation item with sub-links (About, Services, Goals, Tools) is opened, a fixed full-screen backdrop (`.nav-backdrop`) smoothly fades in with deep obscuring tint (`rgba(0, 0, 0, 0.85)`) and intensive optical blur (`backdrop-filter: blur(24px) saturate(160%)`).
  - **Background Occlusion:** The entire underlying webpage content behind the popup is completely blurred out and obscured, isolating visual focus exclusively to the navigation popup.
  - **Apple visionOS Liquid Glass Box:** The dropdown box (`.nav-dropdown__inner`) is elevated with premium frosted liquid glass styling:
    - Ultra-dense panel background (`rgba(10, 14, 12, 0.94)`) with heavy blur (`backdrop-filter: blur(36px) saturate(190%)`).
    - Luminous specular inner bevel highlight (`box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset, ...`).
    - Multilayered deep drop shadows with ambient neon-lime accent reflection (`rgba(215, 243, 106, 0.08)`).
  - **Click-Outside Dismissal:** Clicking anywhere on the frosted backdrop or pressing `Escape` immediately dismisses the active dropdown and smoothly clears the blur.

---

### 5. Minimal Pure White Dot Cursor
- **Status:** Completed & Verified
- **Component:** [`CustomCursor.tsx`](src/components/CustomCursor.tsx)
  - **Minimal Pure White Dot:** Clean, crisp, single white dot (`#ffffff`, 8px diameter) replacing the default browser cursor with zero trailing rings and zero color tints.
  - **Decoupled Two-Tier Hardware Architecture:** Completely separated translation from scale. Outer container `.custom-cursor` updates `translate3d(x, y, 0)` with zero CSS transition delay for 1:1 hardware synchronization with native mouse polling (120Hz/1000Hz).
  - **Zero Glitch / Scale Isolation:** Inner `.custom-cursor__dot` handles tactile scaling (`scale(1.6)` on interactive hover, `scale(0.65)` on click) independently, preventing scale transforms from clobbering or resetting screen coordinates.
  - **Universal Native Cursor Suppression:** Applied `*, *::before, *::after { cursor: none !important; }` across desktop viewports to eliminate cursor flickering over text headings, divs, and 3D canvas, while preserving native I-beam on inputs.
  - **Touch & Mobile Isolation:** Automatically unmounts on touchscreens and mobile devices (`pointer: coarse`, `hover: none`), preserving native touch handling.
- **Styles:** Configured in [`components.css`](src/styles/components.css).

---

### 6. Cinematic Preloader & Void Fly-Through Screen
- **Status:** Completed & Verified
- **Component:** [`CinematicPreloader.tsx`](src/components/CinematicPreloader.tsx)
  - **Pure Pitch Black Initial View:** On page load or reload, the screen is 100% pitch black (`#000000`). All other UI (headers, footers, interactive dots, cards) is concealed underneath.
  - **Full Horizontal Edge-to-Edge Spread (Screen-Fit Calibrated):** **`I N V E S T R O W`** written in all capital letters, horizontally spread across the entire width of the viewport with mathematically calibrated typography (`font-size: clamp(20px, 6.2vw, 108px)` and `padding: 0 clamp(16px, 4vw, 56px)`). Guarantees zero text overflow, zero clipping, and comfortable luxury tracking across all screen sizes (from 320px mobile to 4K desktop). No trailing green dot.
  - **Zero Hero-Overshoot & Scroll Lock Guarantee:**
    - Pauses Lenis and intercepts all input in capture mode (`capture: true`, `e.stopImmediatePropagation()`) while the preloader is on-screen.
    - Added residual wheel/touch momentum absorption buffer (450ms) during the preloader exit phase. Lingering mousewheel clicks or trackpad inertia from zooming through the preloader are fully consumed and discarded instead of leaking into the page.
    - Pins the page solidly at `window.scrollTo(0, 0)` and `lenis.scrollTo(0, { immediate: true })`, guaranteeing the user lands precisely at the top of the **Hero section** rather than skipping ahead to subsequent sections.
  - **Architectural Display Font:** Researched and integrated **Syne** (Google Fonts `Syne:wght@700;800`), the top-rated font for modern luxury geometric logos and wordmarks, backed by **Cinzel** and **Manrope**.
  - **Isolated Keyframe/Inline Architecture:** Entrance animation keyframes decouple after 900ms, granting inline 3D transforms 100% unimpeded control over 120fps motion.
  - **Ultra-Smooth 3D Void Fly-Through Physics:**
    - Continuous velocity tracking with a soft-calibrated spring-damper lerp factor (`0.075`), eliminating any discrete notch stepping from mousewheels.
    - Symmetrical horizontal dispersal: as the user scrolls, `I`, `N`, `V`, `E` glide leftward beyond the screen edge, while `T`, `R`, `O`, `W` glide rightward beyond the screen edge.
    - The geometric center letter **`S`** scales up directly toward the camera (up to 7.2× scale) and dissolves with cinematic optical depth-of-field blur (`blur(24px)`).
    - Central ethereal radial portal (`.cinematic-portal`) expands with an ambient corona.
    - The website beneath scales seamlessly from `0.95` to `1.0` via `--preloader-scale`, delivering a continuous 3D spatial depth sensation.
    - Fully reversible: scrolling back up smoothly returns the letters to their pristine spread.
    - Single-session memory: plays on initial visit/tab reload; does not block internal client-side SPA route navigation; includes `window.replayPreloader()` for testing anytime.
- **Integration:** Integrated at top-level layout in [`Layout.tsx`](src/components/Layout.tsx).
- **Styles & Reduced-Motion:** Full styling in [`animations.css`](src/styles/animations.css) with `prefers-reduced-motion` override.

---

### 7. Animated Number Counters
- **Status:** Completed & Verified
- **New Component:** [`AnimatedCounter.tsx`](src/components/AnimatedCounter.tsx)
  - Intelligent string & numeric parser: parses formats such as `"₹250 cr+"`, `"3,000+"`, `"23+"`, `"10+"`, `"₹50Cr+ AUM"`.
  - Splits prefix, target value, decimals, and suffix cleanly.
  - Smooth quintic ease-out deceleration curve (`1 - (1 - progress)^4`) rendered at 60/120fps with `requestAnimationFrame`.
  - Formats numbers in Indian notation (`3,000`, `1,00,000`) via `numberIN`.
  - Scroll-triggered using `useInView` with `once: true`.
  - `font-variant-numeric: tabular-nums` prevents horizontal jitter during counts.
  - Soft neon-lime ambient glow upon reaching target value.
- **Enhanced [`Stat.tsx`](src/components/Stat.tsx):**
  - Upgraded to accept string or number values.
  - Added an integrated animated progress line (`.stat__bar` and `.stat__bar-fill`) that expands from 0% to 100% in sync with the counter.
- **Homepage Milestone Grid ([`Home.tsx`](src/pages/Home.tsx)):**
  - Added a 4-card responsive liquid-glass milestones showcase in the intro section:
    - **₹250 cr+** Total AUM Managed
    - **3,000+** Client Relationships
    - **23+** Years Experience
    - **10+** AMC Recognitions
  - `fact-grid` counters (`8 Service lines`, `3 Leadership profiles`, `2 Dhanbad offices`) animate on scroll.
- **About Page Milestones ([`About.tsx`](src/pages/About.tsx)):**
  - Replaced static text in `.published-card` with `<AnimatedCounter>` for all 4 published milestones.
- **Styles & Accessibility:**
  - Added CSS classes for `.animated-counter`, `.stat__bar`, `.milestones-row`, and `.milestone-box`.
  - Added reduced-motion overrides in `animations.css` for instant value display.

---

### 8. Magnetic Buttons with Label Roll
- **Status:** Completed & Verified
- **Hook:** [`useMagnetic.ts`](src/hooks/useMagnetic.ts) Proximity detection hook applying proportional magnetic translation pull toward the cursor with elastic snap-back.
- **Components:** [`UI.tsx`](src/components/UI.tsx) (`ButtonLink`) and [`Header.tsx`](src/components/Header.tsx) ("Let's talk" CTA).
- **Label Roll Effect:** Dual-layered text sliding up on hover while duplicate slides in from below.

---

### 9. Scroll-Triggered Text Reveal (Scrollytelling)
- **Status:** Completed & Verified
- **Component:** [`TextReveal.tsx`](src/components/TextReveal.tsx)
- Supports `words` (slide up per word with inertia), `blur-fade` (atmospheric focus), and `chars` (letter drop-in).
- Applied across all major headings on all 15 pages with full `prefers-reduced-motion` compliance.

---

### 10. Apple visionOS / iOS "Liquid Glass" Cards
- **Status:** Completed & Verified
- Styled all content boxes, calculator widgets, and cards with frosted glass backdrop blur (`blur(20px)`), 1px subtle luminous borders, specular inner highlights (`box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.14)`), and hover elevation.

---

### 11. Background Dots & 3D Hero Bull
- **Status:** Completed & Verified
- Pure black (`#000000`) canvas with white interactive dot grid reacting exclusively to cursor proximity (magnetic push, constellation lines, click shockwaves; scroll movement removed per user preference).
- Original low-poly matte-black 3D charging bull bust with orbiting financial rings preserved and restored in `BullCanvas.tsx`.

---

### 12. Scroll Telemetry HUD
- **Status:** Completed & Verified
- **Component:** [`ScrollHUD.tsx`](src/components/ScrollHUD.tsx)
- Floating telemetry pill with circular SVG scroll progress radar, section tracker, neon-lime excitation, and click-to-navigate functionality.

---

## Development & Build

```bash
# Start local development server
npm run dev

# Run TypeScript check and production build
npm run build

# Preview production build locally
npm run preview
```
