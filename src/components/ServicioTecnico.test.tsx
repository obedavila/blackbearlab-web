import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ServicioTecnico from './ServicioTecnico'

describe('ServicioTecnico', () => {
  it('renders a section with id="servicio-tecnico"', () => {
    const { container } = render(<ServicioTecnico />)
    expect(container.querySelector('#servicio-tecnico')).toBeInTheDocument()
  })

  it('renders a terminal-style checklist of the full software support offering', () => {
    render(<ServicioTecnico />)
    expect(screen.getByText(/diagn[oó]stico/i)).toBeInTheDocument()
    expect(
      screen.getByText(/instalaci[oó]n de sistema operativo/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/instalaci[oó]n de office/i)).toBeInTheDocument()
    expect(screen.getByText(/optimizaci[oó]n del sistema/i)).toBeInTheDocument()
    expect(
      screen.getByText(/actualizaci[oó]n de almacenamiento/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/cambio de bater[ií]a/i)).toBeInTheDocument()
    expect(screen.getByText(/recuperaci[oó]n de archivos/i)).toBeInTheDocument()
  })

  it('does not mention hardware repair BlackbearLab does not offer', () => {
    render(<ServicioTecnico />)
    expect(screen.queryByText(/cambio de ram/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/disco duro/i)).not.toBeInTheDocument()
  })

  it('mentions a free quote instead of a fixed price', () => {
    render(<ServicioTecnico />)
    expect(screen.getByText(/cotizaci[oó]n gratis/i)).toBeInTheDocument()
  })

  it('renders a photo with descriptive alt text', () => {
    render(<ServicioTecnico />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/))
  })
})
