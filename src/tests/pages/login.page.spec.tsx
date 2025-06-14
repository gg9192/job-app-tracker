import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/login/page'
import { vi } from 'vitest'
import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Mock useRouter at the top level
// Provide a default mock implementation that can be overridden later
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

describe.only("Login page", () => {
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
    render(<LoginPage />);
    vi.clearAllMocks();
  })


  it("shows validation errors on empty submit", async () => {
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
      expect(screen.getByText(/password must be at least/i)).toBeInTheDocument()
    })
  })

  it("shows error toast on 401", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401
      })
    ) as any

    fireEvent.input(screen.getByPlaceholderText(/you@example.com/i), {
      target: { value: 'user@example.com' }
    })
    fireEvent.input(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Your credentials don't match an account in our system")
    })
  })

  it("shows error toast on 500", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500
      })
    ) as any

    fireEvent.input(screen.getByPlaceholderText(/you@example.com/i), {
      target: { value: 'user@example.com' }
    })
    fireEvent.input(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something went wrong on our end!")
    })
  })

  it("redirects and shows success toast on success", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200
      })
    ) as any

    fireEvent.input(screen.getByPlaceholderText(/you@example.com/i), {
      target: { value: 'user@example.com' }
    })
    fireEvent.input(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Login successfull.")
      expect(push).toHaveBeenCalledWith("/")
    })
  })
})







