import { IUser } from '../../domain/interfaces/IUser.interface'
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
  updateUsers(id: string, user: any): Promise<any>
}

export interface IAuthController {
  // Register new user
  registerUser(user: IUser): Promise<any>
  // Login user
  loginUser(auth: any): Promise<any>
  // Logout
  logoutUser(auth: any): Promise<any>
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
