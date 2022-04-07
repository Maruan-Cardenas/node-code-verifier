import { userEntity } from '../entities/User.entity'

import { LogError, LogSuccess } from '../../utils/logger'

// CRUD

/**
  * Method to obtain all User from collection "Users" in Mongo Server
  */
export const GetAllUser = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()
    LogSuccess('[SUSCESS] GetAllUser')
    // Search all users
    return await userModel.find({ isDelete: false })
  } catch (error) {
    LogError('[ERROR] GetAllUser ' + error)
    return undefined
  }
}

// TODO:
// - Get User by ID
// - Get User by email
// - Delete User by ID
// - Create new User
// - Update User by ID
