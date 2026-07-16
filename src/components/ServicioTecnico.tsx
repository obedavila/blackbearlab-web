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
