import { PropsWithChildren, createContext, useContext, useState } from 'react'
import api from '../lib/api'
import { Response, ResponseArray } from '../interfaces/response'
import { AxiosError } from 'axios'

interface Player {
  id?: number
  name: string
  nick: string
  user_id?: number
  leg?: string
  birth_date?: string
  modality?: string
}

interface PlayerContextType {
  player: Player | null
  isLoading: boolean | undefined
  getPlayer: () => void
  savePlayer: (data: Player) => void
  editPlayer: (data: Player) => void
}

export const PlayerContext = createContext<PlayerContextType>({
  player: null,
  isLoading: false,
  getPlayer: () => {},
  savePlayer: () => {},
  editPlayer: () => {},
})

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [player, setPlayer] = useState<Player | null>(null)
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

  const getPlayer = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<ResponseArray<Player>>('/players')
      console.log('get player: ', response?.data?.data[0])
      setPlayer(response?.data?.data[0]?.attributes)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const savePlayer = async (data: Player) => {
    setIsLoading(true)
    try {
      const response = await api.post<Response<Player>>('/players', data)
      console.log('response player save: ', response)
      setPlayer(response?.data?.data?.attributes)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const editPlayer = async (data: Player) => {
    setIsLoading(true)
    try {
      const response = await api.put<Response<Player>>(`/players/${2}`, data)
      console.log('response player edit: ', response)
      setPlayer(response?.data?.data?.attributes)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PlayerContext.Provider
      value={{ player, isLoading, getPlayer, savePlayer, editPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  return useContext(PlayerContext)
}