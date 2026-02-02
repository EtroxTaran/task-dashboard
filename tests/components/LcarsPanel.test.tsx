import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LcarsPanel } from '../../src/components/lcars/LcarsPanel'

describe('LcarsPanel', () => {
  it('renders with title', () => {
    render(<LcarsPanel title="Test Panel">Content</LcarsPanel>)
    expect(screen.getByText('Test Panel')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<LcarsPanel title="Test">Hello World</LcarsPanel>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('has lcars-panel class', () => {
    render(<LcarsPanel title="Test">Content</LcarsPanel>)
    const panel = screen.getByTestId('lcars-panel')
    expect(panel).toHaveClass('lcars-panel')
  })

  it('applies custom className', () => {
    render(<LcarsPanel title="Test" className="custom-class">Content</LcarsPanel>)
    const panel = screen.getByTestId('lcars-panel')
    expect(panel).toHaveClass('custom-class')
  })
})
