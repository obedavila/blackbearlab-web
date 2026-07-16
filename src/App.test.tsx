import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders exactly one h1', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('renders every required section landmark', () => {
    const { container } = render(<App />)
    expect(container.querySelector('#servicios')).toBeInTheDocument()
    expect(container.querySelector('#dentalcore')).toBeInTheDocument()
    expect(container.querySelector('#servicio-tecnico')).toBeInTheDocument()
    expect(container.querySelector('#nosotros')).toBeInTheDocument()
    expect(container.querySelector('#contacto')).toBeInTheDocument()
  })
})
