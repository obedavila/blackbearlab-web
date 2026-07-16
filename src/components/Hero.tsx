import { ArrowRight, MessageCircle } from 'lucide-react'
import heroPhoto from '../assets/stock/hero.jpg'
import { SECTION_IDS, buildWhatsAppLink } from '../lib/constants'

function Hero() {
  return (
    <section
      id="top"
      className="border-b border-border bg-bg px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
            Software a la medida y optimización de tu computadora, en un
            solo lugar
          </h1>

          <p className="max-w-xl font-mono text-base text-muted sm:text-lg">
            Desarrollamos sistemas a medida como DentalCore y damos soporte
            técnico: instalación, optimización y mantenimiento. Trato
            directo, local, en Honduras.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-foreground px-6 py-3 font-mono text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
            <a
              href={`#${SECTION_IDS.servicios}`}
              className="inline-flex items-center justify-center gap-2 rounded border border-border-strong px-6 py-3 font-mono text-sm font-semibold text-foreground transition-colors hover:border-foreground"
            >
              Ver servicios
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <img
          src={heroPhoto}
          alt="Persona escribiendo en el teclado de una laptop"
          className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
        />
      </div>
    </section>
  )
}

export default Hero
