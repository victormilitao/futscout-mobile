import { PropsWithChildren, createContext, useState } from 'react'
import api from '../lib/api'
import { Response } from '../interfaces/response'

interface Player {
  name: string
  nick: string
  user_id: number
  created_at: Date
  updated_at: Date
}

interface PlayerContextType {
  player: Player | null
  getPlayer: () => void
}

export const PlayerContext = createContext<PlayerContextType>({
  player: null,
  getPlayer: () => {},
})

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [player, setPlayer] = useState<Player | null>(null)

  const getPlayer = async () => {
    try {
      const response = await api.get<Response<Player>>('/players')
      console.log('player: ', player)
      setPlayer(response?.data?.data?.attributes)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  return (
    <PlayerContext.Provider value={{ player, getPlayer }}>
      {children}
    </PlayerContext.Provider>
  )
}
