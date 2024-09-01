import { Image, StyleSheet, View } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/contexts/user'

export default function UserHeader() {
  const { user, getUser } = useContext(UserContext)

  useEffect(() => {
    getUser()
  }, [])

  return (
    <ThemedView style={styles.container}>
      <View style={styles.avatar}>
        {user?.photo_url ? (
          <Image source={{ uri: user.photo_url }} style={styles.image}></Image>
        ) : (
          <Ionicons size={28} name="person-circle"></Ionicons>
        )}
      </View>
      <ThemedText type="subtitle">{user?.name}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    gap: 10,
  },
  avatar: {
    borderRadius: 50,
    backgroundColor: 'F2F2F2',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
})
