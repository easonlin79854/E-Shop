import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(
  to: string,
  orderNumber: string,
  totalAmount: string
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
    to,
    subject: `Order Confirmed: ${orderNumber}`,
    html: `<p>Thank you for your order! Your order number is <strong>${orderNumber}</strong>. Total: ${totalAmount}</p>`,
  });
}

export async function sendOrderStatusUpdateEmail(
  to: string,
  orderNumber: string,
  status: string
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
    to,
    subject: `Order ${orderNumber} Status Update`,
    html: `<p>Your order <strong>${orderNumber}</strong> status has been updated to: <strong>${status}</strong></p>`,
  });
}
