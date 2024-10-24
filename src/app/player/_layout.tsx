import { HeaderLeftBtn } from '@/src/components/navigation/header-back-btn'
import PlayerProvider from '@/src/contexts/player'
import { Stack } from 'expo-router'

export default function PlayerLayout() {
  return (
    <PlayerProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='new'
          options={{
            title: '',
            headerShown: true,
            headerShadowVisible: false,
            headerLeft: () => <HeaderLeftBtn href={'/menu'} />,
          }}
        />
      </Stack>
    </PlayerProvider>
  )
}
