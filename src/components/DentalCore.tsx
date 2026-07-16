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
                $700 USD
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

        {/* Placeholder stock photo of dental clinic — illustrative of DentalCore's use case */}
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
