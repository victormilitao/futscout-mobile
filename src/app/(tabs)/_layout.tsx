import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/src/components/navigation/TabBarIcon'
import { Colors } from '@/src/constants/Colors'
import { useColorScheme } from '@/src/hooks/useColorScheme'
import UserProvider from '@/src/contexts/user'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Progresso',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'analytics' : 'analytics-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="collection"
          options={{
            title: 'Coleção',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'albums' : 'albums-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'menu' : 'menu-outline'}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </UserProvider>
  )
}
