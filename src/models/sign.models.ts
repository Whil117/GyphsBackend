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

User.methods.hashSync = async (password: string) => {
  const salt = await bcryptjs.genSaltSync(10)
  return bcryptjs.hashSync(password, salt)
}
User.methods.compareSync = function (password: string) {
  return bcryptjs.compareSync(password, this.password)
}

module.exports = mongoose.model('User', User)
