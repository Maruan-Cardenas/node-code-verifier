import { BasiResponse } from '../types'

export interface IHelloController {
  getMessage(name?:string): Promise<BasiResponse>
}
