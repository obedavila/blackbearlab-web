import { SECTION_IDS } from '../lib/constants'

function SobreObed() {
  return (
    <section
      id={SECTION_IDS.nosotros}
      className="border-b border-border bg-bg px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-sm text-accent">06 // NOSOTROS</p>
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
            construir software a la medida y a mantener el hardware de sus
            clientes funcionando al máximo.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SobreObed
