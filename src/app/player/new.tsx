import Button from '@/src/components/Button'
import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import Input from '@/src/components/form/Input'
import Space from '@/src/components/space'
import { usePlayer } from '@/src/contexts/player'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import zod from 'zod'
import { useEffect } from 'react'
import DateInput from '@/src/components/form/date-input'
import { handleError } from '@/src/lib/error-handler'
import { showError } from '@/src/lib/toast'
import { useRouter } from 'expo-router'
import { Messages } from '@/src/constants/messages'
import { formatToBr, isDateValid } from '@/src/lib/date'

export default function NewPlayer() {
  const router = useRouter()
  const { isLoading, player, savePlayer, getPlayer, editPlayer } = usePlayer()
  const newPlayerValidation = zod.object({
    id: zod.number().optional(),
    name: zod.string().min(1, 'Campo obrigatório'),
    nick: zod.string().min(1, 'Campo obrigatório'),
    birth_date: zod.string().refine(isDateValid, Messages.date).optional(),
  })
  type PlayerData = zod.infer<typeof newPlayerValidation>

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PlayerData>({
    resolver: zodResolver(newPlayerValidation),
    defaultValues: {
      name: player?.name || '',
      nick: player?.nick || '',
      birth_date: player?.birth_date || '',
    },
    mode: 'onSubmit',
  })

  useEffect(() => {
    getPlayer()
  }, [])

  useEffect(() => {
    setValue('name', player?.name || '')
    setValue('nick', player?.nick || '')
    setValue('birth_date', formatToBr(player?.birth_date) || '')
  }, [player])

  const handleSave = async (data: PlayerData) => {
    const saveOrEdit = player ? editPlayer : savePlayer
    try {
      await saveOrEdit(data)
      router.navigate('/(tabs)')
    } catch (error) {
      console.log('handle save player: ', error)
      const errorHandled = handleError(error)
      if (!errorHandled) return

      errorHandled.response?.data?.errors?.forEach((errorMsg) => {
        showError(errorMsg, 'Erro ao salvar jogador')
      })
    }
  }

  const onError: SubmitErrorHandler<PlayerData> = (errors, e) => {
    console.error('new player saving error:', errors)
  }

  return (
    <PageView>
      <ScrollView automaticallyAdjustKeyboardInsets>
        <ThemedText type='subtitle' style={styles.title}>
          {player && 'Editar'} Jogador
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
          </ThemedView>
          <ThemedView style={styles.row}>
            <DateInput
              control={control}
              name='birth_date'
              label='Data de nascimento'
              error={errors.birth_date?.message}
            />
          </ThemedView>

          <Space />
          <Button
            onPress={handleSubmit(handleSave, onError)}
            isLoading={isLoading}
          >
            {player ? 'Salvar' : 'Próximo passo'}
          </Button>
        </View>
      </ScrollView>
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
