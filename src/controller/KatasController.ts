import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKataController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'

// ORM - Users Collection
import { updateKataById, createKata, deleteKataById, getAllKatas, getKataById } from '../domain/orm/Kata.orm'

@Route('api/users')
@Tags('UserController')
export class KataController implements IKataController {
  /**
   * Endpoint to retrieve the katas in the Collection "Katas" fron the database
   * @param {string} id - ID of the kata to retrieve(optional)
   * @returns {Promise<any>} All katas or kata found by ID
  */
 @Get('/')
  public async getKatas (@Query()id?: string): Promise<any> {
    if (id) {
      LogSuccess(`[/api/katas] Get kats by ID:  + ${id}`)
      const response = await getKataById(id)
      return response
    } else {
      LogSuccess('[/api/katas] Get All katas Request')

      const response = await getAllKatas()

      return response
    }
  }

 /**
   * Endpoint to delete the katas in the Collection "Katas" fron the database
   * @param {string} id - ID of the kata to delete (optional)
   * @returns message informing if deletion was correct
  */
  @Delete('/')
 public async deleteKatas (@Query()id?: string): Promise<any> {
   if (id) {
     LogSuccess(`[/api/katas] Detele Kata by ID:  + ${id}`)
     await deleteKataById(id)
       .then(() => {
         return {
           message: `Kata with ID: ${id} was deleted`
         }
       })
   } else {
     LogWarning('[/api/Katas] Delete Kata Failed, Request without ID')

     return {
       message: 'Please provide an ID to remove'
     }
   }
 }

  @Post('/')
  public async createKatas (user: any): Promise<any> {
    LogSuccess('[/api/Katas] Create Kata Request')

    await createKata(user)
      .then(() => {
        return {
          message: 'Kata created'
        }
      })
  }

  @Put('/')
  public async updateKatas (@Query()id: string, @Query()user: any): Promise<any> {
    if (id) {
      LogSuccess(`[/api/Katas] Updateuser Kata by ID: ${id} and Kata: ${user}`)
      await updateKataById(id, user)
        .then(() => {
          return {
            message: `Kata with ID: ${id} updated successfully`
          }
        })
    } else {
      LogWarning('[/api/katas] Update kata Failed, Request without ID')

      return {
        message: 'Please provide an ID to Update'
      }
    }
  }
}
