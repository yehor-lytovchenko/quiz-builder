import express from 'express'
import cors from 'cors'
import quizzesRouter from './routes/quizzesRoutes'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/quizzes', quizzesRouter)

app.listen(3001, () => console.log('Server running on http://localhost:3001'))
