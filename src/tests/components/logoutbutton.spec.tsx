import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { LogoutButton } from '@/components/logoutbutton'
import { toast } from 'sonner'

vi.mock('sonner', () => ({
  toast: { success: vi.fn() }
}))

describe('LogoutButton', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, status: 200 })))
    vi.stubGlobal('window', Object.create(window))
    window.location.href = ''
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('logs out, shows toast, and redirects', async () => {
    render(<LogoutButton />)
    fireEvent.click(screen.getByText('Log Out'))

    await Promise.resolve() // let fetch resolve
    expect(fetch).toHaveBeenCalled()

    vi.runAllTimers()
    await Promise.resolve() // allow any microtasks queued in setTimeout

    expect(toast.success).toHaveBeenCalledWith("You have been logged out!")
    expect(window.location.href).toBe("http://localhost:3000/")
  })
})
