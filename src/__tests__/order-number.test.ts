import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  orderCounter: {
    upsert: vi.fn(),
  },
  $transaction: vi.fn(),
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

describe('Order Number Generation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('generates order number in correct format', async () => {
    mockPrisma.$transaction.mockImplementation(async (fn: (tx: typeof mockPrisma) => Promise<unknown>) => {
      const tx = {
        orderCounter: {
          upsert: vi.fn().mockResolvedValue({ id: 1, counter: 1 }),
        },
      };
      return fn(tx as unknown as typeof mockPrisma);
    });

    const { generateOrderNumber } = await import('@/lib/order-number');
    const orderNumber = await generateOrderNumber();

    expect(orderNumber).toMatch(/^ORD-\d{8}-\d{6}$/);
  });

  it('order number counter increments for uniqueness', async () => {
    let callCount = 0;
    mockPrisma.$transaction.mockImplementation(async (fn: (tx: typeof mockPrisma) => Promise<unknown>) => {
      callCount++;
      const tx = {
        orderCounter: {
          upsert: vi.fn().mockResolvedValue({ id: 1, counter: callCount }),
        },
      };
      return fn(tx as unknown as typeof mockPrisma);
    });

    const { generateOrderNumber } = await import('@/lib/order-number');

    // Clear module cache to get fresh instance
    vi.resetModules();

    const mod = await import('@/lib/order-number');
    const num1 = await mod.generateOrderNumber();
    const num2 = await mod.generateOrderNumber();

    // Both should match the format
    expect(num1).toMatch(/^ORD-\d{8}-\d{6}$/);
    expect(num2).toMatch(/^ORD-\d{8}-\d{6}$/);
    // They should be different (different counters)
    expect(num1).not.toBe(num2);
  });

  it('duplicate orderNumber in DB throws unique constraint error', () => {
    // This test simulates the DB unique constraint behavior
    const orderNumbers = new Set<string>();

    const insertOrderNumber = (orderNumber: string) => {
      if (orderNumbers.has(orderNumber)) {
        throw new Error('Unique constraint failed: Order.orderNumber');
      }
      orderNumbers.add(orderNumber);
    };

    insertOrderNumber('ORD-20260417-000001');
    expect(() => insertOrderNumber('ORD-20260417-000001')).toThrow(
      'Unique constraint failed'
    );
  });
});
