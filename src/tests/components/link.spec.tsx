import { render, screen } from '@testing-library/react'
import React from 'react'
import {Link} from '@/components/link'

describe('PasswordInput', () => {
  beforeEach(() => {
    render(<Link href="google.com">Text</Link>)
  })

  it('should render the correct text and link', () => {
    const link = screen.getByText(/Text/i)
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', 'google.com')
  })
})
