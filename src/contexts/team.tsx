import { PropsWithChildren, createContext, useContext, useState } from 'react'
import api from '../lib/api'
import { ResponseArray } from '../interfaces/response'

interface Team {
  id: number
  name: string
  city_id: number
}

interface PlayerTeam {
  team_id?: number
  name: string
  city_id: number
}

interface TeamContextType {
  teams: Team[] | null
  isLoading: boolean | undefined
  searchByCityId: (cityId: number | null) => void
  saveTeam: (data: PlayerTeam) => void
}

export const TeamContext = createContext<TeamContextType>({
  teams: null,
  isLoading: false,
  searchByCityId: () => {},
  saveTeam: () => {},
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

  const saveTeam = async (data: PlayerTeam) => {
    setIsLoading(true)
    try {
      console.log(data)
      const response = await api.post<ResponseArray<Team>>('/player_teams', {
        player_teams: data,
      })
      console.log(response)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TeamContext.Provider
      value={{ teams, isLoading, searchByCityId, saveTeam }}
    >
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  return useContext(TeamContext)
}
