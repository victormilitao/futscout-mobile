import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import { PlayerContext } from '@/src/contexts/player'
import { useSession } from '@/src/contexts/session'
import { useTeam } from '@/src/contexts/team'
import { Redirect, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'

export default function Home() {
  const { signOut } = useSession()
  const { player, getPlayer, isLoading: isPlayerLoading } = useContext(PlayerContext)
  const { teams, getTeams, isLoading: isTeamsLoading } = useTeam()
  const router = useRouter()

  useEffect(() => {
    console.log('use effect get teams')
    getTeams()
  }, [])

  const handleSignOut = () => {
    signOut()
    router.navigate('/login')
  }

  if (isPlayerLoading || isTeamsLoading) return <ActivityIndicator></ActivityIndicator>

  if (!player) return <Redirect href={'/player/new'} />
  console.log(teams)
  if (!teams) return <Redirect href={'/team/new'} />

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type='title'>Home</ThemedText>
      <Text
        onPress={() => {
          handleSignOut()
        }}
      >
        Sair
      </Text>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})
