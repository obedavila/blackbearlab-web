import { MapPin, MessageCircle } from 'lucide-react'
import logo from '../assets/brand/logo.jpeg'
import { SECTION_IDS, buildWhatsAppLink } from '../lib/constants'

function Footer() {
  return (
    <footer id={SECTION_IDS.contacto} className="bg-bg px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm text-accent">07 // CONTACTO</p>

        <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="BlackbearLab — software repair & optimization"
              className="h-12 w-12 rounded-full border border-border-strong object-cover"
            />
            <div>
              <p className="font-display text-lg tracking-wide text-foreground">
                BlackbearLab
              </p>
              <p className="flex items-center gap-1 font-mono text-sm text-muted">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                San Esteban, Olancho, Honduras
              </p>
            </div>
          </div>

          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-accent px-5 py-3 font-mono text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-on-accent"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Escribir por WhatsApp
          </a>
        </div>

        <p className="mt-10 border-t border-border pt-6 font-mono text-xs text-muted">
          © 2026 BlackbearLab — Desarrollado por Ing. Obed Avila. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
