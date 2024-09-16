import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import { useAuth } from '@/src/contexts/auth'
import { useRouter } from 'expo-router'
import { StyleSheet, Text } from 'react-native'

export default function Home() {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.navigate('/login')
  }

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Home</ThemedText>
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
