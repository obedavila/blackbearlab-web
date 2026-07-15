import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Hero from './Hero'
import { WHATSAPP_NUMBER } from '../lib/constants'

describe('Hero', () => {
  it('renders a main heading (h1)', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders a primary WhatsApp CTA', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /whatsapp/i })
    expect(cta).toHaveAttribute(
      'href',
      expect.stringContaining(`https://wa.me/${WHATSAPP_NUMBER}`),
    )
  })

  it('renders a secondary CTA linking to the services section', () => {
    render(<Hero />)
    const secondaryCta = screen.getByRole('link', { name: /servicios/i })
    expect(secondaryCta).toHaveAttribute('href', '#servicios')
  })
})
