import express, { Express, Request, Response } from "express"; 
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

//Create Express APP
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// define the first Rute of APP
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World x2!");
})

// define the second Rute of APP
app.get("/hello", (req: Request, res: Response) => {
    res.send("Bye");
})

// Execute APP and Listen Requests to PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
