# BlackbearLab — Landing Page

Landing page de una sola página para BlackbearLab (Honduras): desarrollo de software a la medida
(caso destacado: DentalCore) y soporte técnico/optimización de software.

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

- El número de WhatsApp de BlackbearLab está configurado en `src/lib/constants.ts` (WHATSAPP_NUMBER).
- Los precios del servicio técnico son intencionalmente variables ("cotización gratis, según
  equipo"); no se agregaron precios fijos.

## Estructura

Cada sección de la página vive en `src/components/` como su propio componente, con su archivo de
test junto a él (`Componente.tsx` + `Componente.test.tsx`). `src/App.tsx` los compone en orden.
