import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import Input from '@/src/components/form/Input'
import { StyleSheet, View } from 'react-native'

export default function NewPlayer() {
  return (
    <PageView>
      <ThemedText type='subtitle' style={styles.title}>
        Jogador
      </ThemedText>
      <View style={styles.form}>
        <Input label='Nome' />
        <ThemedView style={styles.row}>
          <Input wrapStyle={{ flex: 2 }} label='Como prefere ser chamado' />
          <Input wrapStyle={{ flex: 1 }} label='Nascimento' />
        </ThemedView>
      </View>
    </PageView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10
  },
  form: {
    gap: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
})
