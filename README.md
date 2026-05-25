# Lyfline Client - Landing Page

Website landing page for Lyfline built with Next.js (App Router, SSR), TypeScript, Tailwind CSS v4, pnpm, and Framer Motion.

---

## Architectural Methodology: Feature Sliced Design (FSD)

This project is structured using the **Feature Sliced Design** architectural pattern. FSD is a modern frontend architectural standard that organizes code by its business value and responsibility.

The application codebase is organized into **Layers** inside the `src/` directory:

```
src/
├── app/          # App-wide settings, global styles, providers, and main layout
├── pages/        # Composition of sections/widgets to construct full pages
├── widgets/      # Compositional blocks/sections of pages (e.g. Hero, Footer, Services)
├── features/     # User interactions and business logic (e.g. BookAppointment)
├── entities/     # Domain business entities and models (e.g. Hospital, Article, Testimonial)
├── shared/       # Reusable technical components, helpers, and utilities (e.g. Button, cn)
```

### Layer Details:

1. **`src/app`**:
   - Contains global routing, styles (`globals.css`), root layout (`layout.tsx`), and metadata/SEO setup.
2. **`src/pages`**:
   - Page containers. For this landing page, we compose all required sections in `src/pages/landing` and lazy load below-the-fold modules dynamically to optimize Core Web Vitals while preserving indexing.
3. **`src/widgets`**:
   - Independent UI sections. Each major layout block on the landing page is a separate widget (e.g. `Header`, `HeroSection`, `PartnersSection`, `ServicesSection`, etc.).
4. **`src/features`**:
   - User actions. E.g. Booking an appointment, showing the interactive preview for video consultation.
5. **`src/entities`**:
   - Holds core business models, custom types, and data mocks for services, partners, testimonials, and articles.
6. **`src/shared`**:
   - Strictly reusable primitives.
   - `shared/ui`: Base UI components (Button, Card, Badge, Section).
   - `shared/lib`: Utility functions (e.g. `cn` helper for tailwind-merge).

---

## 🎨 Design System & Colors (Figma Spec)

The website styling conforms strictly to the Lyfline Figma Design System using native Tailwind CSS v4 custom color themes:

- **Brand/Blue (Primary)**: `#3F71B7`
- **Brand/Blue Dark (Primary Hover)**: `#3365AC`
- **Brand/Blue Light (Background Tint)**: `#ECF1F8`
- **Brand/Blue Accent**: `#4D7CBC`
- **Dark Deep Navy/Purple**: `#2E42A5`
- **Brand/Red (Primary Accent)**: `#E02828`
- **Brand/Red Dark (Primary Accent Hover)**: `#D43030`
- **High Contrast Red (Badges/Status)**: `#F50100`
- **Neutral Dark**: `#000000`
- **Neutral Light**: `#ECECEC`

Linear gradient configuration: `linear-gradient(90deg, #3F71B7 0%, #3365AC 100%)`.

---

## 🌐 Features & Optimizations

1. **Clean Navigation Header**:
   - Minimalist responsive design containing: *Home*, *About us*, *Services*, *Partners*, and *Articles*.
   - Embedded interactive **Language Switcher (EN/ID)** utilizing the custom flags asset `/icons/GB-UKM Icons.png`.
2. **Custom Service Icons**:
   - Direct integration of premium custom icon images from the design team (`MAA`, `YPHC`, `ME`, `PDM`, `TAS`, `GC` inside `/icons`) with high-contrast brightness inversion on the primary blue highlighted card.
3. **Dynamic Lazy Loading**:
   - Below-the-fold widgets (e.g. `Partners`, `Services`, `Timeline`, `Testimonials`, `Articles`) are loaded dynamically on client side while preserving Next.js SSR to ensure top-tier Google SEO crawling.
4. **Interactive Telehealth Window**:
   - High-fidelity coded active teleconsultation preview mockup featuring PIP frame, live timer, and active session controls.
5. **Floating Sticky Action Toolbar**:
   - Sticky bottom toolbar pill for quick access to Bookings and Contact forms.

---

## 🛡️ Git Hook Code Quality Control (Husky)

This project has **Husky** Git hooks configured to enforce code standards:

- **Hook**: `pre-commit`
- **Actions**: `pnpm run lint` followed by `pnpm run build`
- **Validation**: Any code containing TypeScript compile issues, syntax bugs, or styling rule violations will automatically fail and print detailed error logs, rejecting the Git commit until corrected.

---

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `pnpm dev`: Start the dev server.
- `pnpm build`: Create the production build.
- `pnpm start`: Start the production server.
- `pnpm lint`: Lint the codebase using ESLint.
