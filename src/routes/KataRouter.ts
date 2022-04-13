import { LogInfo } from '../utils/logger'
import express, { Request, Response } from 'express'
import { KataController } from '../controller/KatasController'

// Router from express
const katasRouter = express.Router()

// http://localhost:8000/api/katas?id=62559ddb78cfe6203f2339d3
katasRouter.route('/')
  // GET
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    LogInfo(`[GET] /api/katas?id=${id}`)
    // Controller Instance to excute method
    const controller: KataController = new KataController()
    // Obtain a Response
    const response: any = await controller.getKatas(id)
    // Send to the client the response
    return res.send(response)
  })
  // Delete
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    LogInfo(`[DELETE] /api/users?id=${id}`)
    // Controller Instance to excute method
    const controller: KataController = new KataController()
    // Obtain a Response
    const response: any = await controller.deleteKatas(id)
    // Send to the client the response
    return res.send(response)
  })
  // POST
  .post(async (req: Request, res: Response) => {
    LogInfo('[POST] /api/katas')
    const name: any = req?.query?.name
    const description: any = req?.query?.description
    const level: any = req?.query?.level
    const user: any = req?.query?.user
    const date: any = req?.query?.date
    const valoration: any = req?.query?.valoration
    const chances: any = req?.query?.chances
    const kata = {
      name,
      description,
      level,
      user,
      date,
      valoration,
      chances
    }

    // Controller Instance to excute method
    const controller: KataController = new KataController()
    // Obtain a Response
    const response: any = await controller.createKatas(kata)
    // Send to the client the response
    return res.send(response)
  })
  // PUT
  .put(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const description: any = req?.query?.description
    const level: any = req?.query?.level
    const user: any = req?.query?.user
    const date: any = req?.query?.date
    const valoration: any = req?.query?.valoration
    const chances: any = req?.query?.chances
    const kata = {
      name,
      description,
      level,
      user,
      date,
      valoration,
      chances
    }
    LogInfo(`[PUT] /api/katas?id=${id}`)
    // Controller Instance to excute method
    const controller: KataController = new KataController()
    // Obtain a Response
    const response: any = await controller.updateKatas(id, kata)
    // Send to the client the response
    return res.send(response)
  })

// Export HeelloRouter

export default katasRouter
