import mongoose from 'mongoose'
import { IKatas } from '../interfaces/Ikatas.interface'

export const kataEntity = () => {
  const kataSchema = new mongoose.Schema<IKatas>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    intents: { type: Number, required: true },
    stars: { type: Number, required: true },
    creator: { type: String, required: true }, // user id
    solutions: { type: String, required: true },
    participants: { type: [String], required: true }
  })
  return mongoose.models.katas || mongoose.model('katas', kataSchema)
}
