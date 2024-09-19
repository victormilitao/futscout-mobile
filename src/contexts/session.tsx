import { User } from '@/src/interfaces/user'
import api from '@/src/services/api'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { storage } from '../services/storage'
import { Response } from '../interfaces/response'
import { HttpStatusCode } from 'axios'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

interface ResponseData extends Response<User, LoginResponse> {}

interface SessionContextType {
  authData: ResponseData | null
  isLoading: boolean | null
  login: (data: LoginRequest) => void
  signOut: () => void
}

const SESSION_STORAGE = 'authData'

export const SessionContext = createContext<SessionContextType>({
  authData: null,
  isLoading: true,
  login: () => {},
  signOut: () => {},
})

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<ResponseData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean | null>(true)

  useEffect(() => {
    loadStorageData()
  }, [])

  const loadStorageData = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const authDataSerialized = await storage.getItem(SESSION_STORAGE)
      if (authDataSerialized) {
        setAuthData(JSON.parse(authDataSerialized))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (data: LoginRequest): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await api.post<ResponseData>(
        '/authentications/login',
        data
      )
      if (response.status === HttpStatusCode.Ok) {
        const authData = response?.data
        setAuthData(authData)
        storage.setItem(SESSION_STORAGE, JSON.stringify(authData))
        return
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      await storage.removeItem(SESSION_STORAGE)
      setAuthData(null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SessionContext.Provider value={{ authData, isLoading, login, signOut }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}
