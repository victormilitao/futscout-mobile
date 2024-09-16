import { ActivityIndicator, Text, View } from 'react-native'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/src/contexts/auth'

export default function AppLayout() {
  const { authData, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
    // return <Text>Loading...</Text>
  }

  if (!authData) {
    return <Redirect href="/login" />
  }

  return (
    <Redirect href="/(tabs)" />
    // <Stack>
    //   <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
    // </Stack>
  )
}
