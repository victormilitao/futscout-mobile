import { PropsWithChildren, createContext, useContext, useState } from 'react'
import api from '../lib/api'
import { Response } from '../interfaces/response'

interface Player {
  name: string
  nick: string
  user_id?: number
  leg?: string
  birth_date?: Date
  modality?: string
}

interface PlayerContextType {
  player: Player | null
  isLoading: boolean | undefined
  getPlayer: () => void
  savePlayer: (data: Player) => void
}

export const PlayerContext = createContext<PlayerContextType>({
  player: null,
  isLoading: false,
  getPlayer: () => {},
  savePlayer: (data: Player) => {},
})

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [player, setPlayer] = useState<Player | null>(null)
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

  const getPlayer = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<Response<Player>>('/players')
      console.log('get player: ', player)
      setPlayer(response?.data?.data?.attributes)
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
      console.error('Error fetching user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PlayerContext.Provider
      value={{ player, isLoading, getPlayer, savePlayer }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  return useContext(PlayerContext)
}