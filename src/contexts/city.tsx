import { PropsWithChildren, createContext, useContext, useState } from 'react'
import api from '../lib/api'
import { Response, ResponseArray } from '../interfaces/response'
import { AxiosError } from 'axios'
import { asyncStorage } from '../lib/storage'
import { PLAYER_KEY } from '../constants/storage-keys'

interface City {
  id: number
  name: string
  capital: boolean
}

interface CityContextType {
  cities: City[] | null
  isLoading: boolean | undefined
  searchCity: (text: string) => void
}

export const CityContext = createContext<CityContextType>({
  cities: null,
  isLoading: false,
  searchCity: (text: string) => {},
})

export default function CityProvider({ children }: PropsWithChildren) {
  const [cities, setCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

  const searchCity = async (text: string) => {
    setIsLoading(true)

    try {
      const response = await api.get<ResponseArray<City>>('/cities', {
        params: { 'q[name_i_cont]': text },
      })
      const attributes = response?.data?.data?.map((data) => data?.attributes)
      setCities(attributes)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CityContext.Provider value={{ cities, isLoading, searchCity }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  return useContext(CityContext)
}
