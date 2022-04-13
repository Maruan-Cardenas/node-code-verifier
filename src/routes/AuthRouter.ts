import express, { Request, Response } from 'express'
import { IUser } from '../domain/interfaces/IUser.interface'
import { AuthController } from '../controller/AuthController'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// BCRYPT from password
import bcrypt from 'bcrypt'

const authRouter = express.Router()

authRouter.route('/register')
  .post(async (req: Request, res: Response) => {
    const { name, email, password, age } = req.body
    let hashedPassword
    if (password && email && name && age) {
      // Obtain the password in request and cypher
      hashedPassword = await bcrypt.hash(password, 10)
      const newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        age
      }
      // Controller Instance to excute method
      const controller: AuthController = new AuthController()
      // Obtain a Response
      const response: any = await controller.registerUser(newUser)
      // Send to the client the response
      return res.status(200).send(response)
    }
  })
authRouter.route('/login')
  .post(async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (password && email) {
      const auth: IAuth = {
        email,
        password
      }
      // TODO: use IAuth
      // Controller Instance to excute method
      const controller: AuthController = new AuthController()
      // Obtain a Response
      const response: any = await controller.loginUser(auth)
      // Send to the client the response which includes the token
      return res.status(200).send(response)
    }
  })

export default authRouter
