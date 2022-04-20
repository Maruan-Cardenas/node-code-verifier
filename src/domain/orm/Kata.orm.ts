import { kataEntity } from '../entities/Kata.entity'

import { LogError, LogSuccess } from '../../utils/logger'
import { IKatas } from '../interfaces/Ikatas.interface'

// CRUD

/**
  * Method to obtain all Katas from collection "Katas" in Mongo Server
  */
export const getAllKatas = async (page:number, limit:number): Promise<any[] | undefined> => {
  try {
    const kataModel = kataEntity()

    LogSuccess('[SUSCESS] GetAllKatas')

    const response: any = {}
    // Search all users (using pagination)
    await kataModel.find({ isDeleted: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((katas: IKatas[]) => {
        response.katas = katas
      }).catch((err: any) => {
        LogError(`[ERROR] GetAllUser ${err}`)
      })

    // Count total documents in collection "Users"
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })
    return response
  } catch (error) {
    LogError('[ERROR] GetAllKatas ' + error)
  }
}

// Get a Kata by id
export const getKataById = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    LogSuccess('[SUSCESS] GetKataById')

    // Search kata by id
    return await kataModel.findById(id)
  } catch (error) {
    LogError('[ERROR] GetKataById ' + error)
  }
}

// - Delete Kata by ID
export const deleteKataById = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    LogSuccess('[SUSCESS] DeleteKataById')

    // Delete kata by id
    return await kataModel.findByIdAndDelete(id)
  } catch (error) {
    LogError('[ERROR] DeleteKataById ' + error)
  }
}

// - Create new Kata
export const createKata = async (kata: IKatas): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    LogSuccess('[SUSCESS] CreateUser')

    // Create new kata
    return await kataModel.create(kata)
  } catch (error) {
    LogError('[ERROR] Creating kata ' + error)
  }
}

// - Update Kata by ID
export const updateKataById = async (id: string, kata: IKatas): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    LogSuccess('[SUSCESS] UpdateKataById')

    // Update user by id
    return await kataModel.findByIdAndUpdate(id, kata)
  } catch (error) {
    LogError('[ERROR] UpdateKataById ' + error)
  }
}
