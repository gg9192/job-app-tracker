// __tests__/RootLayout.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import RootLayout from '@/app/layout'
import * as userService from '@/services/userService'
import * as nextHeaders from 'next/headers'

vi.mock('@/services/userService')
vi.mock('next/headers')

vi.mock('next/font/google', () => ({
    Geist: () => ({
        variable: '--font-geist-sans',
        className: 'mock-geist-font',
    }),
    Geist_Mono: () => ({
        variable: '--font-geist-mono',
        className: 'mock-geist-mono-font',
    }),
}))


describe('RootLayout', () => {
    const mockChildren = <div>Test Content</div>

    beforeEach(() => {
        vi.resetAllMocks()
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    })

    describe('when user is logged in', () => {
        it('shows the logout button', async () => {
            vi.spyOn(nextHeaders, 'cookies').mockReturnValue({
                get: vi.fn().mockReturnValue({ value: 'valid_session' }),
                getAll: vi.fn(),
                has: vi.fn(),
                [Symbol.iterator]: function* () { }, // necessary for iterable interface
                size: 1,
            } as any)

            const user = {
                id: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                password: "securePassword123"
            }

            vi.spyOn(userService, 'getLoggedInUser').mockResolvedValue(user)

            const { findByText } = render(await RootLayout({ children: mockChildren }))

            await findByText('Log Out')
        })
    })

    describe('when user is logged out', () => {
        it('shows login and sign up links', async () => {
            vi.spyOn(nextHeaders, 'cookies').mockReturnValue({
                get: vi.fn().mockReturnValue({ value: 'valid_session' }),
                getAll: vi.fn(),
                has: vi.fn(),
                [Symbol.iterator]: function* () { }, // necessary for iterable interface
                size: 1,
            } as any)

            vi.spyOn(userService, 'getLoggedInUser').mockResolvedValue(null)

            const { findByText } = render(await RootLayout({ children: mockChildren }))

            await findByText('Log In')
            await findByText('Sign Up')
        })
    })
})
