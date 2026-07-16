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

  it('lists the technical support services', () => {
    render(<Servicios />)
    expect(screen.getByText(/diagn[oó]stico/i)).toBeInTheDocument()
    expect(
      screen.getByText(/instalaci[oó]n de sistema operativo/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/optimizaci[oó]n del sistema/i)).toBeInTheDocument()
    expect(
      screen.getByText(/actualizaci[oó]n de almacenamiento/i),
    ).toBeInTheDocument()
  })

  it('does not mention hardware repair services BlackbearLab does not offer', () => {
    render(<Servicios />)
    expect(screen.queryByText(/cambio de ram/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/formateo/i)).not.toBeInTheDocument()
  })

  it('renders a photo for each service column with descriptive alt text', () => {
    render(<Servicios />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt', expect.stringMatching(/.+/))
    })
  })
})
