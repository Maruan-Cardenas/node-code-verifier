import { userEntity } from '../entities/User.entity'

import { LogError, LogSuccess } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'

// Enviroment variables
import dotenv from 'dotenv'

// BCRYPT from password
import bcrypt from 'bcrypt'

// JWT from token
import jwt from 'jsonwebtoken'

// Configuration of environment variables
dotenv.config()

// Obtain Secret key to generate jwt
const secret = process.env.SECRETKEY || 'secretKey'

// CRUD

/**
  * Method to obtain all User from collection "Users" in Mongo Server
  */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()

    LogSuccess('[SUSCESS] GetAllUser')

    // Search all users
    return await userModel.find()
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
    return await userModel.findById(id)
  } catch (error) {
    LogError('[ERROR] GetUserById ' + error)
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

// - Create new User
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    LogSuccess('[SUSCESS] CreateUser')

    // Create new user
    return await userModel.create(user)
  } catch (error) {
    LogError('[ERROR] CreateUser ' + error)
  }
}

// - Update User by ID
export const updateUserById = async (id: string, user: any): Promise<any | undefined> => {
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
