import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

interface IUser {
  avatar: string
  name: string
}

interface IPost {
  user: IUser
  shareurl: string
}

const Post = new mongoose.Schema<IPost>({
  user: {
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
  },
})
