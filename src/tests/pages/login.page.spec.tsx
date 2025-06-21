import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/login/page'
import { vi } from 'vitest'
import { toast } from 'sonner'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe("Login page", () => {
  let push;

  beforeEach(() => {
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
      expect(toast.success).toHaveBeenCalledWith("Login successfull!")
      
    })
  })
})







