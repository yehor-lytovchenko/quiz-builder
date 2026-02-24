'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '../../services/api'

interface Option {
  id: string
  text: string
  isCorrect: boolean
}

interface Question {
  id: string
  text: string
  type: string
  answer: string | null
  options: Option[]
}

interface Quiz {
  id: string
  title: string
  questions: Question[]
}

export default function QuizDetailPage() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    api.getQuiz(id as string).then(setQuiz)
  }, [id])

  if (!quiz) return <p className="p-6">Loading...</p>

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>

      <ul className="space-y-4">
        {quiz.questions.map((q, i) => (
          <li key={q.id} className="border rounded p-4">
            <p className="font-medium mb-2">
              {i + 1}. {q.text}
            </p>

            {q.type === 'BOOLEAN' && (
              <div className="flex gap-4 text-sm text-gray-600">
                <span
                  className={
                    q.answer === 'true' ? 'font-bold text-green-600' : ''
                  }
                >
                  ✓ True
                </span>
                <span
                  className={
                    q.answer === 'false' ? 'font-bold text-green-600' : ''
                  }
                >
                  ✓ False
                </span>
              </div>
            )}

            {q.type === 'INPUT' && (
              <p className="text-sm text-gray-600">
                Answer: <span className="font-medium">{q.answer}</span>
              </p>
            )}

            {q.type === 'CHECKBOX' && (
              <ul className="space-y-1 text-sm">
                {q.options.map((o) => (
                  <li
                    key={o.id}
                    className={
                      o.isCorrect
                        ? 'text-green-600 font-medium'
                        : 'text-gray-600'
                    }
                  >
                    {o.isCorrect ? '✓' : '○'} {o.text}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
