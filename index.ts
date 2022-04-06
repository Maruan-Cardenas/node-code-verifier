import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// Configure dotenv
dotenv.config()

// Create Express APP
const app: Express = express()
const port: string | number = process.env.PORT || 8000

// define the first Rute of APP
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my first Express APP')
})

// define the second Rute of APP
app.get('/hello', (req: Request, res: Response) => {
  const name = req.query.name || 'World'
  res.send('Hello ' + name + '!')
})

app.get('/bye', (req: Request, res: Response) => {
  res.send({
    data: {
      message: 'Goodbye world'
    }
  })
})

// Execute APP and Listen Requests to PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
