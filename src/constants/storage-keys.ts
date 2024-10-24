export const SESSION_STORAGE = 'authData'
export const TOKEN_STORAGE = 'token'
export const PLAYER_KEY = 'player'

const keys = [
  SESSION_STORAGE,
  TOKEN_STORAGE,
  PLAYER_KEY
] as const

export type STORAGE_KEYS = typeof keys[number]
