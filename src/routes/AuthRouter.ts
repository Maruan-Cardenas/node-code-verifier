import express, { Request, Response } from 'express'
import { IUser } from '../domain/interfaces/IUser.interface'
import { AuthController } from '../controller/AuthController'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// BCRYPT from password
import bcrypt from 'bcrypt'

// JWT Verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Body Parser (Read JSON form body in request)
import bodyParser from 'body-parser'
// middleware to read the body of the request
const jsonParser = bodyParser.json()

const authRouter = express.Router()

authRouter.route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    const { name, email, password, age } = req?.body
    if (password && email && name && age) {
      // Obtain the password in request and cypher
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        age,
        katas: []
      }
      // Controller Instance to excute method
      const controller: AuthController = new AuthController()
      // Obtain a Response
      const response: any = await controller.registerUser(newUser)
      // Send to the client the response
      return res.status(200).send(response)
    } else {
      return res.status(400).send({
        status: 400,
        message: '[ERROR]: User can not be created, Please provide all the required fields'
      })
    }
  })
authRouter.route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
    const { email, password } = req?.body

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
    } else {
      return res.status(400).send({
        status: 400,
        message: '[ERROR]: Please provide an email and password'
      })
    }
  })
  // Route Protected by JWT
authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain the ID of user to check it's data
    const id: any = req?.query?.id
    if (id) {
      // Controller: AuthController
      const controller: AuthController = new AuthController()

      // Obtain a Response
      const response: any = await controller.userData(id)
      return res.status(200).send(response)
    } else {
      return res.status(401).send({
        status: 400,
        message: '[ERROR]: Please provide an ID to check the user data'
      })
    }
  })
export default authRouter
