export interface AxiosError {
  status?: number
  response?: DataError
}

interface DataError {
  data: { errors: string[] }
}

export type ErrorType = AxiosError | null