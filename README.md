# Meeting Intelligence Platform

AI-powered meeting management application built with Next.js, Prisma, PostgreSQL, and OpenAI.

## Features

* Create meetings
* Store meeting transcripts
* AI-generated meeting summaries
* Extract action items
* Extract key decisions
* Search meetings
* View meeting history
* Modern responsive UI
* PostgreSQL database persistence
* Vercel deployment

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* Prisma ORM
* PostgreSQL
* OpenAI API
* Tailwind CSS
* Vercel

## Local Development

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_api_key
```

Run database migrations:

```bash
npx prisma migrate deploy
```

Start development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

## Deployment

The application is deployed on Vercel and connected to a PostgreSQL database.

## Future Improvements

* Meeting editing
* Meeting deletion workflow
* User authentication
* Team workspaces
* File uploads
* Audio transcription
* Analytics dashboard
* Export reports
