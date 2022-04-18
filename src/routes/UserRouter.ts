import { LogInfo } from '../utils/logger'
import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'

// JWT Verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Router from express
const usersRouter = express.Router()

// http://localhost:8000/api/users?id=62559ddb78cfe6203f2339d3
usersRouter.route('/')
  // GET
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    LogInfo(`[GET] /api/users?id=${id}`)

    // Pagination
    const page: any = req?.query?.page || 1
    const limit: any = req?.query?.limit || 10

    // Controller Instance to excute method
    const controller: UserController = new UserController()
    // Obtain a Response
    const response: any = await controller.getUsers(page, limit, id)
    // Send to the client the response
    return res.status(200).send(response)
  })
  // Delete
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    LogInfo(`[DELETE] /api/users?id=${id}`)
    // Controller Instance to excute method
    const controller: UserController = new UserController()
    // Obtain a Response
    const response: any = await controller.deleteUsers(id)
    // Send to the client the response
    return res.status(response.status).send(response)
  })
  // PUT
  .put(verifyToken, async (req: Request, res: Response) => {
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
    return res.status(response.status).send(response)
  })
// Export users Router

export default usersRouter

/**
 * Get Document => 200 OK
 * Creation Document => 201 OK
 * Deletion Document => 200 (Entity) / 204 (No return)
 * Update Document => 200 (Entity) / 204 (No return)
*/
