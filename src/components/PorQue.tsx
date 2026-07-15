import { Handshake, Layers, LifeBuoy } from 'lucide-react'

const REASONS = [
  {
    icon: Layers,
    title: 'Todo en un lugar',
    description:
      'Desarrollo de software y reparación de hardware con el mismo taller, sin intermediarios.',
  },
  {
    icon: Handshake,
    title: 'Trato directo y local',
    description:
      'Hablás directamente con quien desarrolla y repara, sin call centers.',
  },
  {
    icon: LifeBuoy,
    title: 'Soporte post-venta',
    description:
      'Acompañamiento después de la entrega, tanto en software como en equipos reparados.',
  },
]

function PorQue() {
  return (
    <section className="border-b border-border bg-surface px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm text-accent">05 // VENTAJAS</p>
        <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">
          Por qué BlackbearLab
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded border border-border bg-bg p-6">
              <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-lg text-foreground">{title}</h3>
              <p className="mt-2 font-mono text-sm text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PorQue
