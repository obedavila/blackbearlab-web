import { Code2, HardDrive } from 'lucide-react'
import { SECTION_IDS } from '../lib/constants'

const SOFTWARE_ITEMS = [
  'Desarrollo a la medida de sistemas de gestión',
  'Sitios web y landing pages',
  'Mantenimiento y soporte de software existente',
]

const HARDWARE_ITEMS = [
  'Diagnóstico completo del equipo',
  'Cambio de RAM y disco duro / SSD',
  'Formateo e instalación de sistema operativo',
  'Mantenimiento preventivo',
  'Recuperación de archivos',
]

function Servicios() {
  return (
    <section
      id={SECTION_IDS.servicios}
      className="border-b border-border bg-bg px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm text-accent">02 // SERVICIOS</p>
        <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">
          Todo lo que tu equipo y tu negocio necesitan
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="rounded border border-border bg-surface p-6">
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 text-accent" aria-hidden="true" />
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
          </article>

          <article className="rounded border border-border bg-surface p-6">
            <div className="flex items-center gap-3">
              <HardDrive className="h-6 w-6 text-steel" aria-hidden="true" />
              <h3 className="text-xl text-foreground">Hardware</h3>
            </div>
            <ul className="mt-6 space-y-3 font-mono text-sm text-muted">
              {HARDWARE_ITEMS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Servicios
