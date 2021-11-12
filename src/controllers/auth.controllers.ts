import Express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { KeyJwt } from '../assets/assets'
dotenv.config()

const Register = require('../models/sign.models')
const router = Express.Router()

//Get sign

router.get('/sign', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'sign isnt allow method get, only post' })
})

//POST Sign
router.post('/sign', async (req: Request, res: Response) => {
  const register = new Register({
    ...req.body,
  })
  const user = await Register.findOne({ username: register.username })
  if (user) {
    res.status(405).json({
      authentication: false,
      type: 'sign',
      message: 'Error: user registred',
    })
    return
  }
  try {
    register.password = await register.hashSync(register?.password)
    await register.save()
    const token = jwt.sign({ id: register._id }, KeyJwt())
    res.status(200).json({
      authentication: true,
      user: {
        id: register._id,
        username: register.username,
      },
      type: 'Sign',
      token,
      message: 'User registred successfully',
    })
  } catch (error) {
    console.log(error)
  }
})

//Log Post

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const user = await Register.findOne({ username: username })
    if (!user) {
      return res.status(404).send({
        authentication: false,
        type: 'login',
        message: 'user no logged',
      })
    }
    const passvalid = await user.compareSync(password)
    if (!passvalid) {
      return res.status(401).json({
        authentication: false,
        message: 'password-incorrect',
      })
    }
    const token = await jwt.sign({ id: user._id }, KeyJwt())
    res.status(200).json({
      authentication: true,
      type: 'Login',
      user: {
        id: user._id,
        username,
      },
      token,
      message: 'User logged successfully',
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
