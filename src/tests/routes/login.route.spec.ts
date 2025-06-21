import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/login/route'
import * as userService from '@/services/userService'
import { createPostRequest } from '../testing-utils/requestFactory'

vi.mock('@/services/userService')

const mockedValidate = vi.mocked(userService.validateLoginAndReturnSession)

describe('POST /login handler', () => {
  it('returns 401 when credentials are invalid', async () => {
    mockedValidate.mockResolvedValueOnce(null)
    const req = createPostRequest({ email: 'test@test.com', password: 'wrong' })

    const res = await POST(req)

    expect(res.status).toBe(401)
    expect(await res.text()).toBe('Invalid credentials')
  })

  it('returns 200 and sets cookie when login is successful', async () => {
    mockedValidate.mockResolvedValueOnce('token123')
    const req = createPostRequest({ email: 'test@test.com', password: 'correct' })

    const res = await POST(req)

    expect(res.status).toBe(200)
    expect(res.headers.get('Set-Cookie')).toContain('session=token123')
    expect(await res.text()).toBe('Login successful')
  })

  it('returns 500 when an error is thrown', async () => {
    mockedValidate.mockRejectedValueOnce(new Error('fail'))
    const req = createPostRequest({ email: 'test@test.com', password: 'error' })

    const res = await POST(req)

    expect(res.status).toBe(500)
    expect(await res.text()).toBe('Internal Server Error')
  })
})
