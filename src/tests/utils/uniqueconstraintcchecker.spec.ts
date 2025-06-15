import { describe, it, expect } from 'vitest';
import { Prisma } from '@/generated/prisma';
import { isUniqueConstraintError } from '@/lib/utils/isUniqueConstraintError';

describe('isUniqueConstraintError', () => {
  it('returns true for PrismaClientKnownRequestError with code P2002 and matching field', () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed',
      'P2002',
      '1.0.0',
      { target: ['email'] }
    );

    error.meta= {target: ['email']}
    error.code = 'P2002'
    expect(isUniqueConstraintError(error, 'email')).toBe(true);
  });

  it('returns false if error is not PrismaClientKnownRequestError', () => {
    const error = new Error('Some error');
    expect(isUniqueConstraintError(error, 'email')).toBe(false);
  });

  it('returns false if error code is not P2002', () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      'Other error',
      'P2020',
      '1.0.0',
      { target: ['email'] }
    );
    error.code = 'P1001'
    expect(isUniqueConstraintError(error, 'email')).toBe(false);
  });

  it('returns false if field does not match target', () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed',
      'P2002',
      '1.0.0',
      { target: ['username'] }
    );
    error.meta= {target: ['susan']}
    error.code = 'P2002'
    expect(isUniqueConstraintError(error, 'email')).toBe(false);
  });

  
});
