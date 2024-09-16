import { ActivityIndicator, View } from 'react-native'
import { Redirect } from 'expo-router'
import { useSession } from '@/src/contexts/session'

export default function AppLayout() {
  const { authData, isLoading } = useSession()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!authData) {
    return <Redirect href="/login" />
  }

  return <Redirect href="/(tabs)" />
}
