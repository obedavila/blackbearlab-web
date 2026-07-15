import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from './Footer'
import { WHATSAPP_NUMBER } from '../lib/constants'

describe('Footer', () => {
  it('renders a section with id="contacto"', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('#contacto')).toBeInTheDocument()
  })

  it('renders the BlackbearLab logo', () => {
    render(<Footer />)
    expect(screen.getByRole('img', { name: /blackbearlab/i })).toBeInTheDocument()
  })

  it('renders a WhatsApp contact link', () => {
    render(<Footer />)
    const whatsappLink = screen.getByRole('link', { name: /whatsapp/i })
    expect(whatsappLink).toHaveAttribute(
      'href',
      expect.stringContaining(`https://wa.me/${WHATSAPP_NUMBER}`),
    )
  })

  it('shows the location in San Esteban, Olancho, Honduras', () => {
    render(<Footer />)
    expect(screen.getByText(/san esteban/i)).toBeInTheDocument()
    expect(screen.getByText(/olancho/i)).toBeInTheDocument()
  })

  it('shows the copyright notice for 2026', () => {
    render(<Footer />)
    expect(
      screen.getByText(/© 2026 BlackbearLab — Desarrollado por Ing\. Obed Avila\. Todos los derechos reservados\./i),
    ).toBeInTheDocument()
  })
})
