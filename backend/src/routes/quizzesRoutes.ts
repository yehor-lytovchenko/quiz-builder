import { Router } from 'express'
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  deleteQuiz,
} from '../controllers/quizzesController'

const router = Router()

router.get('/', getAllQuizzes)
router.get('/:id', getQuizById)
router.post('/', createQuiz)
router.delete('/:id', deleteQuiz)

export default router
