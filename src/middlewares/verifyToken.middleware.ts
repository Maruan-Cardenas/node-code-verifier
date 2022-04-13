import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

/**
 * @param { Request } req Original request, previus middleware of verification JWT
 * @param { Response } res Response to verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Error of verification or next execution
*/

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Check Header from request for 'x-access-token'
  const token: any = req.headers['x-access-token']

  // Verify if jwt is present
  if (!token) {
    return res.status(403).send({
      authentication: 'Missing JWT in request',
      message: 'No token provided.'
    })
  }

  // Verify the token obtained
  jwt.verify(token, '', (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'JWT verification failed',
        message: 'Failed to verify JWT token in request.'
      })
    }

    // pass something to next request (id of user || other info)

    // Execute Next function -> Protect Routes will be executed
    next()
  })
}
