import { BayResponse } from './types'
import { IByeController } from './interfaces'
import { LogSuccess } from '../utils/logger'

export class ByeController implements IByeController {
  public async getMessage (name?: string): Promise<BayResponse> {
    LogSuccess('[/api/bye] Get Request')
    const date = Date.now()
    const hoy = new Date(date)
    return {
      message: `Goodbye ${name || 'World'}`,
      Date: hoy.toDateString()
    }
  }
}
