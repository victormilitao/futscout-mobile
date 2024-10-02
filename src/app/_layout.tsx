import { Slot, SplashScreen, Stack } from 'expo-router'
import { SessionProvider } from '../contexts/session'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import UserProvider from '../contexts/user'

export default function Root() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('@/src/assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('@/src/assets/fonts/Poppins-Medium.ttf'),
  })

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SessionProvider>
    </ThemeProvider>
  )
}
