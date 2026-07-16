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
