import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import PlayerProvider, { PlayerContext } from '@/src/contexts/player'
import { useSession } from '@/src/contexts/session'
import { Redirect, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'

export default function Home() {
  const { signOut } = useSession()
  const { player, getPlayer } = useContext(PlayerContext)
  const router = useRouter()

  useEffect(() => {
    getPlayer()
  }, [router])

  const handleSignOut = () => {
    signOut()
    router.navigate('/login')
  }
console.log('playerrr', player)
  if (!player) return <Redirect href={'/player/new'} />

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
