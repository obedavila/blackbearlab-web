import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SobreObed from './SobreObed'

describe('SobreObed', () => {
  it('renders a section with id="nosotros"', () => {
    const { container } = render(<SobreObed />)
    expect(container.querySelector('#nosotros')).toBeInTheDocument()
  })

  it('names the founder as Ing. Obed Avila', () => {
    render(<SobreObed />)
    expect(screen.getByText(/obed avila/i)).toBeInTheDocument()
  })

  it('mentions he is an independent developer based in Honduras', () => {
    render(<SobreObed />)
    expect(screen.getByText(/desarrollador independiente/i)).toBeInTheDocument()
    expect(screen.getByText(/honduras/i)).toBeInTheDocument()
  })

  it('renders a photo with descriptive alt text', () => {
    render(<SobreObed />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/))
  })
})
