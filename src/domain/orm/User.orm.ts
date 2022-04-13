import { userEntity } from '../entities/User.entity'

import { LogError, LogSuccess } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    const userModel = userEntity()

    LogSuccess('[SUSCESS] LoginUser')

    // Find user by email
    return await userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {
      if (err) {
        LogError('[ERROR] LoginUser ' + err)
      } else if (!user) {
        LogError('[ERROR] LoginUser User not found')
      }

      // use Bcrypt to compare password
      const validPassword = bcrypt.compareSync(auth.password, user.password)

      if (!validPassword) {
        LogError('[ERROR 401] LoginUser Invalid password')
      }
      // Create JWT
      // TODO: Secret must be in env
      const token = jwt.sign({ email: user.email }, 'SECRET', {
        expiresIn: '24h'
      })
      return token
    })
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
