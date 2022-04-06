import { BasiResponse } from './types'
import { IHelloController } from './interfaces'
import { LogSuccess } from '../utils/logger'

export class HelloController implements IHelloController {
  public async getMessage (name?: string): Promise<BasiResponse> {
    LogSuccess('[/api/hello] Get Request')
    return {
      message: `Hello ${name || 'World'}`
    }
  }
}
