import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IUserController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'

// ORM - Users Collection
import { updateUserById, createUser, deleteUserById, getAllUsers, getUserById } from '../domain/orm/User.orm'

@Route('api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Endpoint to retrieve the Users in the Collection "Users" fron the database
   * @param {string} id - ID of the User to retrieve(optional)
   * @returns {Promise<any>} All user or user found by ID
  */
 @Get('/')
  public async getUsers (@Query()id?: string): Promise<any> {
    if (id) {
      LogSuccess(`[/api/Users] Get User by ID:  + ${id}`)
      const response = await getUserById(id)
      return response
    } else {
      LogSuccess('[/api/Users] Get All users Request')

      const response = await getAllUsers()

      return response
    }
  }

 /**
   * Endpoint to delete the Users in the Collection "Users" fron the database
   * @param {string} id - ID of the User to delete (optional)
   * @returns message informing if deletion was correct
  */
  @Delete('/')
 public async deleteUsers (@Query()id?: string): Promise<any> {
   if (id) {
     LogSuccess(`[/api/Users] Detele User by ID:  + ${id}`)
     await deleteUserById(id)
       .then(() => {
         return {
           message: `User with ID: ${id} was deleted`
         }
       })
   } else {
     LogWarning('[/api/Users] Delete user Failed, Request without ID')

     return {
       message: 'Please provide an ID to remove'
     }
   }
 }

  @Post('/')
  public async createUsers (user: any): Promise<any> {
    LogSuccess('[/api/Users] Create User Request')

    await createUser(user)
      .then(() => {
        return {
          message: 'User created'
        }
      })
  }

  @Put('/')
  public async updateUsers (@Query()id: string, @Query()user: any): Promise<any> {
    if (id) {
      LogSuccess(`[/api/Users] Updateuser User by ID: ${id} and user: ${user}`)
      await updateUserById(id, user)
        .then(() => {
          return {
            message: `User with ID: ${id} updated successfully`
          }
        })
    } else {
      LogWarning('[/api/Users] Update user Failed, Request without ID')

      return {
        message: 'Please provide an ID to Update'
      }
    }
  }
}
