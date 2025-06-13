import { render, screen } from '@testing-library/react'
import React from 'react'
import { PasswordInput } from '@/components/passwordinput'

test('renders password input', () => {
  render(<PasswordInput id="password" label="Password" />)
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
})
