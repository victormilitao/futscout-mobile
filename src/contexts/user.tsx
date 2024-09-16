import { Competition } from '@/src/interfaces/competition'
import { Team } from '@/src/interfaces/team'
import { User } from '@/src/interfaces/user'
import api from '@/src/lib/api'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

interface UserResponse extends User {
  photo_url: string
}

interface DashBoardByYearResponse {
  year: string
  attributes: {
    matches: number
    scores: number
    assists: number
    teams: Team[]
    competitions: Competition[]
  }
}

interface UserContextType {
  user: UserResponse | null
  getUser: () => void
  dashboardByYear: DashBoardByYearResponse | null
  getDashboardByYear: () => void
}

export const UserContext = createContext<UserContextType>({
  user: null,
  getUser: () => {},
  dashboardByYear: null,
  getDashboardByYear: () => {},
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

  const [
    dashboardByYear,
    setDashboardByYear,
  ] = useState<DashBoardByYearResponse | null>(null)
  const getDashboardByYear = async () => {
    try {
      const year = new Date().getFullYear()
      const response = await api.get(`/dashboards/${year}/by_year`)
      setDashboardByYear(response?.data?.data)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  return (
    <UserContext.Provider
      value={{ user, getUser, dashboardByYear, getDashboardByYear }}
    >
      {children}
    </UserContext.Provider>
  )
}
