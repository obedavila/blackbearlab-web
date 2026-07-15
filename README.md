# BlackbearLab — Landing Page

Landing page de una sola página para BlackbearLab (Honduras): desarrollo de software a la medida
(caso destacado: DentalCore) y reparación/actualización de hardware.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Vitest + React Testing Library

## Cómo correrlo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run test     # correr toda la suite de tests
npm run build    # typecheck (tsc -b) + build de producción a dist/
npm run preview  # previsualizar el build de producción
npm run lint      # oxlint
```

## Antes de publicar

- Reemplazar `WHATSAPP_NUMBER` en `src/lib/constants.ts` (marcado como `TODO`) por el número real
  de WhatsApp de BlackbearLab.
- Los precios de reparación de hardware son intencionalmente variables ("cotización gratis, según
  equipo"); no se agregaron precios fijos.

## Estructura

Cada sección de la página vive en `src/components/` como su propio componente, con su archivo de
test junto a él (`Componente.tsx` + `Componente.test.tsx`). `src/App.tsx` los compone en orden.
