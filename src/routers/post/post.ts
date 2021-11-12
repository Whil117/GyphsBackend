import Express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { KeyJwt } from '../assets/assets'
dotenv.config()

const Register = require('../models/sign.models')
const router = Express.Router()

// router.get('/post',async (req: Request, res: Response) => {

// })

router.post('/post', async (req: Request, res: Response) => {
  const { token }: { token: string } = req.headers['token']
  const { username, shareUrl } = req.body

  if (!token) {
    res.status(401).json({
      authentication: false,
      type: 'post',
      message: 'Token no provided',
    })
    return
  }
  const decoded = jwt.verify(token, KeyJwt())
  if (!decoded) {
    res.status(401).json({
      authentication: false,
      type: 'post',
      message: 'Token no valid',
    })
  }
  try {
    // const user = await Register.findById()
    const
  } catch (error) {}
})
