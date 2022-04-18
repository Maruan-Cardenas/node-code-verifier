import { kataEntity } from '../entities/Kata.entity'

import { LogError, LogSuccess } from '../../utils/logger'
import { IKatas } from '../interfaces/Ikatas.interface'

// CRUD

/**
  * Method to obtain all User from collection "Users" in Mongo Server
  */
export const getAllKatas = async (page:number, limit:number): Promise<any[] | undefined> => {
  try {
    const userModel = kataEntity()

    LogSuccess('[SUSCESS] GetAllKatas')

    const response: any = {}
    // Search all users (using pagination)
    await userModel.find({ isDeleted: false })
      .select('-password')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((katas: IKatas[]) => {
        response.katas = katas
      }).catch((err: any) => {
        LogError(`[ERROR] GetAllUser ${err}`)
      })

    // Count total documents in collection "Users"
    await userModel.countDocuments().then((total: number) => {
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
    const userModel = kataEntity()

    LogSuccess('[SUSCESS] GetKataById')

    // Search user by id
    return await userModel.findById(id)
  } catch (error) {
    LogError('[ERROR] GetKataById ' + error)
  }
}

// - Delete Kata by ID
export const deleteKataById = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = kataEntity()

    LogSuccess('[SUSCESS] DeleteKataById')

    // Delete user by id
    return await userModel.findByIdAndDelete(id)
  } catch (error) {
    LogError('[ERROR] DeleteKataById ' + error)
  }
}

// - Create new User
export const createKata = async (user: any): Promise<any | undefined> => {
  try {
    const userModel = kataEntity()

    LogSuccess('[SUSCESS] CreateUser')

    // Create new user
    return await userModel.create(user)
  } catch (error) {
    LogError('[ERROR] CreateUser ' + error)
  }
}

// - Update User by ID
export const updateKataById = async (id: string, user: any): Promise<any | undefined> => {
  try {
    const userModel = kataEntity()

    LogSuccess('[SUSCESS] UpdateKataById')

    // Update user by id
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    LogError('[ERROR] UpdateKataById ' + error)
  }
}

// TODO:
// - Get User by ID
// - Get User by email
