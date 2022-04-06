/**
 * Basic JSON response for Controller
*/

export type BasiResponse = {
  message: string
}

export type BayResponse = {
  message: string,
  Date: string
}

/**
 * Error JSON response for Controller
*/

export type ErrorResponse = {
  error : string,
  message: string
}
