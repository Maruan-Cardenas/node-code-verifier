import { BayResponse, BasiResponse } from '../types'

export interface IHelloController {
  getMessage(name?:string): Promise<BasiResponse>
}

export interface IByeController {
  getMessage(name?:string): Promise<BayResponse>
}
