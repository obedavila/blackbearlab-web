import { Menu, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/brand/logo.jpeg'
import { SECTION_IDS, buildWhatsAppLink } from '../lib/constants'

const NAV_ITEMS = [
  { id: SECTION_IDS.servicios, label: 'Servicios' },
  { id: SECTION_IDS.dentalcore, label: 'DentalCore' },
  { id: SECTION_IDS.nosotros, label: 'Nosotros' },
  { id: SECTION_IDS.contacto, label: 'Contacto' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt="BlackbearLab — software repair & optimization"
            className="h-11 w-11 rounded-full border border-border-strong object-cover"
          />
          <span className="font-display text-lg tracking-wide text-foreground">
            BlackbearLab
          </span>
        </a>

        <nav aria-label="Principal">
          <ul
            data-open={menuOpen}
            className="absolute inset-x-0 top-full hidden flex-col gap-4 border-b border-border bg-bg px-4 py-4 font-mono text-sm text-muted data-[open=true]:flex sm:px-6 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-none md:bg-transparent md:p-0 md:data-[open=false]:flex"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-foreground px-3 py-2 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-foreground md:hidden"
          >
            {menuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
