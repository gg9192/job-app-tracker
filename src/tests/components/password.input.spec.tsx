import { render, screen } from '@testing-library/react'
import React from 'react'
import { PasswordInput } from '@/components/passwordinput'
import { fireEvent } from '@testing-library/react'

describe('PasswordInput', () => {
  beforeEach(() => {
    render(<PasswordInput id="password" label="Password" />)
  })

  it('should render the password input', () => {
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByTestId('eyeclosed')).toBeInTheDocument()
    const input = screen.getByLabelText(/password/i)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('should show the password when the toggle is clicked', () => {
    fireEvent.click(screen.getByTestId('eyeclosed'))
    expect(screen.getByTestId('eyeopen')).toBeInTheDocument()
    const input = screen.getByLabelText(/password/i)
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should hide the password when the toggle is clicked twice', () => {
    const input = screen.getByLabelText(/password/i)
    fireEvent.click(screen.getByTestId('eyeclosed'))
    expect(screen.getByTestId('eyeopen')).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    fireEvent.click(screen.getByTestId('eyeopen'))
    expect(screen.getByTestId('eyeclosed')).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('should display the error correctly', () => {
    render(<PasswordInput id="password" label="Password" error='Password is required'/>)
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })
})