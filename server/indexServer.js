import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/dbConfig.js'
import productRoutes from './routes/productRoutes.js'
import {notFound,errorHandling} from './middleware/errorMiddleware.js'

//*Env Variables
dotenv.config()

const app = express()

//*MONGO CONNECTION
connectDB()

app.use((req, res, next) => {
  console.log(req.originalUrl)
  next()
})

app.get('/', (req, res) => {
  res.json('GOOD')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandling)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
