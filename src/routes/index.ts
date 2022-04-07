/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import byeRouter from './ByeRouter'
import { LogInfo } from '../utils/logger'

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
server.use('/hello', helloRouter) // http://localhost:8000/api/hello
server.use('/bye', byeRouter) // http://localhost:8000/api/bye
// Add more Routers to the app

export default server