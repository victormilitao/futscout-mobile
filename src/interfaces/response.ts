export interface Response<T, AdditionalFields = {}> {
  data: {
    id?: number
    type?: string
    attributes: T
    [key: string]: any
  } & AdditionalFields
}
