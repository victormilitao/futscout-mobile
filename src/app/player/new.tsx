import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import Input from '@/src/components/form/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import zod from 'zod'

export default function NewPlayer() {
  const newPlayerValidation = zod.object({
    name: zod.string(),
    nick: zod.string(),
    dateBirth: zod.date(),
  })
  type LoginData = zod.infer<typeof newPlayerValidation>
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(newPlayerValidation),
    defaultValues: {
      name: '',
      nick: '',
      dateBirth: undefined,
    },
    mode: 'onSubmit',
  })

  return (
    <PageView>
      <ThemedText type='subtitle' style={styles.title}>
        Jogador
      </ThemedText>
      <View style={styles.form}>
        <Input control={control} name='name' label='Nome' />
        <ThemedView style={styles.row}>
          <Input
            control={control}
            name='nick'
            wrapStyle={{ flex: 2 }}
            label='Como prefere ser chamado'
          />
          <Input
            control={control}
            name='dateBirth'
            wrapStyle={{ flex: 1 }}
            label='Nascimento'
          />
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
    marginBottom: 10,
  },
  form: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
})
