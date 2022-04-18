import { Get, Post, Query, Route, Tags } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

import { registerUser, loginUser, logoutUser, getUserById } from '../domain/orm/User.orm'
import { AuthResponse, ErrorResponse } from './types'

@Route('api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  /**
   * Endpoint to register new user
   * @param {IUser} user - User to register
   * @returns {Promise<any>} User registered
   */
  @Post('/register')
  public async registerUser (user: IUser): Promise<any> {
    let response
    if (user) {
      await registerUser(user)
        .then(() => {
          LogSuccess('[/api/auth/register] Register User successfull')
          response = {
            status: 200,
            message: 'User registered successfully'
          }
        })
    } else {
      LogWarning('[/api/auth/register] create user Failed, Request without user')
      response = {
        status: 400,
        message: 'User not registered: Please provide an user to create'
      }
    }
    return response
  }

  @Post('/login')
  public async loginUser (auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined
    if (auth) {
      LogSuccess('[/api/auth/login] Login User successfull')
      const data = await loginUser(auth)
      response = {
        status: 200,
        message: `welcome ${data.user.name}`,
        token: data.token // jvt generated for logged in user
      }
    } else {
      LogWarning('[/api/auth/register] create user Failed, Request without user')
      response = {
        status: 400,
        message: 'Please provide Email and Password to login',
        error: '[AUTH ERROR]: please provide email and password to login'
      }
    }
    return response
  }

  /**
   * Endpoint to retrieve the Users in the Collection "Users" fron the database
   * Middleware: Validate JWT
   * In Headers you must add the x-access-token with the JWT valid
   * @param {string} id - ID of the User to retrieve(obligatory)
   * @returns {Promise<any>} user found by ID
  */
  @Get('/me')
  public async userData (@Query()id: string): Promise<any> {
    let response
    if (id) {
      LogSuccess(`[/api/Users] Get User data by ID:  + ${id}`)
      response = await getUserById(id)
    }
    return response
  }

  @Post('/logout')
  public async logoutUser (auth: IAuth): Promise<any> {
    LogSuccess('[/api/Users] Logout User Request')
    logoutUser()
    // TODO: Implement clouse session of user
  }
}
