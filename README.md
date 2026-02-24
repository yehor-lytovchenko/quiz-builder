# Quiz Builder

A full-stack quiz creation platform built with Express.js, Prisma, Next.js, and Tailwind CSS.

## Project Structure

```
quiz-builder/
├── backend/    # Express.js + Prisma
└── frontend/   # Next.js + Tailwind
```

## Setup

### Backend

```bash
cd backend
npm install
```

Create `.env` file:

```
DATABASE_URL="file:./prisma/dev.db"
```

```bash
npx prisma migrate dev --name init
npm run dev
```

Server runs on `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
```

Create `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
npm run dev
```

App runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | /quizzes     | List all quizzes |
| GET    | /quizzes/:id | Get quiz details |
| POST   | /quizzes     | Create a quiz    |
| DELETE | /quizzes/:id | Delete a quiz    |

## Sample Quiz

POST `http://localhost:3001/quizzes`:

```json
{
  "title": "Sample Quiz",
  "questions": [
    { "text": "Is the sky blue?", "type": "BOOLEAN", "answer": "true" },
    { "text": "What is 2+2?", "type": "INPUT", "answer": "4" },
    {
      "text": "Pick correct answers",
      "type": "CHECKBOX",
      "options": [
        { "text": "Option A", "isCorrect": true },
        { "text": "Option B", "isCorrect": false }
      ]
    }
  ]
}
```
