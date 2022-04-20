import { userEntity } from '../entities/User.entity'
import { kataEntity } from '../entities/Kata.entity'

import { LogError, LogSuccess } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'
import { IKatas } from '../interfaces/Ikatas.interface'

// Enviroment variables
import dotenv from 'dotenv'

// BCRYPT from password
import bcrypt from 'bcrypt'

// JWT from token
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

// Configuration of environment variables
dotenv.config()

// Obtain Secret key to generate jwt
const secret = process.env.SECRETKEY || 'secretKey'

// CRUD

/**
  * Method to obtain all User from collection "Users" in Mongo Server
  */
export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    LogSuccess('[SUSCESS] GetAllUser')
    const userModel = userEntity()

    const response: any = {}

    // Search all users (using pagination)
    await userModel.find({ isDeleted: false })
      .select('-password')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((users: IUser[]) => {
        response.users = users
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
    LogError('[ERROR] GetAllUser ' + error)
  }
}

// Get a user by id
export const getUserById = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    LogSuccess('[SUSCESS] GetUserById')

    // Search user by id
    return await userModel.findById(id).select('-password')
  } catch (error) {
    LogError('[ERROR] GetUserById ' + error)
  }
}

/**
  * Method to obtain all User from collection "Users" in Mongo Server
  */
export const getKatasFromUser = async (page: number, limit: number, id: string): Promise<any[] | undefined> => {
  try {
    LogSuccess('[SUSCESS] GetAllUser')
    const userModel = userEntity()
    const kataModel = kataEntity()

    let katasFound: IKatas[] = []
    const response: any = {}

    await userModel.findById(id)
      .then(async (user: IUser) => {
        response.user = user.email

        // Create types to search katas
        const objectIds: mongoose.Types.ObjectId[] = []
        user.katas.forEach((katasID: string) => {
          const objectID = new mongoose.Types.ObjectId(katasID)
          objectIds.push(objectID)
        })

        await kataModel.find({ _id: { $in: objectIds } })
          .then((katas: IKatas[]) => {
            katasFound = katas
          })
      }).catch((err: any) => {
        LogError(`[ERROR] get katras from user ${err}`)
      })
    response.katas = katasFound
    return response
  } catch (error) {
    LogError('[ERROR] GetAllUser ' + error)
  }
}

// - Delete User by ID
export const deleteUserById = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    LogSuccess('[SUSCESS] DeleteUserById')

    // Delete user by id
    return await userModel.findByIdAndDelete(id)
  } catch (error) {
    LogError('[ERROR] DeleteUserById ' + error)
  }
}

// - Update User by ID
export const updateUserById = async (id: string, user: IUser): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    LogSuccess('[SUSCESS] UpdateUserById')

    // Update user by id
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    LogError('[ERROR] UpdateUserById ' + error)
  }
}

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    LogSuccess('[SUSCESS] RegisterUser')

    // Create new user
    return await userModel.create(user)
  } catch (error) {
    LogError('[ERROR] RegisterUser ' + error)
  }
}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    LogSuccess('[SUSCESS] LoginUser')

    const userModel = userEntity()

    let userFound: IUser | undefined

    // Check if user exists by email
    await userModel.findOne({ email: auth.email })
      .then((user: IUser) => {
        userFound = user
      })
      .catch((error) => {
        LogError('[ERROR Auth in ORM ] LoginUser ' + error)
        throw new Error('[ERROR Auth in ORM ] LoginUser ' + error)
      })

    // Check if password is valid (compare with bcrypt)
    const validPassword = bcrypt.compareSync(auth.password, userFound!.password)

    if (!validPassword) {
      LogError('[ERROR Auth in ORM ] password invalid')
      throw new Error('[ERROR Auth in ORM ] password invalid')
    }

    // Gnerete token
    const token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: '2h'
    })

    return {
      user: userFound,
      token
    }
  } catch (error) {
    LogError('[ERROR] LoginUser ' + error)
  }
}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
  try {
    LogSuccess('[SUSCESS] LogoutUser')

    // Create new user
  } catch (error) {
    LogError('[ERROR] LogoutUser ' + error)
  }
}
