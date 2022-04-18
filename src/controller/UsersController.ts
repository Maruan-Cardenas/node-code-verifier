import { Delete, Get, Put, Query, Route, Tags } from 'tsoa'
import { IUserController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'

// ORM - Users Collection
import { updateUserById, deleteUserById, getAllUsers, getUserById } from '../domain/orm/User.orm'

@Route('api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Endpoint to retrieve the Users in the Collection "Users" fron the database
   * @param {string} id - ID of the User to retrieve(optional)
   * @returns {Promise<any>} All user or user found by ID
  */
 @Get('/')
  public async getUsers (@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
    let response
    if (id) {
      LogSuccess(`[/api/Users] Get User by ID:  + ${id}`)
      response = await getUserById(id)
    } else {
      LogSuccess('[/api/Users] Get All users Request')

      response = await getAllUsers(page, limit)
    }
    return response
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
           status: 204,
           message: `User with ID: ${id} was deleted`
         }
       })
   } else {
     LogWarning('[/api/Users] Delete user Failed, Request without ID')

     return {
       status: 400,
       message: 'Please provide an ID to remove'
     }
   }
 }

  @Put('/')
  public async updateUsers (@Query()id: string, @Query()user: any): Promise<any> {
    if (id) {
      LogSuccess(`[/api/Users] Updateuser User by ID: ${id} and user: ${user}`)
      await updateUserById(id, user)
        .then(() => {
          return {
            status: 204,
            message: `User with ID: ${id} updated successfully`
          }
        })
    } else {
      LogWarning('[/api/Users] Update user Failed, Request without ID')

      return {
        status: 400,
        message: 'Please provide an ID to Update'
      }
    }
  }
}
