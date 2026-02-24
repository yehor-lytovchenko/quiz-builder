'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../services/api'

type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX'

interface Option {
  text: string
  isCorrect: boolean
}

interface Question {
  text: string
  type: QuestionType
  answer: string
  options: Option[]
}

const emptyQuestion = (): Question => ({
  text: '',
  type: 'BOOLEAN',
  answer: 'true',
  options: [{ text: '', isCorrect: false }],
})

export default function CreatePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([emptyQuestion()])

  const updateQuestion = (i: number, data: Partial<Question>) => {
    setQuestions(questions.map((q, idx) => (idx === i ? { ...q, ...data } : q)))
  }

  const changeType = (i: number, type: QuestionType) => {
    updateQuestion(i, {
      type,
      answer: type === 'BOOLEAN' ? 'true' : '',
      options: [{ text: '', isCorrect: false }],
    })
  }

  const addOption = (i: number) => {
    const options = [...questions[i].options, { text: '', isCorrect: false }]
    updateQuestion(i, { options })
  }

  const updateOption = (qi: number, oi: number, data: Partial<Option>) => {
    const options = questions[qi].options.map((o, idx) =>
      idx === oi ? { ...o, ...data } : o,
    )
    updateQuestion(qi, { options })
  }

  const removeOption = (qi: number, oi: number) => {
    const options = questions[qi].options.filter((_, idx) => idx !== oi)
    updateQuestion(qi, { options })
  }

  const removeQuestion = (i: number) => {
    setQuestions(questions.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async () => {
    if (!title.trim()) return alert('Add a title')
    await api.createQuiz({ title, questions })
    router.push('/quizzes')
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

      <input
        className="w-full border rounded p-2 mb-6"
        placeholder="Quiz title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <div key={i} className="border rounded p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Question {i + 1}</span>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(i)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            )}
          </div>

          <input
            className="w-full border rounded p-2 mb-2"
            placeholder="Question text"
            value={q.text}
            onChange={(e) => updateQuestion(i, { text: e.target.value })}
          />

          <select
            className="w-full border rounded p-2 mb-3"
            value={q.type}
            onChange={(e) => changeType(i, e.target.value as QuestionType)}
          >
            <option value="BOOLEAN">Boolean</option>
            <option value="INPUT">Input</option>
            <option value="CHECKBOX">Checkbox</option>
          </select>

          {q.type === 'BOOLEAN' && (
            <div className="flex gap-4">
              {['true', 'false'].map((val) => (
                <label
                  key={val}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={q.answer === val}
                    onChange={() => updateQuestion(i, { answer: val })}
                  />
                  {val === 'true' ? 'True' : 'False'}
                </label>
              ))}
            </div>
          )}

          {q.type === 'INPUT' && (
            <input
              className="w-full border rounded p-2"
              placeholder="Correct answer"
              value={q.answer}
              onChange={(e) => updateQuestion(i, { answer: e.target.value })}
            />
          )}

          {q.type === 'CHECKBOX' && (
            <div className="space-y-2">
              {q.options.map((o, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={o.isCorrect}
                    onChange={(e) =>
                      updateOption(i, oi, { isCorrect: e.target.checked })
                    }
                  />
                  <input
                    className="flex-1 border rounded p-1"
                    placeholder={`Option ${oi + 1}`}
                    value={o.text}
                    onChange={(e) =>
                      updateOption(i, oi, { text: e.target.value })
                    }
                  />
                  {q.options.length > 1 && (
                    <button
                      onClick={() => removeOption(i, oi)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addOption(i)}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add option
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => setQuestions([...questions, emptyQuestion()])}
        className="w-full border-dashed border-2 rounded p-2 mb-4 text-gray-500 hover:text-gray-700"
      >
        + Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
      >
        Create Quiz
      </button>
    </main>
  )
}
