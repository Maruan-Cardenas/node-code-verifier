import { userEntity } from '../entities/User.entity'

import { LogError, LogSuccess } from '../../utils/logger'

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

// TODO:
// - Get User by ID
// - Get User by email
