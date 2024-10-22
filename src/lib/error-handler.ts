import axios from 'axios'
import { AxiosError, ErrorType } from '../interfaces/error'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const handleError = (error: unknown): ErrorType => {
  if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
    console.log(error.status)
    console.error(error.response)
    return { status: error?.status, response: error?.response } as AxiosError
  }

  console.error('log error: ', error)
  return null
}
