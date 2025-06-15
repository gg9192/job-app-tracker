import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { Link, LinkStyledButton } from '@/components/link'

describe('Link Components', () => {
  describe('Link', () => {
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

  describe('LinkStyledButton', () => {
    it('should call handleClick on click', () => {
      const handleClick = vi.fn()
      render(<LinkStyledButton handleClick={handleClick}>Click</LinkStyledButton>)
      const button = screen.getByText(/Click/i)
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
