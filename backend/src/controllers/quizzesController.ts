import { Request, Response } from 'express'
import prisma from '../prisma'

interface OptionInput {
  text: string
  isCorrect: boolean
}

interface QuestionInput {
  text: string
  type: string
  answer?: string
  options?: OptionInput[]
}

interface CreateQuizBody {
  title: string
  questions: QuestionInput[]
}

export const getAllQuizzes = async (req: Request, res: Response) => {
  const quizzes = await prisma.quiz.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: 'desc' },
  })
  res.json(quizzes)
}

export const getQuizById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: req.params.id },
    include: {
      questions: { include: { options: true }, orderBy: { order: 'asc' } },
    },
  })
  if (!quiz) return res.status(404).json({ error: 'Not found' })
  res.json(quiz)
}

export const createQuiz = async (
  req: Request<object, object, CreateQuizBody>,
  res: Response,
) => {
  const { title, questions } = req.body
  const quiz = await prisma.quiz.create({
    data: {
      title,
      questions: {
        create: questions.map((q: QuestionInput, i: number) => ({
          text: q.text,
          type: q.type,
          order: i,
          answer: q.answer ?? null,
          options: q.options
            ? {
                create: q.options.map((o: OptionInput) => ({
                  text: o.text,
                  isCorrect: o.isCorrect,
                })),
              }
            : undefined,
        })),
      },
    },
    include: { questions: { include: { options: true } } },
  })
  res.status(201).json(quiz)
}

export const deleteQuiz = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  await prisma.quiz.delete({ where: { id: req.params.id } })
  res.status(204).send()
}
