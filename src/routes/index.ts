/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import byeRouter from './ByeRouter'
import { LogInfo } from '../utils/logger'
import usersRouter from './UserRouter'
import katasRouter from './KataRouter'
import authRouter from './AuthRouter'

// Server instance
const server = express()

// Router instance
const rootRouter = express.Router()

// Activate for requests to http://localhost:8000/api

// GET: http://localhost:8000/api
rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api')
  // send hello world to the client
  res.send('Welcome to my API')
})

// Redirections to Routers & Controllers
server.use('/', rootRouter) // http://localhost:8000/api
server.use('/hello', helloRouter) // http://localhost:8000/api/hello --> HelloRouter
server.use('/bye', byeRouter) // http://localhost:8000/api/bye --> ByeRouter
// Add more Routers to the app
server.use('/users', usersRouter) // http://localhost:8000/api/users --> UserRouter
server.use('/auth', authRouter) // http://localhost:8000/api/users --> AuthRouter
server.use('/katas', katasRouter) // http://localhost:8000/api/katas --> kataRouter

export default server
