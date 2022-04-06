import express, { Request, Response } from 'express'
import { HelloController } from '../controller/HelloController'
import { LogInfo } from '../utils/logger'

// Router from express
const helloRouter = express.Router()

// http://localhost:8000/api/hello?name=Maruan/
helloRouter.route('/')
  // GET
  .get(async (req: Request, res: Response) => {
    // Obatain a Query Param
    const name: any = req?.query?.name
    LogInfo(`Query Param: ${name}`)
    // Controller Instance to excute method
    const controller: HelloController = new HelloController()
    // Obtain a Response
    const response: any = await controller.getMessage(name)
    // Send to the client the response
    return res.send(response)
  })

// Export HeelloRouter

export default helloRouter
