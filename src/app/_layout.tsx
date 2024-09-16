// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from '@react-navigation/native'
// import { useFonts } from 'expo-font'
// import { Slot, Stack } from 'expo-router'
// import * as SplashScreen from 'expo-splash-screen'
// import { useEffect } from 'react'
// import 'react-native-reanimated'

// import { useColorScheme } from '@/src/hooks/useColorScheme'
// import UserProvider from '@/src/contexts/user'
// import { AuthProvider } from '../contexts/auth'

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

// export default function RootLayout() {
//   const colorScheme = useColorScheme()
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   })

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync()
//     }
//   }, [loaded])

//   if (!loaded) {
//     return null
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <AuthProvider>

//           <Stack>
//             <Stack.Screen name="index" options={{ headerShown: false }} />
//             <Stack.Screen name="login/index" options={{ headerShown: false }} />
//             <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//             <Stack.Screen name="+not-found" />
//             <Slot />
//           </Stack>

//       </AuthProvider>
//     </ThemeProvider>
//   )
// }

import { Slot, SplashScreen } from 'expo-router'
import { SessionProvider } from '../contexts/session'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'

export default function Root() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('@/src/assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </ThemeProvider>
  )
}
