/* eslint-disable no-unused-vars */
export enum KataLevel {
  BASIC = 'Basic',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface IKatas {
  name: string,
  description: string,
  level: KataLevel,
  intents: number,
  stars: number,
  creator: string, // user id
  solutions: string,
  participants: string[]
}
