const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = {
  getQuizzes: async () => {
    const res = await fetch(`${BASE_URL}/quizzes`)
    return res.json()
  },

  getQuiz: async (id: string) => {
    const res = await fetch(`${BASE_URL}/quizzes/${id}`)
    return res.json()
  },

  createQuiz: async (data: unknown) => {
    const res = await fetch(`${BASE_URL}/quizzes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  deleteQuiz: async (id: string) => {
    await fetch(`${BASE_URL}/quizzes/${id}`, { method: 'DELETE' })
  },
}
