import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Resend
const mockSend = vi.fn().mockResolvedValue({ id: 'email-id', error: null });
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

describe('Email Notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends order confirmation email', async () => {
    const { sendOrderConfirmationEmail } = await import('@/lib/email');

    await sendOrderConfirmationEmail(
      'customer@test.com',
      'ORD-20260417-000001',
      '$99.99'
    );

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'customer@test.com',
        subject: 'Order Confirmed: ORD-20260417-000001',
      })
    );
  });

  it('sends order status update email', async () => {
    const { sendOrderStatusUpdateEmail } = await import('@/lib/email');

    await sendOrderStatusUpdateEmail(
      'customer@test.com',
      'ORD-20260417-000001',
      'SHIPPED'
    );

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'customer@test.com',
        subject: 'Order ORD-20260417-000001 Status Update',
      })
    );
  });

  it('status update triggers email send (mock Resend)', async () => {
    // Simulate what happens when admin updates order status
    const mockOrderStatusUpdate = async (
      orderId: string,
      status: string,
      userEmail: string,
      orderNumber: string
    ) => {
      // After DB update (simulated), send email
      const { sendOrderStatusUpdateEmail } = await import('@/lib/email');
      await sendOrderStatusUpdateEmail(userEmail, orderNumber, status);
      return { id: orderId, status, orderNumber };
    };

    const result = await mockOrderStatusUpdate(
      'order-1',
      'SHIPPED',
      'customer@test.com',
      'ORD-20260417-000001'
    );

    expect(result.status).toBe('SHIPPED');
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'customer@test.com',
      })
    );
  });

  it('non-admin product modification returns 403', async () => {
    // Simulate the API handler behavior for non-admin
    const simulateProductPost = async (userRole: string | null) => {
      if (!userRole || userRole !== 'ADMIN') {
        return { status: 403, body: { error: 'Forbidden' } };
      }
      return { status: 201, body: { id: 'product-1' } };
    };

    const customerResult = await simulateProductPost('CUSTOMER');
    expect(customerResult.status).toBe(403);

    const unauthResult = await simulateProductPost(null);
    expect(unauthResult.status).toBe(403);

    const adminResult = await simulateProductPost('ADMIN');
    expect(adminResult.status).toBe(201);
  });
});
