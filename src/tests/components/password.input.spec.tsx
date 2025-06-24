import { render, screen } from '@testing-library/react'
import { PasswordInput } from '@/components/passwordinput'
import { fireEvent } from '@testing-library/react'

describe('PasswordInput', () => {
  beforeEach(() => {
    render(<PasswordInput id="password"/>)
  })

  it('should render the password input', () => {
    const input = screen.getByTestId("passwordinput");
    expect(input).toBeInTheDocument()
    expect(screen.getByTestId('eyeclosed')).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('should show the password when the toggle is clicked', () => {
    fireEvent.click(screen.getByTestId('eyeclosed'))
    expect(screen.getByTestId('eyeopen')).toBeInTheDocument()
    const input = screen.getByTestId("passwordinput");
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should hide the password when the toggle is clicked twice', () => {
    const input = screen.getByTestId("passwordinput");
    fireEvent.click(screen.getByTestId('eyeclosed'))
    expect(screen.getByTestId('eyeopen')).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    fireEvent.click(screen.getByTestId('eyeopen'))
    expect(screen.getByTestId('eyeclosed')).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })
})