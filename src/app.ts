import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import './connect/connect'

const PORT = process.env.PORT || 8000
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
dotenv.config()

const auth = require('./controllers/auth.controllers')

app.use(auth)

app.get('/', (req, res) => res.send('Gyphs'))
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
