// app/index.tsx
import { useNavigation, useRootNavigationState, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/contexts/user'
import { View, ActivityIndicator } from 'react-native'
import { User } from '@/interfaces/user'

export default function Index() {
  const router = useRouter()
  const navigationState = useRootNavigationState()

  const { user, getUser } = useContext(UserContext)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // await getUser()
        // const user: User = {name: 'Victor', photoUrl: ''}

        if (user) {
          router.replace('/(tabs)')
        } else {
          router.replace('/login')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        // setLoading(false)
      }
    }

    if (navigationState?.key) {
      fetchUser()
    }
  }, [navigationState?.key, user])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )
}
