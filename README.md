This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# URL Shortener 🔗

A modern URL shortener built with Next.js 15, TypeScript, and PostgreSQL.

## Features

- Shorten long URLs instantly
- Copy shortened URLs to clipboard
- Track view count per URL
- Recent URLs list (last 5)
- Automatic redirection via short codes
- Clean and responsive UI with shadcn/ui

## Tech Stack

- **Next.js 15** — App Router
- **TypeScript**
- **PostgreSQL** — local database via pgAdmin
- **Prisma ORM** — database client & migrations
- **Tailwind CSS** — styling
- **shadcn/ui** — UI components
- **nanoid** — short code generation
- **Lucide React** — icons

## Project Structure

```
url-shortener/
├── app/
│   ├── [shortcode]/
│   │   └── page.tsx        # Redirect to original URL
│   ├── api/
│   │   ├── shorten/
│   │   │   └── route.ts    # POST - create short URL
│   │   └── urls/
│   │       └── route.ts    # GET - fetch recent URLs
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── input.tsx
│   ├── shorten-form.tsx
│   ├── url-list.tsx
│   └── url-shortener-container.tsx
├── lib/
│   └── db.ts
├── prisma/
│   └── schema.prisma
└── .env
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 17

### Installation

```bash
git clone https://github.com/mohsine-seg123/url-shortener.git
cd url-shortener
npm install
```

### Environment Variables

Create a `.env` file at the root:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/url_shortener"
```

### Database Setup

```bash
npx prisma db push
npx prisma generate
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/shorten` | Create a shortened URL |
| GET | `/api/urls` | Get 5 most recent URLs |
| GET | `/[shortcode]` | Redirect to original URL |

## Database Schema

```prisma
model Url {
  id          String   @id @default(cuid())
  originalUrl String
  shortUrl    String   @unique
  createdAt   DateTime @default(now())
  visits      Int      @default(0)
}
```

## License

MIT