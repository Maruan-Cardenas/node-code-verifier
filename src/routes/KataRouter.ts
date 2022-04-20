import { LogInfo } from '../utils/logger'
import express, { Request, Response } from 'express'
import { KataController } from '../controller/KatasController'
import { IKatas, KataLevel } from '../domain/interfaces/Ikatas.interface'

// JWT Verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Body Parser (Read JSON form body in request)
import bodyParser from 'body-parser'
// middleware to read the body of the request
const jsonParser = bodyParser.json()

// Router from express
const katasRouter = express.Router()

// http://localhost:8000/api/katas?id=62559ddb78cfe6203f2339d3
katasRouter.route('/')
  // GET
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    LogInfo(`[GET] /api/katas?id=${id}`)

    // Pagination
    const page: any = req?.query?.page || 1
    const limit: any = req?.query?.limit || 10
    // Controller Instance to excute method
    const controller: KataController = new KataController()
    // Obtain a Response
    const response: any = await controller.getKatas(page, limit, id)
    // Send to the client the response
    return res.send(response)
  })
  // Delete
  .delete(verifyToken, async (req: Request, res: Response) => {
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
  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
    LogInfo('[POST] /api/katas')

    const name: string = req?.body?.name
    const description: string = req?.body?.description || 'Default Description'
    const level: KataLevel = req?.body?.level || KataLevel.BASIC
    const intents: number = req?.body?.intents || 0
    const stars: number = req?.body?.stars || 0
    const participants: [string] = req?.body?.participants || []
    const creator: string = req?.body?.creator
    const solutions: string = req?.body?.solutions || 'Default Solution'

    let response

    if (name && description && level && intents >= 0 && stars >= 0 && participants && creator && solutions) {
      const kata: IKatas = {
        name,
        description,
        level,
        solutions,
        intents,
        stars,
        creator,
        participants
      }

      // Controller Instance to excute method
      const controller: KataController = new KataController()
      // Obtain a Response
      const Response: any = await controller.createKatas(kata)
      // Send to the client the response
      response = res.send(Response)
    } else {
      response = res.status(400).send({
        status: 400,
        message: '[ERROR]: Kata can not be created, Please provide all the required fields'
      })
    }
    return response
  })

  // PUT
  .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
    LogInfo('[POST] /api/katas')
    const id = req?.body?.id
    const name: string = req?.body?.name
    const description: string = req?.body?.description
    const level: KataLevel = req?.body?.level
    const intents: number = req?.body?.intents
    const stars: number = req?.body?.stars
    const participants: [string] = req?.body?.participants
    const creator: string = req?.body?.creator
    const solutions: string = req?.body?.solutions

    let response

    if (id) {
      const kata: IKatas = {
        name,
        description,
        level,
        solutions,
        intents,
        stars,
        creator,
        participants
      }

      // Controller Instance to excute method
      const controller: KataController = new KataController()
      // Obtain a Response
      const Response: any = await controller.updateKatas(id, kata)
      // Send to the client the response
      response = res.send(Response)
    } else {
      response = res.status(400).send({
        status: 400,
        message: '[ERROR]: Kata can not be created, Please provide all the required fields'
      })
    }
    return response
  })

// Export HeelloRouter

export default katasRouter
