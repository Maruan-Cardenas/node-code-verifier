import { Get, Query, Route, Tags } from 'tsoa'
import { BasiResponse } from './types'
import { IHelloController } from './interfaces'
import { LogSuccess } from '../utils/logger'

@Route('/api/hello')
@Tags('HelloController')
export class HelloController implements IHelloController {
  /**
  * Endpoint to retreive a Message "Hello {name} in JSON format"
  * @param { string | undefined } name Name of the person to greet
  * @returns { BasiResponse } Promise of BasicRespnse
  */
  @Get('/')
  public async getMessage (@Query()name?: string): Promise<BasiResponse> {
    LogSuccess('[/api/hello] Get Request')
    return {
      message: `Hello ${name || 'World'}`
    }
  }
}
