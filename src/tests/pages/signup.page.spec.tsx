import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignUpPage from '@/app/sign-up/page'
import { vi } from 'vitest'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }))
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe.only("SignUpPage", () => {
  // Declare push outside beforeEach so it can be accessed in multiple tests
  let push;

  beforeEach(() => {
    // Reset the mock implementation of useRouter before each test
    // This ensures a clean state for each test where useRouter might be used.
    push = vi.fn();
    useRouter.mockReturnValue({
      push,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
    render(<SignUpPage />);
    vi.clearAllMocks();
  })

  it("renders the sign up form with all input fields and submit button", () => {
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it("shows validation errors for empty or invalid inputs", async () => {
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
      expect(screen.getByText(/password must be at least/i)).toBeInTheDocument()
    })
  })

  it("shows error if passwords do not match", async () => {
    fireEvent.input(screen.getByLabelText(/first name/i), { target: { value: 'Alex' } })
    fireEvent.input(screen.getByLabelText(/last name/i), { target: { value: 'Guo' } })
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.input(screen.getByLabelText(/^password$/i), { target: { value: 'Password123$' } })
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'notmatching' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    })
  })

  it("submits form successfully and redirects on valid input", async () => {
    // The 'push' mock is already set up in beforeEach, no need to re-mock useRouter here
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: true, status: 200 })

    fireEvent.input(screen.getByLabelText(/first name/i), { target: { value: 'Alex' } })
    fireEvent.input(screen.getByLabelText(/last name/i), { target: { value: 'Guo' } })
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.input(screen.getByLabelText(/^password$/i), { target: { value: 'Password123$' } })
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123$' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Your account was created.")
      expect(push).toHaveBeenCalledWith('/login')
    })
  })

  it("shows error toast if email is already in use (409 response)", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 409 })

    fireEvent.input(screen.getByLabelText(/first name/i), { target: { value: 'Alex' } })
    fireEvent.input(screen.getByLabelText(/last name/i), { target: { value: 'Guo' } })
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'taken@example.com' } })
    fireEvent.input(screen.getByLabelText(/^password$/i), { target: { value: 'Password123$' } })
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123$' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("That email is already in use!")
    })
  })

  it("shows error toast if server error occurs (500 response)", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 500 })

    fireEvent.input(screen.getByLabelText(/first name/i), { target: { value: 'Alex' } })
    fireEvent.input(screen.getByLabelText(/last name/i), { target: { value: 'Guo' } })
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'fail@example.com' } })
    fireEvent.input(screen.getByLabelText(/^password$/i), { target: { value: 'Password123$' } })
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123$' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something went wrong on our end!")
    })
  })

  it("displays success toast on successful account creation", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: true, status: 200 })

    fireEvent.input(screen.getByLabelText(/first name/i), { target: { value: 'Alex' } })
    fireEvent.input(screen.getByLabelText(/last name/i), { target: { value: 'Guo' } })
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.input(screen.getByLabelText(/^password$/i), { target: { value: 'Password123$' } })
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123$' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Your account was created.")
    })
  })

  it("navigates to login page after successful sign up", async () => {
    // The 'push' mock is already set up in beforeEach, no need to re-mock useRouter here
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: true, status: 200 })

    fireEvent.input(screen.getByLabelText(/first name/i), { target: { value: 'Alex' } })
    fireEvent.input(screen.getByLabelText(/last name/i), { target: { value: 'Guo' } })
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.input(screen.getByLabelText(/^password$/i), { target: { value: 'Password123$' } })
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123$' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/login')
    })
  })
})