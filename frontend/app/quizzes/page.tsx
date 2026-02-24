'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../services/api'

interface Quiz {
  id: string
  title: string
  _count: { questions: number }
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    api.getQuizzes().then(setQuizzes)
  }, [])

  const handleDelete = async (id: string) => {
    await api.deleteQuiz(id)
    setQuizzes(quizzes.filter((q) => q.id !== id))
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Quiz
        </Link>
      </div>

      <ul className="space-y-3">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="flex justify-between items-center border rounded p-4"
          >
            <Link href={`/quizzes/${quiz.id}`} className="hover:underline">
              <p className="font-medium">{quiz.title}</p>
              <p className="text-sm text-gray-500">
                {quiz._count.questions} questions
              </p>
            </Link>
            <button
              onClick={() => handleDelete(quiz.id)}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
