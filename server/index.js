import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.route.js'

const app = express()

 const allowedOrigins = process.env.FRONTEND_URL.split(',')  || [];


app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(helmet({
  crossOriginEmbedderPolicy: false
}))


const PORT = 8000 || process.env.PORT


app.get('/', (req, res)=> {
  res.json({
    message : "server is running "+ PORT
  })
})

connectDB().then(
  app.listen(PORT, ()=> {
    console.log("server is running : ", PORT)
  })
)

app.use('/api/user', userRouter)