import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKataController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'

// ORM - Users Collection
import { updateKataById, createKata, deleteKataById, getAllKatas, getKataById } from '../domain/orm/Kata.orm'
import { IKatas } from '../domain/interfaces/Ikatas.interface'

@Route('api/katas')
@Tags('KatasController')
export class KataController implements IKataController {
  /**
   * Endpoint to retrieve the katas in the Collection "Katas" fron the database
   * @param {string} id - ID of the kata to retrieve(optional)
   * @returns {Promise<any>} All katas or kata found by ID
  */
 @Get('/')
  public async getKatas (@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
    let response: any
    if (id) {
      LogSuccess(`[/api/katas] Get kats by ID:  + ${id}`)
      response = await getKataById(id)
    } else {
      LogSuccess('[/api/katas] Get All katas Request')

      response = await getAllKatas(page, limit)
    }
    return response
  }

 /**
   * Endpoint to delete the katas in the Collection "Katas" fron the database
   * @param {string} id - ID of the kata to delete (optional)
   * @returns message informing if deletion was correct
  */
  @Delete('/')
 public async deleteKatas (@Query()id?: string): Promise<any> {
   let response
   if (id) {
     LogSuccess(`[/api/katas] Detele Kata by ID:  + ${id}`)
     await deleteKataById(id)
       .then(() => {
         response = {
           message: `Kata with ID: ${id} was deleted`
         }
       })
   } else {
     LogWarning('[/api/Katas] Delete Kata Failed, Request without ID')

     response = {
       message: 'Please provide an ID to remove'
     }
   }
   return response
 }

  @Post('/')
  public async createKatas (kata: IKatas): Promise<any> {
    LogSuccess('[/api/Katas] Create Kata Request')
    let response
    await createKata(kata)
      .then(() => {
        LogSuccess('[/api/Katas] Create Kata successfull')
        response = {
          message: 'Kata created'
        }
      }).catch((err) => {
        LogWarning(`[/api/Katas] Create Kata Failed: ${err}`)
        response = {
          message: 'Kata creation failed, please privide a valid kata'
        }
      })
    return response
  }

  @Put('/')
  public async updateKatas (@Query()id: string, @Query()kata: IKatas): Promise<any> {
    if (id) {
      LogSuccess(`[/api/Katas] Updateuser Kata by ID: ${id} and Kata: ${kata}`)
      await updateKataById(id, kata)
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
