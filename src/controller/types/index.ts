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
 * Auth JSON response for Controller
*/

export type AuthResponse = {
  status: number,
  message: string,
  token: string
}

/**
 * Error JSON response for Controller
*/

export type ErrorResponse = {
  status: number,
  error : string,
  message: string
}
