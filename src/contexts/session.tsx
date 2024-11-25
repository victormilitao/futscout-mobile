import { User } from '@/src/interfaces/user'
import api from '@/src/lib/api'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { asyncStorage, storage } from '../lib/storage'
import { Response } from '../interfaces/response'
import { HttpStatusCode } from 'axios'
import { SESSION_STORAGE, TOKEN_STORAGE } from '../constants/storage-keys'
import { setPlayerStorage } from './player'

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
  isLoading: boolean | undefined
  login: (data: LoginRequest) => void
  signOut: () => void
}

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
  const [isLoading, setIsLoading] = useState<boolean | undefined>(true)

  useEffect(() => {
    loadStorageData()
  }, [])

  const loadStorageData = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const authDataSerialized = await storage.getItem(SESSION_STORAGE)
      if (authDataSerialized) {
        console.log('load storage: ', authDataSerialized)
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
        console.log('login: ', authData)
        setAuthData(authData)
        storage.setItem(SESSION_STORAGE, JSON.stringify(authData))
        storage.setItem(TOKEN_STORAGE, (authData as any)?.token)
        const players = authData?.data?.relationships?.players
        if (players?.length > 0) setPlayerStorage(players[0])
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
      await storage.removeItem(TOKEN_STORAGE)
      if (asyncStorage.clear) await asyncStorage.clear()
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
