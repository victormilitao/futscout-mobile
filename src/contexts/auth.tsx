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
import { HTTP_STATUS } from '../enums/http'

interface AuthRequest {
  email: string
  password: string
}

interface AuthResponse {
  token: string
}

interface ResponseData extends Response<User, AuthResponse> {}

interface AuthContextType {
  authData: ResponseData | null
  isLoading: boolean | null
  login: (data: AuthRequest) => void
  signOut: () => void
}

const SESSION_STORAGE = 'authData'

export const AuthContext = createContext<AuthContextType>({
  authData: null,
  isLoading: true,
  login: () => {},
  signOut: () => {},
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<ResponseData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean | null>(true)

  const loadStorageData = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const authDataSerialized = await storage.getItem(SESSION_STORAGE)
      if (authDataSerialized) {
        setAuthData(JSON.parse(authDataSerialized))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStorageData()
  }, [])

  const login = async (data: AuthRequest): Promise<boolean | undefined> => {
    setIsLoading(true)
    try {
      const response = await api.post<ResponseData>(
        '/authentications/login',
        data
      )
      if (response.status === HTTP_STATUS.OK) {
        const authData = response?.data
        setAuthData(authData)
        storage.setItem(SESSION_STORAGE, JSON.stringify(authData))
        return
      }
    } catch (error) {
      throw(error)
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
    <AuthContext.Provider value={{ authData, isLoading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
