# E-Shop

A full-stack e-commerce application built with Next.js 14, PostgreSQL, Prisma, and NextAuth.js.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5 (email/password)
- **Email**: Resend
- **Testing**: Vitest

## Features

- 🔐 Email/password authentication
- 👑 First user automatically becomes admin
- 🛍️ Product management (admin)
- 📦 Order management with status tracking
- 📧 Email notifications (order confirmation + status updates)
- 🎨 Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL)

### Setup

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start PostgreSQL with Docker:
```bash
docker-compose up -d
```

4. Set up the database:
```bash
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

```bash
npm test
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js JWT signing |
| `NEXTAUTH_URL` | Base URL of the application |
| `RESEND_API_KEY` | API key for Resend email service |
| `FROM_EMAIL` | Sender email address |
