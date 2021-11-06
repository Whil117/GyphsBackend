import Express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { KeyJwt } from '../assets/assets'
dotenv.config()

const Register = require('../models/sign.models')
const router = Express.Router()

//POST Sign
router.post('/sign', async (req: Request, res: Response) => {
  const register = new Register({
    ...req.body,
  })
  const user = await Register.findOne({ username: register.username })
  if (user) {
    res.json({ auth: false, msg: 'user registred' })
  }
  try {
    register.password = await register.encryptPassword(register?.password)
    await register.save()
    const token = jwt.sign({ id: register._id }, KeyJwt())
    res.json({
      auth: true,
      id: register._id,
      type: 'Sign Up',
      username: register.username,
      token,
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
      return res.status(404).send('user not found')
    }
    const passvalid = await user.validPass(password)
    if (!passvalid) {
      res.status(401).json({ auth: false, token: null, password: 'incorrect' })
    }
    const token = await jwt.sign({ id: user._id }, KeyJwt())
    res.json({ auth: true, type: 'Sign In', username, token })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
