import { Post, Route, Tags } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm'

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
    if (user) {
      await registerUser(user)
        .then(() => {
          LogSuccess('[/api/auth/register] Register User successfull')
          return {
            status: 200,
            message: 'User registered successfully'
          }
        })
    } else {
      LogWarning('[/api/auth/register] create user Failed, Request without user')
      return {
        status: 400,
        message: 'Please provide an user to create'
      }
    }
  }

  @Post('/login')
  public async loginUser (auth: IAuth): Promise<any> {
    if (auth) {
      await loginUser(auth)
        .then((res) => {
          LogSuccess('[/api/auth/login] Login User successfull')
          return {
            status: 200,
            message: 'login user successfully',
            token: res.token // jvt generated for logged in user
          }
        })
    } else {
      LogWarning('[/api/auth/register] create user Failed, Request without user')
      return {
        status: 400,
        message: 'Please provide an user to create'
      }
    }
  }

  @Post('/logout')
  public async logoutUser (auth: IAuth): Promise<any> {
    LogSuccess('[/api/Users] Logout User Request')
    logoutUser()
    // TODO: Implement clouse session of user
  }
}
