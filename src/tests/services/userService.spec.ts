import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('bcrypt', () => {
  return {
    default: {
      hash: vi.fn(() => Promise.resolve('hashedpw')),
      compare: vi.fn((input, hash) => Promise.resolve(input === 'correctpw' && hash === 'hashedpw')),
    }
  }
})

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    userModel: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    session: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    }
  },
}))

import prisma from '@/lib/prisma'
import { createUser, validateLoginAndReturnSession, getLoggedInUser, logout } from '@/services/userService'

const mockCreateUserModel = prisma.userModel.create as ReturnType<typeof vi.fn>
const mockFindUniqueUserModel = prisma.userModel.findUnique as ReturnType<typeof vi.fn>
const mockUpdateUserModel = prisma.userModel.update as ReturnType<typeof vi.fn>

const mockFindUniqueSession = prisma.session.findUnique as ReturnType<typeof vi.fn>
const mockCreateSession = prisma.session.create as ReturnType<typeof vi.fn>
const mockDeleteSession = prisma.session.delete as ReturnType<typeof vi.fn>

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('create user', () => {
    it('should create the user with a hashed password', async () => {
      mockCreateUserModel.mockResolvedValue({ id: '1', email: 'test@example.com' })

      const userInput = {
        firstname: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        password: 'Pass1234!',
        confirmPassword: 'Pass1234!',
      }

      const result = await createUser(userInput)
      expect(mockCreateUserModel).toHaveBeenCalledWith({
        data: {
          firstname: 'Test',
          lastname: 'User',
          email: 'test@example.com',
          password: 'hashedpw', // should match mocked hash
        },
      })
      expect(result).toEqual({ id: '1', email: 'test@example.com' })
    })
  })

  describe('validateLoginAndReturnSession', () => {
    it('should return null if no user with matching email is found', async () => {
      mockFindUniqueUserModel.mockResolvedValue(null);

      const result = await validateLoginAndReturnSession('notfound@example.com', 'irrelevant');
      expect(result).toBeNull();
    });

    it('should return null if the password hash check fails', async () => {
      mockFindUniqueUserModel.mockResolvedValue({ email: 'user@example.com', password: 'hashedpw' });

      const result = await validateLoginAndReturnSession('user@example.com', 'wrongpw');
      expect(result).toBeNull();
    });

    it('should update the user model with the session token and return it on success', async () => {
      const mockUser = { email: 'user@example.com', password: 'hashedpw' };
      mockFindUniqueUserModel.mockResolvedValue(mockUser);
      mockUpdateUserModel.mockResolvedValue({});

      const result = await validateLoginAndReturnSession('user@example.com', 'correctpw');
      expect(typeof result).toBe('string');
      expect(result).toHaveLength(21);

      expect(mockCreateSession).toHaveBeenCalledOnce()
    });
  });

  describe('getLoggedInUser', async () => {
    it('should return null when cookie is undefined', async () => {
      const res = await getLoggedInUser(undefined)
      expect(res).toEqual(null)
    })

    it('should return null when session is not found', async () => {
      mockFindUniqueSession.mockResolvedValue(null);
      const res = await getLoggedInUser('non existant session')
      expect(res).toEqual(null)
    })

    it('should return the user when user is found', async () => {
      const session = {
        id: 1,
        token: "abc123fakeToken",
        userId: 1,
        createdAt: new Date("2025-06-15T12:00:00Z"),
        expiresAt: new Date("2025-06-15T12:30:00Z"),
        user: {
          id: 1,
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
          password: "hashedpassword123"
        }
      };

      mockFindUniqueSession.mockResolvedValue(session);
      const res = await getLoggedInUser('real session')
      expect(res).toEqual(session.user)
    })

  })

  describe('logout', () => {
    it('should call to delete the token', async () => { 
      await logout('session')
      expect(mockDeleteSession).toHaveBeenCalledOnce()
    })
  })

})