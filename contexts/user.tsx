import { User } from '@/interfaces/user'
import api from '@/services/api'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

interface UserResponse extends User {
  photo_url: string
}

interface UserContextType {
  user: UserResponse | null
  getUser: () => void
}

export const UserContext = createContext<UserContextType>({
  user: null,
  getUser: () => {},
})

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserResponse | null>(null)

  const getUser = async () => {
    try {
      const response = await api.get('/users')
      setUser(response?.data?.data?.attributes)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  )
}
