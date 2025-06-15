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
  },
}))

import prisma from '@/lib/prisma'
import { createUser, validateLoginAndReturnSession } from '@/services/userService'

const mockCreate = prisma.userModel.create as ReturnType<typeof vi.fn>
const mockFindUnique = prisma.userModel.findUnique as ReturnType<typeof vi.fn>
const mockUpdate = prisma.userModel.update as ReturnType<typeof vi.fn>

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create the user with a hashed password', async () => {
    mockCreate.mockResolvedValue({ id: '1', email: 'test@example.com' })

    const userInput = {
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'Pass1234!',
      confirmPassword: 'Pass1234!',
    }

    const result = await createUser(userInput)
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        firstname: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        password: 'hashedpw', // should match mocked hash
      },
    })
    expect(result).toEqual({ id: '1', email: 'test@example.com' })
  })

  describe('validateLoginAndReturnSession', () => {
    it('should return null if no user with matching email is found', async () => {
      mockFindUnique.mockResolvedValue(null);

      const result = await validateLoginAndReturnSession('notfound@example.com', 'irrelevant');
      expect(result).toBeNull();
    });

    it('should return null if the password hash check fails', async () => {
      mockFindUnique.mockResolvedValue({ email: 'user@example.com', password: 'hashedpw' });

      const result = await validateLoginAndReturnSession('user@example.com', 'wrongpw');
      expect(result).toBeNull();
    });

    it('should update the user model with the session token and return it on success', async () => {
      const mockUser = { email: 'user@example.com', password: 'hashedpw' };
      mockFindUnique.mockResolvedValue(mockUser);
      mockUpdate.mockResolvedValue({});

      const result = await validateLoginAndReturnSession('user@example.com', 'correctpw');
      expect(typeof result).toBe('string');
      expect(result).toHaveLength(21); 

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { email: 'user@example.com' },
        data: { session: result }
      });
    });
  });

})


