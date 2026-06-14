# LYFLINE Client - Landing Page & Web App

Welcome to the official frontend client repository for **LYFLINE**! This document serves as the absolute single source of truth for both developers and AI Coding Agents to understand the business domain, architecture, custom component library, styling conventions, and core development constraints.

---

## 📖 Domain & Business Context

**LYFLINE** is a premium, high-trust **International Medical Care Facilitator** based in Jakarta, Indonesia. The platform is designed to make cross-border healthcare seamless, reliable, and completely transparent for patients seeking medical treatments abroad.

### Core Business Pillars:
1. **End-to-End Care Coordination**: LYFLINE handles the entire patient journey including specialist matching, hospital appointments, travel logistics (flights, visas, hotels), localized medical escorts, home care visits, and post-treatment recovery follow-ups.
2. **Zero Hidden Fees**: All pricing models and consultations are transparent. Patients only pay for the medical services they directly receive.
3. **Verified Global Network**: LYFLINE is partnered with over 30+ top-tier hospital systems across 7 countries (including Indonesia, India, South Korea, Malaysia, and Thailand).

---

## 🏗️ Folder & Architecture Map

This project strictly follows a **flat, highly clean, and standard Next.js App Router structure**. Feature-Sliced Design (FSD) nesting is avoided to keep the codebase lightweight and highly readable.

```
src/
├── app/                  # Routing & Page Views
│   ├── about/            # About Us Page
│   ├── articles/         # Articles index & [id] dynamic routes
│   ├── doctors/          # Doctors filtering & search page
│   ├── partners/         # Partners directory & [id] dynamic detail routes
│   ├── services/         # Services detail accordion page
│   ├── globals.css       # Tailwind CSS v4 Global Styles
│   └── layout.tsx        # App wrapper (Font definitions & Language context)
├── components/           # Flat directory for reusable, presentational UI
│   ├── card/             # Specific card wrapper components (Doctor, Service, Testimonial, etc.)
│   ├── magicui/          # Premium background and texture components
│   ├── Badge.tsx         # Pill badges
│   ├── Button.tsx        # Styled brand buttons
│   ├── Dropdown.tsx      # Multi-select & single-select type-safe search dropdowns
│   ├── NavBar.tsx        # Global responsive header navigation
│   └── Footer.tsx        # Global responsive footer section
├── context/              # Global state providers
│   └── LanguageContext.tsx # Multi-language (EN/ID) translation support
├── data/                 # Static data declarations (Mock lists for services, doctors, articles)
└── lib/                  # Developer utilities (e.g., clsx tailwind-merge helper)
```

---

## 🚦 Navigation & Dynamic Routes

The application consists of the following user-facing routes:

| Route Path | Description | Page Content / Dynamic Behavior |
| :--- | :--- | :--- |
| `/` | Landing Page | Dynamic sections (Hero, About, Services, Partners, Why Us, Testimonials, Articles) |
| `/about` | About Us | Brand Vision, Mission, and Core Values |
| `/services` | Our Services | Interactive Accordion and deep link redirection |
| `/doctors` | Doctors Directory | Real-time name search and filter dropdowns (Region, Hospital, Specialty) |
| `/partners` | Partner Hospitals | Multi-country tab-indexed grid of accredited hospitals |
| `/partners/[id]` | Hospital Profile | Staggered image slider, contact details, dynamic maps preview, and hospital doctors list |
| `/articles` | Articles & Blog | Health and lifestyle articles |
| `/articles/[id]` | Article Content | Dynamic blog content display |

---

## 🧱 Reusable UI Component Library

To maintain DRY principles, keep standard design tokens, and enforce layout modularity, the following components are designed for high reuse:

### 1. Presentational & Utility Components

*   **`Dropdown.tsx`**: A search-enabled generic dropdown (`T extends string | string[]`) supporting single/multiple selection, custom text inputs, and type-safe state updates.
*   **`googleMapsPreview.tsx`**: A backdrop-blurred, animated maps viewer modal. It automatically parses normal maps URLs, extracts `iframe` sources, and async-resolves shortened maps URLs (`maps.app.goo.gl`) using CORS proxy resolution.
*   **`magicui/NoiseTexture.tsx`**: A hardware-accelerated, high-fidelity SVG `feTurbulence` grain overlay for premium background aesthetics.
*   **`Badge.tsx` & `Button.tsx`**: Pre-styled brand elements using core color variables, supporting state variations (disabled, hover, focus) and transitions.

### 2. Card Components (`src/components/card/`)

*   **`DoctorCard.tsx`**: Renders specialist photo, name, region, and hospital name, with a details modal trigger.
*   **`DoctorModals.tsx`**: An animated detail popover showing a doctor's qualifications, language capabilities, regional flag, and CTA appointments.
*   **`PartnerCard.tsx`**: Renders hospital details, phone and email contacts, and dynamic profile link.
*   **`ServiceCard.tsx` / `ServiceDetailCard.tsx`**: Interactive, toggleable layout wrappers for service offerings.
*   **`TestimonialCard.tsx`**: Displays verified customer reviews, quotes, and metadata.

---

## 🎨 Color Theme & Design System

Styling is built with **Tailwind CSS v4** utilizing css-variables mapped in `src/app/globals.css`.

*   **Primary (Brand Blue)**: `--color-primary` (`#3F71B7`) / Hover: `--color-primary-hover` (`#3365AC`)
*   **Light Primary (Tint BG)**: `--color-primary-light` (`#ECF1F8`)
*   **Accent (Brand Red)**: `--color-accent` (`#E02828`) / Hover: `--color-accent-hover` (`#D43030`)
*   **Neutral Dark (Text)**: `--color-neutral-dark` (`#000000`)
*   **Neutral Muted**: `--color-neutral-muted` (`#556275`)
*   **Brand Fonts**: Plus Jakarta Sans (`--font-sans`) and Poppins (`--font-poppins`)

---

## 🤖 Guidelines for AI Coding Agents & Developers (MANDATORY Rules)

If you are an AI assistant pair-programming on this repository, you **MUST** strictly obey these architectural guidelines:

### 1. 📏 The 300-Line Componentization Rule
> [!IMPORTANT]
> **Any single `.ts`, `.tsx`, `.js`, or `.jsx` file must NOT exceed 300 lines of code.**
> If a file expands beyond this limit, you must refactor it by:
> - Decomposing views into nested sub-components inside standalone files.
> - Extracting static assets and mock arrays to the `data/` layer.
> - Migrating component state handling to custom React hooks.

### 2. ⚡ Avoid `setState` inside `useEffect` (Cascading Renders)
> [!WARNING]
> Do not trigger synchronous state changes directly inside `useEffect` blocks. This triggers cascading re-renders and degrades initial paint scores.
> - **Rule**: Adjust state **directly on render** using the previous prop pattern or state initializer functions.
> - **Rule**: If state must change on layout changes, wrap the state updating logic inside timers (`setTimeout`) or asynchronous response callbacks.

### 3. 🏁 Flag Images & Filenames containing Spaces
- National flag assets are located in `/public/Flags/`.
- Next.js's Image Optimizer has a known issue parsing paths containing whitespace.
- **Rule**: When importing images with spaces (e.g., `/Flags/ID - Indonesia.svg`), you **MUST** specify the `unoptimized={true}` prop on `<Image />` tags:
  ```tsx
  <Image src="/Flags/ID - Indonesia.svg" alt="Flag" fill className="object-contain" unoptimized />
  ```

### 4. 🔀 Generic Typing in Custom Controls
- Custom controls that take value parameters (like `Dropdown`) must avoid using `any` types.
- **Rule**: Use generic arguments (e.g. `T extends string | string[]`) and map the value and onChange props safely to prevent compilation errors.

---

## 🛠️ Code Validation Hooks (Husky)

We enforce linting and compilation pre-commit hooks to ensure master branch integrity.
*   **Trigger**: Pre-commit
*   **Commands**: `pnpm run lint && pnpm run build`
*   **Result**: Any TypeScript, syntax, or compilation warnings/errors will abort the commit.

---

## 🚀 Getting Started

### Installation
Ensure you have `pnpm` installed, then run:
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts
- `pnpm dev`: Starts the Next.js development server.
- `pnpm build`: Performs TypeScript checks and builds an optimized production package.
- `pnpm start`: Runs the compiled Next.js build.
- `pnpm lint`: Validates the codebase style using ESLint.
