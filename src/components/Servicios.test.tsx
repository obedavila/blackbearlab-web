import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Servicios from './Servicios'

describe('Servicios', () => {
  it('renders a section with id="servicios"', () => {
    const { container } = render(<Servicios />)
    expect(container.querySelector('#servicios')).toBeInTheDocument()
  })

  it('lists the software development services', () => {
    render(<Servicios />)
    expect(screen.getByText(/desarrollo a la medida/i)).toBeInTheDocument()
    expect(screen.getByText(/sitios web/i)).toBeInTheDocument()
  })

  it('lists the hardware repair services', () => {
    render(<Servicios />)
    expect(screen.getByText(/diagn[oó]stico/i)).toBeInTheDocument()
    expect(screen.getByText(/ram/i)).toBeInTheDocument()
    expect(screen.getByText(/formateo/i)).toBeInTheDocument()
    expect(screen.getByText(/recuperaci[oó]n de archivos/i)).toBeInTheDocument()
  })
})
