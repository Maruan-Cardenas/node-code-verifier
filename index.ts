import dotenv from 'dotenv'
import server from './src/server'
import { LogError, LogSuccess } from './src/utils/logger'

// * Confuguration the .env file
dotenv.config()

const port = process.env.PORT || 8000

// * Execute the server

server.listen(port, () => {
  LogSuccess(`[server on]: running http://localhost:${port}/api`)
})

// * control server error
server.on('error', (error) => {
  LogError(`[server error]: ${error}`)
})
