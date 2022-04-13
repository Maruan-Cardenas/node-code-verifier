import { BayResponse, BasiResponse } from '../types'

export interface IHelloController {
  getMessage(name?:string): Promise<BasiResponse>
}

export interface IByeController {
  getMessage(name?:string): Promise<BayResponse>
}

export interface IUserController {
  // Read all  users from the database || Get user by ID
  getUsers(id?: string): Promise<any>
  // Delete user by ID
  deleteUsers(id?: string): Promise<any>
  // Create new user
  createUsers(user: any): Promise<any>
  // Update user by ID
  updateUsers(id: string, user: any): Promise<any>
}

export interface IKataController {
  // Read all katas from the database || Get user by ID
  getKatas(id?: string): Promise<any>
  // Delete kata by ID
  deleteKatas(id?: string): Promise<any>
  // Create new kata
  createKatas(user: any): Promise<any>
  // Update kata by ID
  updateKatas(id: string, user: any): Promise<any>
}
