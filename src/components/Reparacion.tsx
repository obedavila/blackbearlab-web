import { SECTION_IDS } from '../lib/constants'

const CHECKLIST = [
  'Diagnóstico completo del equipo',
  'Cambio de RAM',
  'Cambio de disco duro / SSD',
  'Formateo e instalación de sistema operativo',
  'Mantenimiento preventivo',
  'Recuperación de archivos',
]

function Reparacion() {
  return (
    <section
      id={SECTION_IDS.reparacion}
      className="border-b border-border bg-bg px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-sm text-accent">04 // TALLER</p>
        <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">
          Reparación de hardware
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
    </section>
  )
}

export default Reparacion
