# LYFLINE Client - Landing Page

Welcome to the **LYFLINE** landing page client application. This document serves as the single source of truth for both human developers and **AI Coding Agents** to understand the domain, architecture, standards, and rules of this codebase.

---

## 📖 Project & Domain Context (For Developers & AI Agents)

**LYFLINE** is a premium, high-trust **International Medical Care Facilitator** based in Jakarta, Indonesia. 
The core mission of the platform is to make cross-border healthcare seamless, reliable, and completely transparent for patients seeking medical treatments abroad.

### Core Business Pillars:
1. **End-to-End Care Coordination**: LYFLINE handles the entire patient journey including initial specialist matching, appointment booking, travel logistics (flights, visas, hotel accommodations), home care visits, and recovery follow-ups.
2. **Zero Hidden Fees**: All pricing models are transparent. Patients only pay for the services they directly receive.
3. **Verified Global Network**: LYFLINE is partnered with over 30+ top-tier hospital systems across 7 countries (including Indonesia, India, South Korea, Malaysia, and Thailand).

---

## 🏗️ Architectural Pattern: Feature Sliced Design (FSD)

This project strictly adheres to **Feature Sliced Design (FSD)**. This is a modern, highly scalable frontend architectural standard.

### Core FSD Layers (`src/`):

*   **`src/app/`**: Global configurations, providers, sitemaps/robots SEO definitions, and the root layout styling.
*   **`src/pages/`**: Page composition layer. Sections/widgets are imported here to assemble the complete pages (e.g. `src/pages/landing`).
*   **`src/widgets/`**: Independent, self-contained sections of pages (e.g. `Header`, `HeroSection`, `ServicesSection`, `Footer`).
*   **`src/features/`**: User interactions and actions with business value (e.g. `LanguageSwitcher`, `BookAppointmentForm`).
*   **`src/entities/`**: Domain business models, typings, and data mocks (e.g. `Hospital`, `MedicalService`, `Testimonial`, `Article`).
*   **`src/shared/`**: Reusable technical primitives:
    *   `shared/ui/`: Atom-level visual components (`Button`, `Card`, `Section`, `Badge`).
    *   `shared/lib/`: Custom helpers (e.g. `cn` helper for tailwind class merging).

---

## 🚨 Critical Code Standards & constraints (For AI Agents & Humans)

To ensure this codebase remains clean, fast, and maintainable, all developers and AI coding agents must obey the following rules:

### 1. 📏 The 300-Line Componentization Rule
> [!IMPORTANT]
> **Any single `.ts`, `.tsx`, `.js`, or `.jsx` file must NOT exceed 300 lines of code.**
> If any file grows beyond **300 lines**, it is **MANDATORY** to refactor and split it. You must decompose it by:
> - Extracting smaller presentational sub-components into a nested `ui/` folder or separate sibling components.
> - Offloading state/interaction logic into dedicated React custom hooks (e.g., `use[Name].ts`).
> - Moving static mock datasets and interfaces into the `entities/` layer or separate config files.

### 2. 🎨 Color Theme & Design System (Tailwind CSS v4)
All styling must strictly use the design system color tokens defined inside `src/app/globals.css`:
- **Brand/Blue (Primary)**: `--color-primary` (`#3F71B7`)
- **Brand/Blue Dark (Hover)**: `--color-primary-hover` (`#3365AC`)
- **Brand/Blue Light (Background Tint)**: `--color-primary-light` (`#ECF1F8`)
- **Brand/Red (Accent)**: `--color-accent` (`#E02828`)
- **Dark Deep Navy/Purple**: `--color-primary-dark` (`#2E42A5`)
- **Neutral Dark**: `--color-neutral-dark` (`#000000`)
- **Neutral Light**: `--color-neutral-light` (`#ECECEC`)

Linear Gradients must map to: `linear-gradient(90deg, #3F71B7 0%, #3365AC 100%)`.

### 3. ⚡ Core Web Vitals & SEO
- **Dynamic Imports**: Always lazy load below-the-fold widgets (under the hero section) dynamically inside `src/pages/` to prevent blockages on initial page load. Ensure `ssr: true` is configured inside `dynamic()` to keep page markup visible to search engine crawlers.
- **Next.js `<Image />`**: Always use Next.js's optimized `<Image />` component instead of standard `<img>` tags for standard content images. Specify explicit `sizes` and proper aspect ratios.

---

## 🛠️ Code Validation Hooks (Husky)

This project has **Husky Git hooks** configured to ensure code quality before commits:
*   **Trigger**: Pre-commit
*   **Commands Run**: `pnpm run lint && pnpm run build`
*   **Result**: If any TypeScript typing errors, syntax lint issues, or compilation errors are found, the commit is **automatically rejected**, printing details to the developer's terminal log.

---

## 🚀 Getting Started

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `pnpm dev`: Start the dev server.
- `pnpm build`: Compile the optimized production build.
- `pnpm start`: Start the production server.
- `pnpm lint`: Validate codebase using ESLint.
