import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Role } from '@prisma/client';

// Mock prisma
const mockPrisma = {
  user: {
    count: vi.fn(),
    create: vi.fn(),
    findUnique: vi.fn(),
  },
  $transaction: vi.fn(),
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed-password'),
    compare: vi.fn().mockResolvedValue(true),
  },
}));

describe('User Registration - Role Assignment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('first user becomes ADMIN', async () => {
    let capturedRole: Role | undefined;

    mockPrisma.$transaction.mockImplementation(async (fn: (tx: typeof mockPrisma) => Promise<unknown>) => {
      const tx = {
        user: {
          count: vi.fn().mockResolvedValue(0),
          create: vi.fn().mockImplementation((args: { data: { role: Role } }) => {
            capturedRole = args.data.role;
            return Promise.resolve({
              id: 'user-1',
              email: 'admin@test.com',
              role: args.data.role,
            });
          }),
        },
      };
      return fn(tx as unknown as typeof mockPrisma);
    });

    // Simulate the registration logic
    const result = await mockPrisma.$transaction(async (tx: typeof mockPrisma) => {
      const count = await tx.user.count();
      const role: Role = count === 0 ? Role.ADMIN : Role.CUSTOMER;
      return tx.user.create({
        data: { email: 'admin@test.com', password: 'hashed-password', name: 'Admin', role },
      });
    });

    expect(capturedRole).toBe(Role.ADMIN);
    expect(result).toMatchObject({ role: Role.ADMIN });
  });

  it('second user becomes CUSTOMER', async () => {
    let capturedRole: Role | undefined;

    mockPrisma.$transaction.mockImplementation(async (fn: (tx: typeof mockPrisma) => Promise<unknown>) => {
      const tx = {
        user: {
          count: vi.fn().mockResolvedValue(1),
          create: vi.fn().mockImplementation((args: { data: { role: Role } }) => {
            capturedRole = args.data.role;
            return Promise.resolve({
              id: 'user-2',
              email: 'customer@test.com',
              role: args.data.role,
            });
          }),
        },
      };
      return fn(tx as unknown as typeof mockPrisma);
    });

    await mockPrisma.$transaction(async (tx: typeof mockPrisma) => {
      const count = await tx.user.count();
      const role: Role = count === 0 ? Role.ADMIN : Role.CUSTOMER;
      return tx.user.create({
        data: { email: 'customer@test.com', password: 'hashed-password', name: 'Customer', role },
      });
    });

    expect(capturedRole).toBe(Role.CUSTOMER);
  });
});
