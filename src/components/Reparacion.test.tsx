import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Reparacion from './Reparacion'

describe('Reparacion', () => {
  it('renders a section with id="reparacion"', () => {
    const { container } = render(<Reparacion />)
    expect(container.querySelector('#reparacion')).toBeInTheDocument()
  })

  it('renders a terminal-style checklist of workshop services', () => {
    render(<Reparacion />)
    expect(screen.getByText(/diagn[oó]stico/i)).toBeInTheDocument()
    expect(screen.getByText(/mantenimiento preventivo/i)).toBeInTheDocument()
  })

  it('mentions a free quote instead of a fixed price', () => {
    render(<Reparacion />)
    expect(screen.getByText(/cotizaci[oó]n gratis/i)).toBeInTheDocument()
  })
})
