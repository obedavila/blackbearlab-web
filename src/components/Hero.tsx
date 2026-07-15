import { ArrowRight, MessageCircle } from 'lucide-react'
import { SECTION_IDS, buildWhatsAppLink } from '../lib/constants'

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-bg px-4 py-20 sm:px-6 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(46,230,176,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(46,230,176,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-6 text-left">
        <p className="font-mono text-sm text-accent">
          &gt; SCAN_SYSTEM ... STATUS: OK
        </p>

        <h1 className="text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          Software a la medida y reparación de hardware,{' '}
          <span className="text-accent">en un solo taller</span>
        </h1>

        <p className="max-w-2xl font-mono text-base text-muted sm:text-lg">
          Desarrollamos sistemas a medida como DentalCore y reparamos,
          diagnosticamos y optimizamos computadoras. Trato directo, local, en
          Honduras.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded bg-accent px-6 py-3 font-mono text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dim"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Escribir por WhatsApp
          </a>
          <a
            href={`#${SECTION_IDS.servicios}`}
            className="inline-flex items-center justify-center gap-2 rounded border border-border-strong px-6 py-3 font-mono text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Ver servicios
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
