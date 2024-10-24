export interface Response<T, AdditionalFields = {}> {
  data: DataResponse<T> & AdditionalFields
}

export interface ResponseArray<T, AdditionalFields = {}> {
  data: DataResponse<T>[] & AdditionalFields
}


interface DataResponse<T> {
  id?: number
  type?: string
  attributes: T
  [key: string]: any
}