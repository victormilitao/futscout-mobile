import { HeaderLeftBtn } from '@/src/components/navigation/header-back-btn'
import CityProvider from '@/src/contexts/city'
import TeamProvider from '@/src/contexts/team'
import { Stack } from 'expo-router'

export default function TeamLayout() {
  return (
    <CityProvider>
      <TeamProvider>
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
      </TeamProvider>
    </CityProvider>
  )
}
