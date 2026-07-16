import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import DentalCore from './DentalCore'

describe('DentalCore', () => {
  it('renders a section with id="dentalcore"', () => {
    const { container } = render(<DentalCore />)
    expect(container.querySelector('#dentalcore')).toBeInTheDocument()
  })

  it('mentions the single price of $700', () => {
    render(<DentalCore />)
    expect(screen.getByText(/\$700/)).toBeInTheDocument()
  })

  it('mentions that it works without internet', () => {
    render(<DentalCore />)
    expect(screen.getByText(/sin internet/i)).toBeInTheDocument()
  })

  it('lists the three user roles', () => {
    render(<DentalCore />)
    expect(screen.getByText(/admin/i)).toBeInTheDocument()
    expect(screen.getByText(/dentista/i)).toBeInTheDocument()
    expect(screen.getByText(/recepci[oó]n/i)).toBeInTheDocument()
  })

  it('renders an illustrative photo with descriptive alt text', () => {
    render(<DentalCore />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/))
  })
})
