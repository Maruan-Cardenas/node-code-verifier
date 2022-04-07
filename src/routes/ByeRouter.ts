import { ByeController } from '../controller/byeController'
import express, { Request, Response } from 'express'
import { LogInfo } from '../utils/logger'
import { BayResponse } from '../controller/types'

// Router from express
const byeRouter = express.Router()

// http://localhost:8000/api/hello?name=Maruan/
byeRouter.route('/')
  // GET
  .get(async (req: Request, res: Response) => {
    // Obatain a Query Param
    const name: any = req?.query?.name
    LogInfo(`Query Param: ${name}`)
    // Controller Instance to excute method
    const controller: ByeController = new ByeController()
    // Obtain a Response
    const response: BayResponse = await controller.getMessage(name)
    // Send to the client the response
    return res.send(response)
  })

// Export HeelloRouter

export default byeRouter
