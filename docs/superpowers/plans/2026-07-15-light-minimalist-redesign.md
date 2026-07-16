# Rediseño Minimalista Claro — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-theme the BlackbearLab landing page from the dark "terminal" palette to the approved
light minimalist palette, add real (stock, placeholder) photography to the main sections, and
correct all site copy that incorrectly described hardware repair services BlackbearLab does not
offer.

**Architecture:** No structural/framework changes. All work is within the existing Vite + React +
TypeScript + Tailwind v4 component tree (`src/components/*.tsx`, one file per section). Color
changes are driven almost entirely by rewriting the `@theme` token block in `src/index.css` —
most components already reference semantic tokens (`bg-bg`, `text-foreground`, `border-border`)
rather than raw hex values, so they repaint automatically. The only JSX edits needed are (a)
swapping hardcoded `accent`-colored buttons/eyebrows to the new neutral treatment, (b) new
photography, and (c) corrected copy.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4 (`@theme` CSS-first config), Vitest,
React Testing Library, lucide-react icons.

## Global Constraints

- Design tokens, photography plan, and all corrected copy must match
  `docs/superpowers/specs/2026-07-15-light-minimalist-redesign-design.md` exactly.
- Typography stays unchanged: Oswald (display/headings) + JetBrains Mono (data/labels) + Inter
  (body/sans) — do not touch `--font-*` tokens.
- The accent color (`#2ee6b0`) is never used as a large/dominant fill (no accent buttons, no
  accent eyebrow labels). It is reserved for small, isolated details: list checkmarks (`✓`), the
  DentalCore price, the "Fundador — BlackbearLab" line, and link hover states.
- No hardware-repair language anywhere in the site (copy, alt text, or images). BlackbearLab
  offers software installation/optimization/support only.
- Stock photos are placeholders: each `<img>` needs a real, descriptive (non-generic) `alt`
  attribute, and every new photo file must be tracked in `src/assets/stock/`.
- Follow the existing TDD pattern used throughout this codebase: for any change that alters
  user-visible content or structure (copy the tests actually assert on, new images), update/add
  the test first, watch it fail for the right reason, then implement.
- Run `npm run test` after every task; all tests must stay green before moving to the next task.

---

### Task 1: Download stock photography assets

**Files:**
- Create: `src/assets/stock/hero.jpg`
- Create: `src/assets/stock/servicios-software.jpg`
- Create: `src/assets/stock/servicios-soporte.jpg`
- Create: `src/assets/stock/dentalcore.jpg`
- Create: `src/assets/stock/servicio-tecnico.jpg`
- Create: `src/assets/stock/sobre-obed.jpg`

**Interfaces:**
- Consumes: nothing
- Produces: six local `.jpg` files that later tasks `import` directly from their component files
  (Vite resolves these as bundled asset URLs, same pattern already used for
  `src/assets/brand/logo.jpeg`)

All six are verified free-to-use (standard Unsplash License, not Unsplash+) as of 2026-07-15.

- [ ] **Step 1: Create the stock assets directory and download each photo**

```bash
mkdir -p src/assets/stock

curl -L "https://images.unsplash.com/photo-1758612214882-03f8a1d7211f?w=1200&q=80&auto=format&fit=crop" -o src/assets/stock/hero.jpg
curl -L "https://images.unsplash.com/photo-1754039984985-ef607d80113a?w=800&q=80&auto=format&fit=crop" -o src/assets/stock/servicios-software.jpg
curl -L "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80&auto=format&fit=crop" -o src/assets/stock/servicios-soporte.jpg
curl -L "https://images.unsplash.com/photo-1643660526741-094639fbe53a?w=1200&q=80&auto=format&fit=crop" -o src/assets/stock/dentalcore.jpg
curl -L "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&q=80&auto=format&fit=crop" -o src/assets/stock/servicio-tecnico.jpg
curl -L "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80&auto=format&fit=crop" -o src/assets/stock/sobre-obed.jpg
```

- [ ] **Step 2: Verify all six files downloaded and are real JPEGs (non-zero size, correct file type)**

Run: `file src/assets/stock/*.jpg && ls -la src/assets/stock/`
Expected: each line reports `JPEG image data`, and no file is 0 bytes. If any request was
rate-limited or returned an HTML error page instead of an image, `file` will report something
other than JPEG for that entry — re-run the corresponding `curl` command for that file only.

- [ ] **Step 3: Commit**

```bash
git add src/assets/stock/
git commit -m "Add placeholder stock photography for light redesign"
```

---

### Task 2: Rewrite design tokens for the light theme

**Files:**
- Modify: `src/index.css` (entire `@theme` block and `html { color-scheme }`)

**Interfaces:**
- Consumes: nothing
- Produces: the same CSS custom property names as before (`--color-bg`, `--color-surface`,
  `--color-surface-raised`, `--color-border`, `--color-border-strong`, `--color-foreground`,
  `--color-muted`, `--color-steel`, `--color-steel-dim`, `--color-accent`, `--color-accent-dim`,
  `--color-on-accent`, `--color-danger`) with new values — every component task below depends on
  these names staying the same so `bg-bg`, `text-foreground`, etc. keep resolving.

This is a pure styling change with no component-test coverage (the test suite never asserts on
color values — confirmed by reading every existing `*.test.tsx` file in this repo). There is no
meaningful failing test to write first; instead, this task's correctness gate is "the full
existing test suite still passes" (regression check) plus the final manual/browser check in
Task 12.

- [ ] **Step 1: Replace the color tokens and `color-scheme`**

Replace the `@theme` block and the `html` rule inside `@layer base` in `src/index.css`:

```css
@theme {
  /* Fonts */
  --font-display: 'Oswald', 'Arial Narrow', sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'Courier New', monospace;

  /* Surfaces */
  --color-bg: #fafafa;
  --color-surface: #ffffff;
  --color-surface-raised: #f4f4f5;
  --color-border: #e4e4e7;
  --color-border-strong: #d4d4d8;

  /* Text */
  --color-foreground: #18181b;
  --color-muted: #71717a;

  /* Metallic accent (echoes the logo's silver badge) */
  --color-steel: #52525b;
  --color-steel-dim: #a1a1aa;

  /* Single accent color — used only for small, isolated details */
  --color-accent: #2ee6b0;
  --color-accent-dim: #1f8f6c;
  --color-on-accent: #05130e;

  /* Status */
  --color-danger: #ef4444;
}
```

```css
  html {
    color-scheme: light;
    scroll-behavior: smooth;
  }
```

(Everything else in `src/index.css` — `body`, `h1,h2,h3,h4`, `:focus-visible`, the
`prefers-reduced-motion` block — stays exactly as-is.)

- [ ] **Step 2: Run the full test suite to confirm no regressions**

Run: `npm run test`
Expected: all currently-passing tests still pass (color changes are invisible to jsdom/RTL, so
this should be a clean pass with no changes to test files).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "Switch design tokens from dark terminal theme to light minimalist theme"
```

---

### Task 3: Update `index.html` metadata for the light theme and corrected copy

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: nothing
- Produces: nothing consumed by other tasks (static HTML head only)

No test coverage exists for `index.html` (it's outside the component tree). Direct edit, verified
manually in Task 12.

- [ ] **Step 1: Update title, description, theme-color, and Open Graph tags**

In `index.html`, replace:

```html
    <title>BlackbearLab — Desarrollo de software y reparación de computadoras en Honduras</title>
    <meta
      name="description"
      content="BlackbearLab: desarrollo de software a la medida (como DentalCore, sistema de gestión para clínicas dentales) y reparación, mantenimiento y actualización de hardware de computadoras en Honduras."
    />
    <meta name="theme-color" content="#0a0a0b" />
    <meta property="og:title" content="BlackbearLab — Software & Hardware" />
    <meta
      property="og:description"
      content="Desarrollo de software a la medida y reparación de computadoras en Honduras."
    />
```

with:

```html
    <title>BlackbearLab — Desarrollo de software y soporte técnico de computadoras en Honduras</title>
    <meta
      name="description"
      content="BlackbearLab: desarrollo de software a la medida (como DentalCore, sistema de gestión para clínicas dentales) y soporte técnico, optimización y mantenimiento de computadoras en Honduras."
    />
    <meta name="theme-color" content="#fafafa" />
    <meta property="og:title" content="BlackbearLab — Software y soporte técnico" />
    <meta
      property="og:description"
      content="Desarrollo de software a la medida y soporte técnico de computadoras en Honduras."
    />
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "Update page metadata: light theme-color and corrected service description"
```

---

### Task 4: Recolor Header's WhatsApp button

**Files:**
- Modify: `src/components/Header.tsx:50-58`

**Interfaces:**
- Consumes: `buildWhatsAppLink` from `src/lib/constants.ts` (unchanged)
- Produces: nothing new — same `Header` default export, same rendered structure/roles/hrefs
  `Header.test.tsx` already asserts on

Pure style change (accent → solid neutral button). No test asserts on class names or colors, so
this is a direct edit verified by the existing `Header.test.tsx` suite staying green.

- [ ] **Step 1: Replace the WhatsApp link's className**

In `src/components/Header.tsx`, replace:

```tsx
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-accent px-3 py-2 font-mono text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-on-accent"
          >
```

with:

```tsx
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-foreground px-3 py-2 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
```

- [ ] **Step 2: Run Header tests to confirm no regression**

Run: `npx vitest run src/components/Header.test.tsx`
Expected: all 4 existing tests still PASS (they check href/target/rel/role, not classes).

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "Recolor Header WhatsApp CTA to solid neutral button"
```

---

### Task 5: Rewrite Hero — remove terminal motif, split photo layout, corrected copy

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `src/assets/stock/hero.jpg` (from Task 1), `buildWhatsAppLink`/`SECTION_IDS` from
  `src/lib/constants.ts` (unchanged)
- Produces: same `Hero` default export; still renders exactly one `<h1>`, a WhatsApp link, and a
  link to `#servicios` (existing test contract), plus one `<img>` (new)

- [ ] **Step 1: Add a failing test for the new photo**

Add this test to `src/components/Hero.test.tsx` (inside the existing `describe('Hero', ...)`
block, after the last `it`):

```tsx
  it('renders a photo with descriptive alt text', () => {
    render(<Hero />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/))
  })
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Hero.test.tsx`
Expected: FAIL — `Unable to find role="img"` (Hero has no `<img>` yet).

- [ ] **Step 3: Rewrite `src/components/Hero.tsx`**

Replace the entire file:

```tsx
import { ArrowRight, MessageCircle } from 'lucide-react'
import heroPhoto from '../assets/stock/hero.jpg'
import { SECTION_IDS, buildWhatsAppLink } from '../lib/constants'

function Hero() {
  return (
    <section
      id="top"
      className="border-b border-border bg-bg px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
            Software a la medida y optimización de tu computadora, en un
            solo lugar
          </h1>

          <p className="max-w-xl font-mono text-base text-muted sm:text-lg">
            Desarrollamos sistemas a medida como DentalCore y damos soporte
            técnico: instalación, optimización y mantenimiento. Trato
            directo, local, en Honduras.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-foreground px-6 py-3 font-mono text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
            <a
              href={`#${SECTION_IDS.servicios}`}
              className="inline-flex items-center justify-center gap-2 rounded border border-border-strong px-6 py-3 font-mono text-sm font-semibold text-foreground transition-colors hover:border-foreground"
            >
              Ver servicios
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <img
          src={heroPhoto}
          alt="Persona escribiendo en el teclado de una laptop"
          className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
        />
      </div>
    </section>
  )
}

export default Hero
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/Hero.test.tsx`
Expected: PASS — all 4 tests (h1, WhatsApp CTA, secondary CTA, photo).

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "Redesign Hero: light theme, split photo layout, corrected copy"
```

---

### Task 6: Correct Servicios copy (remove hardware repair) and add photos

**Files:**
- Modify: `src/components/Servicios.tsx`
- Modify: `src/components/Servicios.test.tsx`

**Interfaces:**
- Consumes: `src/assets/stock/servicios-software.jpg`, `src/assets/stock/servicios-soporte.jpg`
  (from Task 1), `SECTION_IDS.servicios` (unchanged)
- Produces: same `Servicios` default export; software items unchanged; hardware column renamed to
  "Soporte técnico" with corrected items; two new `<img>` elements

- [ ] **Step 1: Rewrite `src/components/Servicios.test.tsx` with the corrected expectations**

Replace the entire file:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Servicios from './Servicios'

describe('Servicios', () => {
  it('renders a section with id="servicios"', () => {
    const { container } = render(<Servicios />)
    expect(container.querySelector('#servicios')).toBeInTheDocument()
  })

  it('lists the software development services', () => {
    render(<Servicios />)
    expect(screen.getByText(/desarrollo a la medida/i)).toBeInTheDocument()
    expect(screen.getByText(/sitios web/i)).toBeInTheDocument()
  })

  it('lists the technical support services', () => {
    render(<Servicios />)
    expect(screen.getByText(/diagn[oó]stico/i)).toBeInTheDocument()
    expect(
      screen.getByText(/instalaci[oó]n de sistema operativo/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/optimizaci[oó]n del sistema/i)).toBeInTheDocument()
    expect(
      screen.getByText(/actualizaci[oó]n de almacenamiento/i),
    ).toBeInTheDocument()
  })

  it('does not mention hardware repair services BlackbearLab does not offer', () => {
    render(<Servicios />)
    expect(screen.queryByText(/cambio de ram/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/formateo/i)).not.toBeInTheDocument()
  })

  it('renders a photo for each service column with descriptive alt text', () => {
    render(<Servicios />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt', expect.stringMatching(/.+/))
    })
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Servicios.test.tsx`
Expected: FAIL — the "technical support" and "photo" tests fail against the current component
(still has "Cambio de RAM y disco duro / SSD", "Formateo...", and no `<img>`).

- [ ] **Step 3: Rewrite `src/components/Servicios.tsx`**

Replace the entire file:

```tsx
import { Code2, Wrench } from 'lucide-react'
import servicesSoftwarePhoto from '../assets/stock/servicios-software.jpg'
import servicesSupportPhoto from '../assets/stock/servicios-soporte.jpg'
import { SECTION_IDS } from '../lib/constants'

const SOFTWARE_ITEMS = [
  'Desarrollo a la medida de sistemas de gestión',
  'Sitios web y landing pages',
  'Mantenimiento y soporte de software existente',
]

const SUPPORT_ITEMS = [
  'Diagnóstico completo del equipo',
  'Instalación de sistema operativo',
  'Optimización del sistema',
  'Actualización de almacenamiento',
]

function Servicios() {
  return (
    <section
      id={SECTION_IDS.servicios}
      className="border-b border-border bg-bg px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm text-muted">02 // SERVICIOS</p>
        <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">
          Todo lo que tu equipo y tu negocio necesitan
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="overflow-hidden rounded border border-border bg-surface">
            <img
              src={servicesSoftwarePhoto}
              alt="Código fuente en la pantalla de una computadora"
              className="h-40 w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3">
                <Code2 className="h-6 w-6 text-foreground" aria-hidden="true" />
                <h3 className="text-xl text-foreground">Software</h3>
              </div>
              <ul className="mt-6 space-y-3 font-mono text-sm text-muted">
                {SOFTWARE_ITEMS.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="overflow-hidden rounded border border-border bg-surface">
            <img
              src={servicesSupportPhoto}
              alt="Laptop cerrada sobre un escritorio"
              className="h-40 w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3">
                <Wrench className="h-6 w-6 text-foreground" aria-hidden="true" />
                <h3 className="text-xl text-foreground">Soporte técnico</h3>
              </div>
              <ul className="mt-6 space-y-3 font-mono text-sm text-muted">
                {SUPPORT_ITEMS.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Servicios
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/Servicios.test.tsx`
Expected: PASS — all 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/Servicios.tsx src/components/Servicios.test.tsx
git commit -m "Correct Servicios copy to software support (not hardware repair) and add photos"
```

---

### Task 7: Add photo to DentalCore

**Files:**
- Modify: `src/components/DentalCore.tsx`
- Modify: `src/components/DentalCore.test.tsx`

**Interfaces:**
- Consumes: `src/assets/stock/dentalcore.jpg` (from Task 1)
- Produces: same `DentalCore` default export; all existing content (price, roles, "sin internet")
  unchanged; one new `<img>`

- [ ] **Step 1: Add a failing test for the new photo**

Add this test to `src/components/DentalCore.test.tsx` (inside the existing `describe`, after the
last `it`):

```tsx
  it('renders an illustrative photo with descriptive alt text', () => {
    render(<DentalCore />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/))
  })
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/DentalCore.test.tsx`
Expected: FAIL — `Unable to find role="img"`.

- [ ] **Step 3: Rewrite `src/components/DentalCore.tsx`**

Replace the entire file:

```tsx
import { ShieldCheck, User, Users, WifiOff } from 'lucide-react'
import dentalCorePhoto from '../assets/stock/dentalcore.jpg'
import { SECTION_IDS } from '../lib/constants'

const ROLES = [
  { icon: ShieldCheck, label: 'Admin' },
  { icon: User, label: 'Dentista' },
  { icon: Users, label: 'Recepción' },
]

function DentalCore() {
  return (
    <section
      id={SECTION_IDS.dentalcore}
      className="border-b border-border bg-surface px-4 py-20 sm:px-6"
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-sm text-muted">03 // CASO DESTACADO</p>
          <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">
            DentalCore
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-base text-muted">
            Sistema de gestión para clínicas dentales: pacientes, citas,
            expedientes e historial de tratamientos, todo en un solo lugar.
          </p>

          <div className="mt-10 grid gap-8 rounded border border-border bg-bg p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <p className="font-mono text-xs text-muted">LICENCIA ÚNICA</p>
              <p className="mt-2 font-display text-3xl text-accent sm:text-4xl">
                $200 – $450 USD
              </p>

              <div className="mt-6 flex items-center gap-2 font-mono text-sm text-foreground">
                <WifiOff className="h-4 w-4 text-steel" aria-hidden="true" />
                Funciona sin internet
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-muted">ROLES DEL SISTEMA</p>
              <ul className="mt-4 space-y-3">
                {ROLES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 font-mono text-sm text-foreground"
                  >
                    <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <img
          src={dentalCorePhoto}
          alt="Consultorio dental con silla de atención"
          className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
        />
      </div>
    </section>
  )
}

export default DentalCore
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/DentalCore.test.tsx`
Expected: PASS — all 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/DentalCore.tsx src/components/DentalCore.test.tsx
git commit -m "Add illustrative photo to DentalCore section"
```

---

### Task 8: Rename Reparacion → ServicioTecnico with corrected 7-item checklist

**Files:**
- Create: `src/components/ServicioTecnico.tsx`
- Create: `src/components/ServicioTecnico.test.tsx`
- Delete: `src/components/Reparacion.tsx`
- Delete: `src/components/Reparacion.test.tsx`
- Modify: `src/lib/constants.ts:10-16`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx:15`

**Interfaces:**
- Consumes: `src/assets/stock/servicio-tecnico.jpg` (from Task 1), new
  `SECTION_IDS.servicioTecnico` constant (defined in Step 1 of this task)
- Produces: `ServicioTecnico` default export (replaces `Reparacion`), rendered section id
  `servicio-tecnico` (replaces `reparacion`) — `App.tsx` and `App.test.tsx` depend on both of
  these names/ids changing together in this task

- [ ] **Step 1: Rename the section id in `src/lib/constants.ts`**

Replace:

```ts
export const SECTION_IDS = {
  servicios: 'servicios',
  dentalcore: 'dentalcore',
  reparacion: 'reparacion',
  nosotros: 'nosotros',
  contacto: 'contacto',
} as const
```

with:

```ts
export const SECTION_IDS = {
  servicios: 'servicios',
  dentalcore: 'dentalcore',
  servicioTecnico: 'servicio-tecnico',
  nosotros: 'nosotros',
  contacto: 'contacto',
} as const
```

- [ ] **Step 2: Update the failing App-level test**

In `src/App.test.tsx`, replace:

```tsx
    expect(container.querySelector('#reparacion')).toBeInTheDocument()
```

with:

```tsx
    expect(container.querySelector('#servicio-tecnico')).toBeInTheDocument()
```

- [ ] **Step 3: Write the new `src/components/ServicioTecnico.test.tsx`**

Create this file (do not modify `Reparacion.test.tsx` — it will be deleted in Step 6):

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ServicioTecnico from './ServicioTecnico'

describe('ServicioTecnico', () => {
  it('renders a section with id="servicio-tecnico"', () => {
    const { container } = render(<ServicioTecnico />)
    expect(container.querySelector('#servicio-tecnico')).toBeInTheDocument()
  })

  it('renders a terminal-style checklist of the full software support offering', () => {
    render(<ServicioTecnico />)
    expect(screen.getByText(/diagn[oó]stico/i)).toBeInTheDocument()
    expect(
      screen.getByText(/instalaci[oó]n de sistema operativo/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/instalaci[oó]n de office/i)).toBeInTheDocument()
    expect(screen.getByText(/optimizaci[oó]n del sistema/i)).toBeInTheDocument()
    expect(
      screen.getByText(/actualizaci[oó]n de almacenamiento/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/cambio de bater[ií]a/i)).toBeInTheDocument()
    expect(screen.getByText(/recuperaci[oó]n de archivos/i)).toBeInTheDocument()
  })

  it('does not mention hardware repair BlackbearLab does not offer', () => {
    render(<ServicioTecnico />)
    expect(screen.queryByText(/cambio de ram/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/disco duro/i)).not.toBeInTheDocument()
  })

  it('mentions a free quote instead of a fixed price', () => {
    render(<ServicioTecnico />)
    expect(screen.getByText(/cotizaci[oó]n gratis/i)).toBeInTheDocument()
  })

  it('renders a photo with descriptive alt text', () => {
    render(<ServicioTecnico />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/))
  })
})
```

- [ ] **Step 4: Run the new test to verify it fails**

Run: `npx vitest run src/components/ServicioTecnico.test.tsx`
Expected: FAIL — `Failed to resolve import "./ServicioTecnico"` (component doesn't exist yet).

- [ ] **Step 5: Create `src/components/ServicioTecnico.tsx`**

```tsx
import { SECTION_IDS } from '../lib/constants'
import servicioTecnicoPhoto from '../assets/stock/servicio-tecnico.jpg'

const CHECKLIST = [
  'Diagnóstico completo del equipo',
  'Instalación de sistema operativo',
  'Instalación de Office',
  'Optimización del sistema',
  'Actualización de almacenamiento',
  'Cambio de batería',
  'Recuperación de archivos',
]

function ServicioTecnico() {
  return (
    <section
      id={SECTION_IDS.servicioTecnico}
      className="border-b border-border bg-bg px-4 py-20 sm:px-6"
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-sm text-muted">04 // SOPORTE</p>
          <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">
            Servicio técnico
          </h2>

          <div className="mt-8 rounded border border-border-strong bg-surface p-6 font-mono text-sm sm:p-8">
            <p className="text-muted">
              <span className="text-accent">$</span> ./run_diagnostics.sh
            </p>
            <ul className="mt-4 space-y-2">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex gap-2 text-foreground">
                  <span className="text-accent" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-4 text-steel">
              PRECIO: cotización gratis, según equipo.
            </p>
          </div>
        </div>

        <img
          src={servicioTecnicoPhoto}
          alt="Laptop plateada cerrada sobre una mesa blanca"
          className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
        />
      </div>
    </section>
  )
}

export default ServicioTecnico
```

- [ ] **Step 6: Delete the old `Reparacion` files**

```bash
rm src/components/Reparacion.tsx src/components/Reparacion.test.tsx
```

- [ ] **Step 7: Update `src/App.tsx` to import `ServicioTecnico`**

Replace:

```tsx
import DentalCore from './components/DentalCore'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PorQue from './components/PorQue'
import Reparacion from './components/Reparacion'
import Servicios from './components/Servicios'
import SobreObed from './components/SobreObed'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <DentalCore />
        <Reparacion />
        <PorQue />
        <SobreObed />
      </main>
      <Footer />
    </>
  )
}

export default App
```

with:

```tsx
import DentalCore from './components/DentalCore'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PorQue from './components/PorQue'
import ServicioTecnico from './components/ServicioTecnico'
import Servicios from './components/Servicios'
import SobreObed from './components/SobreObed'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <DentalCore />
        <ServicioTecnico />
        <PorQue />
        <SobreObed />
      </main>
      <Footer />
    </>
  )
}

export default App
```

- [ ] **Step 8: Run the full suite to verify everything passes**

Run: `npm run test`
Expected: PASS — `ServicioTecnico.test.tsx` (5 tests) and `App.test.tsx` (2 tests) both green,
no leftover references to `Reparacion` anywhere (search with
`grep -r "Reparacion" src/` to confirm zero matches).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Rename Reparacion to ServicioTecnico with corrected software-only checklist"
```

---

### Task 9: Correct PorQue copy (two reasons mention hardware)

**Files:**
- Modify: `src/components/PorQue.tsx`

**Interfaces:**
- Consumes: nothing new
- Produces: same `PorQue` default export; headings ("Todo en un lugar", "Trato directo y local",
  "Soporte post-venta") unchanged — `PorQue.test.tsx` only asserts on headings, not descriptions,
  so no test file changes are needed for this task (verified by reading `PorQue.test.tsx`: it
  never asserts the word "hardware" or the description bodies)

- [ ] **Step 1: Rewrite `src/components/PorQue.tsx`**

Replace the entire file:

```tsx
import { Handshake, Layers, LifeBuoy } from 'lucide-react'

const REASONS = [
  {
    icon: Layers,
    title: 'Todo en un lugar',
    description:
      'Desarrollo de software y soporte técnico para tu computadora, sin intermediarios.',
  },
  {
    icon: Handshake,
    title: 'Trato directo y local',
    description:
      'Hablás directamente con quien desarrolla y da soporte, sin call centers.',
  },
  {
    icon: LifeBuoy,
    title: 'Soporte post-venta',
    description:
      'Acompañamiento después de la entrega, tanto en software como en el soporte técnico brindado.',
  },
]

function PorQue() {
  return (
    <section className="border-b border-border bg-surface px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm text-muted">05 // VENTAJAS</p>
        <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">
          Por qué BlackbearLab
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded border border-border bg-bg p-6">
              <Icon className="h-6 w-6 text-foreground" aria-hidden="true" />
              <h3 className="mt-4 text-lg text-foreground">{title}</h3>
              <p className="mt-2 font-mono text-sm text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PorQue
```

- [ ] **Step 2: Run the tests to confirm no regression**

Run: `npx vitest run src/components/PorQue.test.tsx`
Expected: PASS — both existing tests still pass unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/components/PorQue.tsx
git commit -m "Correct PorQue copy: remove hardware repair references"
```

---

### Task 10: Correct SobreObed bio and add photo

**Files:**
- Modify: `src/components/SobreObed.tsx`
- Modify: `src/components/SobreObed.test.tsx`

**Interfaces:**
- Consumes: `src/assets/stock/sobre-obed.jpg` (from Task 1)
- Produces: same `SobreObed` default export; existing name/role/location text unchanged; bio
  sentence corrected; one new `<img>`

- [ ] **Step 1: Add a failing test for the new photo**

Add this test to `src/components/SobreObed.test.tsx` (inside the existing `describe`, after the
last `it`):

```tsx
  it('renders a photo with descriptive alt text', () => {
    render(<SobreObed />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/))
  })
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/SobreObed.test.tsx`
Expected: FAIL — `Unable to find role="img"`.

- [ ] **Step 3: Rewrite `src/components/SobreObed.tsx`**

Replace the entire file:

```tsx
import { SECTION_IDS } from '../lib/constants'
import obedPhoto from '../assets/stock/sobre-obed.jpg'

function SobreObed() {
  return (
    <section
      id={SECTION_IDS.nosotros}
      className="border-b border-border bg-bg px-4 py-20 sm:px-6"
    >
      <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-sm text-muted">06 // NOSOTROS</p>
          <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">
            Sobre Obed
          </h2>

          <div className="mt-8 rounded border border-border bg-surface p-6 sm:p-8">
            <p className="font-display text-xl tracking-wide text-foreground">
              Ing. Obed Avila
            </p>
            <p className="mt-1 font-mono text-sm text-accent">
              Fundador — BlackbearLab
            </p>
            <p className="mt-4 max-w-xl font-mono text-sm text-muted">
              Desarrollador independiente basado en Honduras, dedicado a
              construir software a la medida y a mantener las computadoras
              de sus clientes funcionando al máximo.
            </p>
          </div>
        </div>

        <img
          src={obedPhoto}
          alt="Persona trabajando en una laptop (foto temporal, pendiente de reemplazo por una foto real de Obed)"
          className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
        />
      </div>
    </section>
  )
}

export default SobreObed
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/SobreObed.test.tsx`
Expected: PASS — all 4 tests (id, name, "desarrollador independiente"+"honduras", photo).

- [ ] **Step 5: Commit**

```bash
git add src/components/SobreObed.tsx src/components/SobreObed.test.tsx
git commit -m "Correct SobreObed bio and add placeholder photo"
```

---

### Task 11: Recolor Footer's WhatsApp button and eyebrow label

**Files:**
- Modify: `src/components/Footer.tsx:9,29-37`

**Interfaces:**
- Consumes: nothing new
- Produces: same `Footer` default export, same structure `Footer.test.tsx` asserts on

- [ ] **Step 1: Replace the eyebrow label color**

In `src/components/Footer.tsx`, replace:

```tsx
        <p className="font-mono text-sm text-accent">07 // CONTACTO</p>
```

with:

```tsx
        <p className="font-mono text-sm text-muted">07 // CONTACTO</p>
```

- [ ] **Step 2: Replace the WhatsApp link's className**

Replace:

```tsx
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-accent px-5 py-3 font-mono text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-on-accent"
          >
```

with:

```tsx
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-foreground px-5 py-3 font-mono text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
```

- [ ] **Step 3: Run Footer tests to confirm no regression**

Run: `npx vitest run src/components/Footer.test.tsx`
Expected: all 5 existing tests still PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "Recolor Footer WhatsApp CTA and eyebrow label to neutral tones"
```

---

### Task 12: Full regression check, production build, and manual browser verification

**Files:** none (verification only)

**Interfaces:** N/A

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: all test files pass (should be 9 component test files + `App.test.tsx`, since
`Reparacion.test.tsx` was deleted and `ServicioTecnico.test.tsx` added in Task 8 — same file
count as before the rename).

- [ ] **Step 2: Confirm zero remaining "hardware" mentions in source**

Run: `grep -rin "hardware" src/`
Expected: no output (or only non-user-facing matches, e.g. a CSS comment — if the grep in
`src/index.css` for `/* Metallic (hardware) */` or similar still shows up, remove that comment
too since it's stale). If a `Servicios.tsx`/`ServicioTecnico.tsx`/`PorQue.tsx`/`SobreObed.tsx`
match appears, stop and fix it — it means an earlier task's copy correction was incomplete.

- [ ] **Step 3: Type-check and build for production**

Run: `npm run build`
Expected: `tsc -b` reports no type errors, `vite build` completes successfully, output written to
`dist/`.

- [ ] **Step 4: Manual visual check in a browser**

Run: `npm run dev`, open the printed local URL, and confirm by eye:
- Page background is light (`#fafafa`), not black
- No leftover circuit-grid pattern or `SCAN_SYSTEM` text in the Hero
- Every section (Hero, Servicios, DentalCore, Servicio técnico, Sobre Obed) shows its new photo
- WhatsApp buttons are solid dark (not green outline)
- No visible mention of hardware repair, RAM, disk, or "formateo" anywhere on the page
- Resize the window narrow (or use the iframe-injection technique from prior sessions if browser
  device-emulation tools are unreliable in this environment) to confirm the new split
  text/photo layouts stack correctly on mobile

Stop the dev server when done (`Ctrl+C` or kill the background process).

- [ ] **Step 5: Final commit (only if Step 4 required fixes)**

If Step 4 surfaced any visual issue, fix it, re-run `npm run test`, and commit with a message
describing the specific fix. If Step 4 found nothing to fix, no commit is needed here — the
redesign is complete as of Task 11's commit.
