import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PorQue from './PorQue'

describe('PorQue', () => {
  it('renders a heading introducing the reasons to choose BlackbearLab', () => {
    render(<PorQue />)
    expect(
      screen.getByRole('heading', { name: /por qu[eé] blackbearlab/i }),
    ).toBeInTheDocument()
  })

  it('lists the three key reasons', () => {
    render(<PorQue />)
    expect(screen.getByText(/todo en un lugar/i)).toBeInTheDocument()
    expect(screen.getByText(/trato directo y local/i)).toBeInTheDocument()
    expect(screen.getByText(/soporte post-venta/i)).toBeInTheDocument()
  })
})
