import mongoose from 'mongoose'

export const kataEntity = () => {
  const userSchema = new mongoose.Schema({
    name: String,
    description: String,
    level: Number,
    user: Number,
    date: Date,
    valoration: Number,
    chances: Number
  })
  return mongoose.models.katas || mongoose.model('katas', userSchema)
}
