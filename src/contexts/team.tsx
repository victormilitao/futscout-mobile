import { PropsWithChildren, createContext, useContext, useState } from 'react'
import api from '../lib/api'
import { Response, ResponseArray } from '../interfaces/response'
import { AxiosError } from 'axios'
import { asyncStorage } from '../lib/storage'
import { PLAYER_KEY } from '../constants/storage-keys'

interface Team {
  id: number
  name: string
  city_id: number
}

interface TeamContextType {
  teams: Team[] | null
  isLoading: boolean | undefined
  searchByCityId: (cityId: number | null) => void
}

export const TeamContext = createContext<TeamContextType>({
  teams: null,
  isLoading: false,
  searchByCityId: () => {},
})

export default function TeamProvider({ children }: PropsWithChildren) {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

  const searchByCityId = async (cityId: number | null) => {
    setIsLoading(true)
    if (!cityId) {
      setTeams([])
      return
    }

    try {
      const response = await api.get<ResponseArray<Team>>('/teams', {
        params: { 'q[city_id_eq]': cityId },
      })
      const attributes = response?.data?.data?.map((data) => data?.attributes)
      setTeams(attributes)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TeamContext.Provider value={{ teams, isLoading, searchByCityId }}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  return useContext(TeamContext)
}
