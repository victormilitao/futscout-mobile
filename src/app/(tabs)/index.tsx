import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import { StyleSheet } from 'react-native'

export default function Home() {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type='title'>Home</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
})
