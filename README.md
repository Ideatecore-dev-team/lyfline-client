# LYFLINE Client - Landing Page

Welcome to the **LYFLINE** client application. This document serves as the single source of truth for both human developers and **AI Coding Agents** to understand the domain, directory architecture, coding standards, and project constraints of this codebase.

---

## 📖 Project & Domain Context (For Developers & AI Agents)

**LYFLINE** is a premium, high-trust **International Medical Care Facilitator** based in Jakarta, Indonesia. 
The core mission of the platform is to make cross-border healthcare seamless, reliable, and completely transparent for patients seeking medical treatments abroad.

### Core Business Pillars:
1. **End-to-End Care Coordination**: LYFLINE handles the entire patient journey including initial specialist matching, appointment booking, travel logistics (flights, visas, hotel accommodations), home care visits, and recovery follow-ups.
2. **Zero Hidden Fees**: All pricing models are transparent. Patients only pay for the services they directly receive.
3. **Verified Global Network**: LYFLINE is partnered with over 30+ top-tier hospital systems across 7 countries (including Indonesia, India, South Korea, Malaysia, and Thailand).

---

## 🏗️ Simplified Flat Codebase Architecture

This project strictly follows a **flat, highly clean, and standard Next.js directory structure**. We deliberately removed the complex folder nesting of Feature-Sliced Design (FSD) to keep the project completely lightweight, intuitive, and extremely easy to read.

### Directory Structure Map (`src/`):

*   **`src/app/`**: Root routing layer. Contains layout providers (`layout.tsx`), main entry points (`page.tsx`), global themes/styles (`globals.css`), and dedicated subpage routes (e.g. `/services`, `/partners`, `/articles`).
*   **`src/components/`**: Centralized, flat directory containing reusable presentational UI elements:
    - `Badge.tsx`: Pill highlight elements.
    - `Button.tsx`: Highly styled primary, secondary, and outline interactive triggers.
    - `Card.tsx`: Glassmorphic, outline, flat, or shadow structural cards.
    - `Section.tsx`: Core wrapper containing standardized section margins, backgrounds, subtitles, and headings.
    - `NoiseOverlay.tsx`: Reusable premium SVG noise texture backdrop.
    - `StatCard.tsx`: Reusable motion-animated card displaying metrics.
    - `HospitalPartnerCard.tsx`: Reusable motion-animated global partner logo card.
*   **`src/sections/`**: Centralized, flat directory containing all main page sections (e.g. `Header.tsx`, `HeroSection.tsx`, `AboutUsSection.tsx`, `Footer.tsx`). There is **zero nesting** (no internal `/ui` subfolders).
*   **`src/context/`**: React contexts providing global client-side state synchronization (e.g. `LanguageContext.tsx` for real-time translation).
*   **`src/data/`**: Source of truth mock datasets and typings (e.g. `mockData.ts` holding `HOSPITALS` and `SERVICES` lists).
*   **`src/lib/`**: Simple technical helpers (e.g. `utils.ts` defining the Tailwind `cn` class merger).

---

## 🧱 Reusable Component Library & Usage Guide

We have extracted several highly custom, reusable UI elements from the About page sections to maintain modularity, standard design tokens, and dry coding principles:

### 1. `NoiseOverlay.tsx`
A hardware-accelerated, custom SVG `feTurbulence` noise texture that renders a subtle visual grain texture overlay. It is used on components like `AboutServices` and `VisionMission` sections.

**Props API**:

| Prop | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `opacity` | `number` | No | `0.06` | Controls the density and visibility of the noise grain texture backdrop. |
| `className` | `string` | No | `-` | Additional Tailwind CSS classes (e.g. custom z-index or positions). |

**Usage Example**:
```tsx
import { NoiseOverlay } from "@/components/NoiseOverlay";

const CustomCard = () => (
  <div className="relative bg-primary text-white rounded-3xl p-8 overflow-hidden">
    <NoiseOverlay opacity={0.12} />
    <h2 className="relative z-10">Premium Content with Noise</h2>
  </div>
);
```

### 2. `StatCard.tsx`
A fully animated `framer-motion` card used to display statistics or metrics. It handles layout entry animations, customized delay transitions, and hover-triggered elevation lifts.

**Props API**:

| Prop | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `value` | `string` | **Yes** | - | The main numeric statistic value to highlight (e.g., `30+`, `95%`). |
| `label` | `string` | **Yes** | - | The descriptive label text positioned underneath the stat value. |
| `valueClassName` | `string` | No | `-` | Optional styling overrides for the statistic value text. |
| `labelClassName` | `string` | No | `-` | Optional styling overrides for the label text. |
| `delay` | `number` | No | `0` | Animation delay in seconds for staggered framer-motion entries. |
| `className` | `string` | No | `-` | Card style variations (e.g. backgrounds, custom border styles). |

**Usage Example**:
```tsx
import { StatCard } from "@/components/StatCard";

const Grid = () => (
  <div className="grid grid-cols-2 gap-4">
    <StatCard
      value="30+"
      label="Hospitals Partners"
      className="bg-accent text-white"
      delay={0.1}
    />
    <StatCard
      value="7"
      label="Countries"
      className="bg-white text-neutral-dark border border-slate-100"
      valueClassName="text-primary"
      delay={0.2}
    />
  </div>
);
```

### 3. `HospitalPartnerCard.tsx`
A pre-styled, animatable, and fully-typed `framer-motion` card displaying partner logos along with centered national flag indicators. Extends `HTMLMotionProps<"div">` for seamless integration into list containers utilizing staggered animation variants.

**Props API**:

| Prop | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `name` | `string` | **Yes** | - | Official name of the partner hospital (used for image alt tags). |
| `logo` | `string` | **Yes** | - | Asset path pointing to the clean hospital logo image. |
| `country` | `string` | **Yes** | - | Name of the country where the hospital is located. |
| `flag` | `string` | **Yes** | - | Asset path pointing to the country's national flag icon. |
| `className` | `string` | No | `-` | Custom wrapper styles or layout modifiers. |

**Usage Example**:
```tsx
import { HospitalPartnerCard } from "@/components/HospitalPartnerCard";

const Partners = () => (
  <HospitalPartnerCard
    name="Gleneagles Singapore"
    logo="/logos/gleneagles.png"
    country="Singapore"
    flag="/Flags/SG icon.png"
  />
);
```

---

## 🤖 Guidelines for Future AI Coding Agents (MANDATORY Rules)

If you are an AI assistant pair-programming with the user or making automated changes to this codebase, you **MUST** strictly obey the following architectural rules:

### 1. 📏 The 300-Line Componentization Rule
> [!IMPORTANT]
> **Any single `.ts`, `.tsx`, `.js`, or `.jsx` file must NOT exceed 300 lines of code.**
> If any file grows beyond **300 lines**, it is **MANDATORY** to refactor and split it. You must decompose it by:
> - Extracting smaller presentational sub-components into standalone sibling files.
> - Offloading state/interaction logic into dedicated React custom hooks (e.g., `use[Name].ts`).
> - Moving static mock datasets and interfaces into the `data/` layer or separate config files.

### 2. 📂 How to Add a New Page Route (Folder-Based Routing)
Next.js utilizes **App Router** folder-based routing. To create a new page `/routeName`:
1. Create a folder: `src/app/routeName/`
2. Create an entry file inside it: `page.tsx`
3. Wrap the content with standard `<Header />` and `<Footer />` components. The root `layout.tsx` wraps the rendering tree in `LanguageProvider` automatically, so your new page will instantly inherit real-time language translations.
4. **Never create a `src/pages` folder**. Keep it strictly inside `src/app/`.

### 3. 🏁 Handling Flags & Space Characters in Paths
- All national country flag images are located in the dedicated **`/public/Flags/`** folder (e.g. `/Flags/GB-UKM icon.png`).
- Some filenames contain space characters due to Figma export specifications. 
- **CRITICAL**: Because Next.js's Image Optimizer has a known bug resolving local asset paths that contain space characters, you **MUST** pass the `unoptimized={true}` prop to the `<Image />` component when loading flags (or any asset containing spaces):
  ```tsx
  <Image
    src="/Flags/GB-UKM icon.png"
    alt="Flag"
    width={22}
    height={15}
    unoptimized
  />
  ```

### 4. 🎨 Color Theme & Design System (Tailwind CSS v4)
All styling must strictly use the design system color tokens defined inside `src/app/globals.css`:
- **Brand/Blue (Primary)**: `--color-primary` (`#3F71B7`)
- **Brand/Blue Dark (Hover)**: `--color-primary-hover` (`#3365AC`)
- **Brand/Blue Light (Background Tint)**: `--color-primary-light` (`#ECF1F8`)
- **Brand/Red (Accent)**: `--color-accent` (`#E02828`)
- **Dark Deep Navy/Purple**: `--color-primary-dark` (`#2E42A5`)
- **Neutral Dark**: `--color-neutral-dark` (`#000000`)
- **Neutral Light**: `--color-neutral-light` (`#ECECEC`)

Linear Gradients must map to: `linear-gradient(90deg, #3F71B7 0%, #3365AC 100%)`.

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
