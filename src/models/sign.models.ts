// const mongoose = require('mongoose')
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

interface IUser {
  username: string
  password: string
}
const User = new mongoose.Schema<IUser>({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

User.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSaltSync(10)
  return bcryptjs.hashSync(password, salt)
}
User.methods.validPass = function (password: string) {
  return bcryptjs.compareSync(password, this.password)
}

module.exports = mongoose.model('User', User)
