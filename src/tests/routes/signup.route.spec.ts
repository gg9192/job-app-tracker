import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/signup/route'
import * as userService from '@/services/userService'
import { createPostRequest } from '../testing-utils/requestFactory'
import { ZodError } from 'zod'
import { Prisma } from '@/generated/prisma'

vi.mock('@/services/userService')
const mockedCreateUser = vi.mocked(userService.createUser)

describe('POST /signup handler', () => {
  it('should return a 201 on success', async () => {
    mockedCreateUser.mockResolvedValueOnce(undefined)
    const req = createPostRequest({ email: 'a@example.com', password: '123456', firstname: 'A', lastname: 'B' })
    const res = await POST(req)
    expect(res.status).toBe(201)
  })

  it('should return a 409 if an email is taken', async () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed',
      'P2002',
      '1.0.0',
      { target: ['email'] }
    );

    error.meta = { target: ['email'] }
    error.code = 'P2002'
    mockedCreateUser.mockRejectedValueOnce(error)
    const req = createPostRequest({ email: 'taken@example.com', password: '123456', firstname: 'A', lastname: 'B' })
    const res = await POST(req)
    expect(res.status).toBe(409)
    const json = await res.json()
    expect(json.errors).toBe("email must be unique")
  })

  it('should return a 400 if model validation fails', async () => {
    const zodError = new ZodError([
      {
        path: ['email'],
        message: 'Invalid email',
        code: 'invalid_type',
      }
    ])
    mockedCreateUser.mockRejectedValueOnce(zodError)
    const req = createPostRequest({})
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.errors[0].message).toBe('Invalid email')
  })

  it('should return a 500 on error', async () => {
    mockedCreateUser.mockRejectedValueOnce(new Error('unknown'))
    const req = createPostRequest({ email: 'a@example.com', password: '123456', firstname: 'A', lastname: 'B' })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})
