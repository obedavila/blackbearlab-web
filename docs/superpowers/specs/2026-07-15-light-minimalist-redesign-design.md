# Rediseño visual: minimalista claro + corrección de contenido

## Contexto

La primera versión del sitio (negro, acento verde-cian, motivo "consola de sistema/terminal")
no convenció al dueño del proyecto ("se ve raro"). Se exploraron 3 direcciones minimalistas con
un companion visual (claro / oscuro suave / neutro metálico); se eligió **minimalista claro**.

Durante la revisión también salió un error de contenido: el sitio describe servicios de
**reparación de hardware** (cambio de RAM, disco duro/SSD) que BlackbearLab no ofrece. El negocio
real es software a la medida + **soporte técnico y optimización de software** (coincide con el
logo, que dice "SOFTWARE REPAIR & OPTIMIZATION", no hardware). Este spec cubre ambos cambios:
rediseño visual y corrección de servicios.

## 1. Paleta y tokens de color

Reemplazo completo del bloque `@theme` en `src/index.css`. Tema oscuro → tema claro:

| Token | Valor actual | Valor nuevo |
|---|---|---|
| `--color-bg` | `#0a0a0b` | `#fafafa` |
| `--color-surface` (cards) | `#131417` | `#ffffff` |
| `--color-surface-raised` | `#1b1d21` | `#f4f4f5` |
| `--color-border` | `#2e3238` | `#e4e4e7` |
| `--color-border-strong` | `#454b52` | `#d4d4d8` |
| `--color-foreground` | `#f1f5f4` | `#18181b` |
| `--color-muted` | `#9aa3ab` | `#71717a` |
| `--color-steel` | `#c8cdd2` | `#52525b` |
| `--color-steel-dim` | `#7c848c` | `#a1a1aa` |
| `--color-accent` | `#2ee6b0` | `#2ee6b0` (sin cambio de valor, pero uso muy reducido — ver abajo) |
| `--color-on-accent` | `#05130e` | `#05130e` |

`html { color-scheme: dark }` → `color-scheme: light`. `theme-color` en `index.html` pasa de
`#0a0a0b` a `#fafafa`.

**Uso del acento verde-cian**: deja de ser el color de botones/CTAs. Los CTAs primarios
(WhatsApp, "Ver servicios", etc.) usan `--color-foreground` (`#18181b`) como fondo sólido con
texto blanco — igual que en los mockups aprobados. El verde-cian queda reservado para detalles
puntuales y pequeños (p. ej. un ✓ suelto en un checklist), nunca como color dominante de un
bloque grande.

**Se elimina**: la cuadrícula de fondo tipo circuito en el Hero (`background-image` con
`linear-gradient` repetido) y el texto `> SCAN_SYSTEM ... STATUS: OK`. Eran parte del motivo
"terminal/hacker" que no encajó.

**Se mantiene sin cambio**: tipografía (Oswald condensada para títulos, JetBrains Mono para
datos/specs/precios) — el usuario confirmó explícitamente mantenerla pese al cambio de paleta.

## 2. Fotografía

Layout aprobado para el Hero: **split** (texto a la izquierda, foto a la derecha en desktop;
apilado en mobile). Mismo criterio de "foto real relevante" para el resto de secciones
principales (Hero, Servicios, DentalCore, Servicio Técnico, Sobre Obed) — "Por qué BlackbearLab"
y el Footer se quedan sin foto.

**Fuente e implementación**: fotos de stock de Unsplash (licencia Unsplash, uso libre, sin
atribución obligatoria) descargadas y guardadas en `src/assets/stock/`, no enlazadas en vivo al
CDN de Unsplash (evita dependencia de un tercero en producción y problemas si la URL cambia).
Cada `<img>` lleva un comentario indicando que es un placeholder temporal a reemplazar por fotos
reales del negocio, y `alt` text descriptivo real (no genérico) para accesibilidad.

**Restricción de contenido de las fotos**: nada de imágenes de reparación física de hardware
(soldadura, componentes abiertos, herramientas de electrónica) — coherente con que el negocio es
soporte de software, no reparación de hardware. Los temas por sección:

- **Hero**: persona trabajando en laptop (contexto de trabajo técnico/software, sin hardware abierto)
- **Servicios → columna Software**: código en pantalla / persona programando
- **Servicios → columna Soporte técnico**: laptop en uso, pantalla con interfaz de sistema/ajustes (no piezas físicas)
- **DentalCore**: contexto de clínica dental (ilustrativo del rubro del cliente, no una captura real del producto)
- **Servicio Técnico** (antes "Reparación"): laptop con pantalla de instalación/optimización de sistema
- **Sobre Obed**: foto genérica de developer/técnico, placeholder hasta que exista una foto real de Obed

## 3. Corrección de servicios (contenido)

BlackbearLab no ofrece reparación física de hardware. El listado real de servicios de soporte
técnico, según el usuario, es:

1. Diagnóstico completo del equipo
2. Instalación de sistema operativo
3. Instalación de Office
4. Optimización del sistema
5. Actualización de almacenamiento
6. Cambio de batería
7. Recuperación de archivos

### Cambios de copy por componente

**`Hero.tsx`**
- Headline: "Software a la medida y optimización de tu computadora, en un solo lugar"
- Subtítulo: "Desarrollamos sistemas a medida como DentalCore y damos soporte técnico:
  instalación, optimización y mantenimiento. Trato directo, local, en Honduras."

**`Servicios.tsx`** — la columna que hoy dice "Hardware" pasa a **"Soporte técnico"**, con un
resumen de 4 de los 7 servicios (diagnóstico, instalación de sistema operativo, optimización,
actualización de almacenamiento) — el listado completo de 7 vive en la sección dedicada.

**`Reparacion.tsx` → renombrado a `ServicioTecnico.tsx`**
- El encabezado de sección pasa de "Reparación de hardware" a **"Servicio técnico"**
- `SECTION_IDS.reparacion` (`'reparacion'`) se renombra a `SECTION_IDS.servicioTecnico`
  (`'servicio-tecnico'`) en `src/lib/constants.ts`
- El checklist tipo terminal se reemplaza por los 7 items completos listados arriba
- La línea de precio se mantiene igual: "PRECIO: cotización gratis, según equipo."
- Ningún nav link apunta hoy a este id directamente (no está en el menú del Header), así que el
  cambio de id no rompe navegación existente

**`PorQue.tsx`** — la razón "Todo en un lugar" cambia su descripción de
"Desarrollo de software y reparación de hardware con el mismo taller, sin intermediarios." a
"Desarrollo de software y soporte técnico para tu computadora, sin intermediarios."

**`SobreObed.tsx`** — la bio cambia "...dedicado a construir software a la medida y a mantener
el hardware de sus clientes funcionando al máximo." a "...dedicado a construir software a la
medida y a mantener las computadoras de sus clientes funcionando al máximo."

**`index.html`** — meta description cambia de mencionar "reparación, mantenimiento y
actualización de hardware" a soporte técnico/optimización de software, manteniendo la mención a
DentalCore.

## 4. Alcance de implementación por archivo

| Archivo | Tipo de cambio |
|---|---|
| `src/index.css` | Reemplazo de tokens de color en `@theme`, `color-scheme` |
| `index.html` | `theme-color`, meta description |
| `src/components/Header.tsx` | Recolor a tema claro |
| `src/components/Hero.tsx` | Recolor, quitar cuadrícula/texto terminal, layout split + foto, nuevo copy |
| `src/components/Servicios.tsx` | Recolor, foto por columna, renombrar/actualizar columna "Hardware" → "Soporte técnico" |
| `src/components/DentalCore.tsx` | Recolor, foto |
| `src/components/Reparacion.tsx` | **Renombrar archivo** a `ServicioTecnico.tsx`, recolor, nuevo checklist de 7 items, foto |
| `src/components/PorQue.tsx` | Recolor, nuevo copy en "Todo en un lugar" |
| `src/components/SobreObed.tsx` | Recolor, foto placeholder, corregir bio (quita mención a "hardware") |
| `src/components/Footer.tsx` | Recolor |
| `src/App.tsx` | Actualizar import de `Reparacion` → `ServicioTecnico` |
| `src/lib/constants.ts` | Renombrar `SECTION_IDS.reparacion` → `SECTION_IDS.servicioTecnico` |
| `src/assets/stock/` | Carpeta nueva con las fotos de stock descargadas |

## 5. Testing

Se sigue el mismo patrón TDD usado para construir el sitio (test co-ubicado por componente,
red-green-refactor verificado corriendo Vitest en cada paso):

- **`Servicios.test.tsx`**: las aserciones actuales sobre `/ram/i` y `/formateo/i` van a fallar
  con el nuevo copy — se actualizan para verificar los nuevos items (diagnóstico, instalación de
  sistema operativo, optimización, actualización de almacenamiento) antes de tocar el componente
- **`Reparacion.test.tsx` → renombrado a `ServicioTecnico.test.tsx`**: se reescribe para el nuevo
  componente, el nuevo id de sección (`#servicio-tecnico`) y los 7 items del checklist
- **`App.test.tsx`**: la aserción `container.querySelector('#reparacion')` se actualiza a
  `#servicio-tecnico`
- **`Hero.test.tsx`, `PorQue.test.tsx`, `Footer.test.tsx`, etc.**: no verifican el texto exacto
  del copy afectado (solo estructura/roles/hrefs), así que no deberían requerir cambios — se
  confirma corriendo la suite completa después de cada componente
- Nuevas imágenes: se verifica que cada `<img>` tenga `alt` no vacío y descriptivo (accesibilidad)

## Fuera de alcance

- No se agrega Router ni navegación multi-página (sigue siendo one-pager)
- No se cambia la tipografía (Oswald + JetBrains Mono se mantienen)
- No se agregan fotos reales del negocio todavía — son placeholders de stock explícitamente
  marcados para reemplazo posterior
- No se toca la lógica de `constants.ts` más allá del renombre de `SECTION_IDS.reparacion`
  (el número de WhatsApp y el resto de ids quedan igual)
