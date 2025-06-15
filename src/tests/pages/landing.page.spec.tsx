import { render, screen } from '@testing-library/react'
import LandingPage from '@/app/page'

describe('landing page', () => {
  beforeEach(() => {
    render(<LandingPage />)
  })

  it('renders the main heading', () => {
    expect(screen.getByText('Organize Your Job Hunt with Confidence')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    expect(
      screen.getByText(
        /our job tracker helps you stay on top of every application, interview, and offer/i
      )
    ).toBeInTheDocument()
  })

  it('renders the "Get Started" button', () => {
    expect(screen.getByRole('link', { name: 'Get Started' })).toHaveAttribute('href', '/sign-up')
  })

  it('renders the "Login" button', () => {
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login')
  })
})
