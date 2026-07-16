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

        {/* Placeholder: reemplazar por una foto real de Obed */}
        <img
          src={obedPhoto}
          alt="Persona trabajando en una laptop"
          className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
        />
      </div>
    </section>
  )
}

export default SobreObed
