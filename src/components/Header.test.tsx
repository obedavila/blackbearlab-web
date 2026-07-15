import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Header from './Header'
import { WHATSAPP_NUMBER } from '../lib/constants'

describe('Header', () => {
  it('renders the BlackbearLab logo with descriptive alt text', () => {
    render(<Header />)
    const logo = screen.getByRole('img', { name: /blackbearlab/i })
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links to every main section', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveTextContent(/servicios/i)
    expect(nav).toHaveTextContent(/dentalcore/i)
    expect(nav).toHaveTextContent(/nosotros/i)
    expect(nav).toHaveTextContent(/contacto/i)

    expect(screen.getByRole('link', { name: /servicios/i })).toHaveAttribute(
      'href',
      '#servicios',
    )
    expect(screen.getByRole('link', { name: /dentalcore/i })).toHaveAttribute(
      'href',
      '#dentalcore',
    )
    expect(screen.getByRole('link', { name: /nosotros/i })).toHaveAttribute(
      'href',
      '#nosotros',
    )
    expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute(
      'href',
      '#contacto',
    )
  })

  it('renders a WhatsApp CTA button pointing to wa.me with the configured number', () => {
    render(<Header />)
    const whatsappLink = screen.getByRole('link', { name: /whatsapp/i })
    expect(whatsappLink).toHaveAttribute(
      'href',
      expect.stringContaining(`https://wa.me/${WHATSAPP_NUMBER}`),
    )
    expect(whatsappLink).toHaveAttribute('target', '_blank')
    expect(whatsappLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('toggles the mobile menu button state when clicked', () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /abrir menú/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /cerrar menú/i })).toBe(toggle)
  })
})
