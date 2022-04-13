import { LogInfo } from '../utils/logger'
import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'

// Router from express
const usersRouter = express.Router()

// http://localhost:8000/api/users?id=62559ddb78cfe6203f2339d3
usersRouter.route('/')
  // GET
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    LogInfo(`[GET] /api/users?id=${id}`)
    // Controller Instance to excute method
    const controller: UserController = new UserController()
    // Obtain a Response
    const response: any = await controller.getUsers(id)
    // Send to the client the response
    return res.send(response)
  })
  // Delete
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    LogInfo(`[DELETE] /api/users?id=${id}`)
    // Controller Instance to excute method
    const controller: UserController = new UserController()
    // Obtain a Response
    const response: any = await controller.deleteUsers(id)
    // Send to the client the response
    return res.send(response)
  })
  // POST
  .post(async (req: Request, res: Response) => {
    LogInfo('[POST] /api/users')
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age
    // Controller Instance to excute method
    const controller: UserController = new UserController()
    const user = {
      name,
      email,
      age
    }
    // Obtain a Response
    const response: any = await controller.createUsers(user)
    // Send to the client the response
    return res.send(response)
  })
  // PUT
  .put(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age
    const user = {
      name,
      email,
      age
    }
    LogInfo(`[PUT] /api/users?id=${id}`)
    // Controller Instance to excute method
    const controller: UserController = new UserController()
    // Obtain a Response
    const response: any = await controller.updateUsers(id, user)
    // Send to the client the response
    return res.send(response)
  })

// Export HeelloRouter

export default usersRouter
