import axios from 'axios'
import { storage } from './storage'

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

let token: string | null = null

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.response) {
      const { data, status } = error?.response
      if (
        status === 401 &&
        ['Token expirado', 'Token inválido'].includes(data?.errors?.at(0))
      ) {
        console.error('Token expirado ou inválido')
      }
    }

    if (error.request) {
      console.error('Nenhuma resposta recebida da API', error.request)
    }

    return Promise.reject(error)
  }
)

api.interceptors.request.use(
  async (config) => {
    if (!token) token = await storage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`

    console.log('token: ', token)
    console.log('headers: ', config.headers)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default api
