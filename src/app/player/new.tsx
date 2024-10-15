import Button from '@/src/components/Button'
import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import Input from '@/src/components/form/Input'
import Space from '@/src/components/space'
import { usePlayer } from '@/src/contexts/player'
import { showError } from '@/src/lib/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import zod from 'zod'

export default function NewPlayer() {
  const router = useRouter()
  const { isLoading, player, savePlayer } = usePlayer()
  const newPlayerValidation = zod.object({
    name: zod.string().min(1, 'Campo obrigatório'),
    nick: zod.string().min(1, 'Campo obrigatório'),
    birth_date: zod.date().optional(),
    user_id: zod.number().optional()
  })
  type PlayerData = zod.infer<typeof newPlayerValidation>
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerData>({
    resolver: zodResolver(newPlayerValidation),
    defaultValues: {
      name: '',
      nick: '',
      birth_date: undefined,
      user_id: 0
    },
    mode: 'onSubmit',
  })

  const handleSave = async (data: PlayerData) => {
    try {
      await savePlayer(data)
      router.navigate('/(tabs)')
    } catch (error) {
      console.log('error1: ', error)
      console.error(JSON.stringify(errors))
      const errorMsg = error?.response?.data?.errors[0]
      showError(errorMsg, 'Erro ao salvar jogador')
    }
  }

  const onError: SubmitErrorHandler<PlayerData> = (errors, e) => {
    console.error('errorrr:', errors)
  }

  return (
    <PageView>
      <ThemedText type='subtitle' style={styles.title}>
        Jogador
      </ThemedText>
      <View style={styles.form}>
        <Input
          control={control}
          name='name'
          label='Nome'
          error={errors.name?.message}
        />
        <ThemedView style={styles.row}>
          <Input
            control={control}
            name='nick'
            wrapStyle={{ flex: 2 }}
            label='Como prefere ser chamado'
            error={errors.name?.message}
          />
          <Input
            control={control}
            name='birth_date'
            wrapStyle={{ flex: 1 }}
            label='Nascimento'
          />
        </ThemedView>
        <Space />
        <Button onPress={handleSubmit(handleSave, onError)} isLoading={isLoading}>
          Próximo passo
        </Button>
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
