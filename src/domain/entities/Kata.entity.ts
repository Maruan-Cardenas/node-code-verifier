import mongoose from 'mongoose'

export const userEntity = () => {
  const userSchema = new mongoose.Schema({
    name: String,
    description: String,
    level: Number,
    User: Number,
    Date: Date,
    Valoration: Number,
    Chances: Number
  })
  return mongoose.model('User', userSchema)
}
