import Button from '@/src/components/Button'
import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import Input from '@/src/components/form/Input'
import Space from '@/src/components/space'
import { usePlayer } from '@/src/contexts/player'
import { handleError } from '@/src/lib/error-handler'
import { showError } from '@/src/lib/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import zod from 'zod'
import { useEffect, useState } from 'react'
import { format, parse, isValid } from 'date-fns'

export default function NewPlayer() {
  const router = useRouter()
  const { isLoading, player, savePlayer, getPlayer } = usePlayer()
  const [birthDate, setBirthDate] = useState<string | undefined>(
    player?.birth_date || undefined
  )

  const newPlayerValidation = zod.object({
    name: zod.string().min(1, 'Campo obrigatório'),
    nick: zod.string().min(1, 'Campo obrigatório'),
    birth_date: zod.string().refine((val) => {return isValid(parse(val, 'dd/MM/yyyy', new Date()))}, {
      message: 'Data inválida. Use o formato dd/MM/yyyy.',
    }).optional(),
    user_id: zod.number().optional(),
  })
  type PlayerData = zod.infer<typeof newPlayerValidation>

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue
  } = useForm<PlayerData>({
    resolver: zodResolver(newPlayerValidation),
    defaultValues: {
      name: player?.name || 'fsdfds',
      nick: player?.nick || '',
      birth_date: player?.birth_date || '',
      user_id: 0,
    },
    mode: 'onSubmit',
  })

  useEffect(() => {
    getPlayer()
  }, [])

  useEffect(() => {
    setValue('name', player?.name || '')
    setValue('nick', player?.nick || '')
    setValue('birth_date', player?.birth_date || '')
  }, [player])

  const handleSave = async (data: PlayerData) => {
    console.log(data)
    // return
    // try {
    //   await savePlayer(data)
    //   router.navigate('/(tabs)')
    // } catch (error) {
    //   const errorHandled = handleError(error)
    //   if (errorHandled) {
    //     const errorMsg = errorHandled.response?.data?.errors[0] || undefined
    //     showError(errorMsg, 'Erro ao salvar jogador')
    //   }
    // }
  }

  const onError: SubmitErrorHandler<PlayerData> = (errors, e) => {
    console.error('errorrr:', errors)
  }

  const formatDate = (text: string) => {
    console.log('text: ', text)
    try {
      const numbers = text.replace(/\D/g, '')

      if (numbers.length >= 2) {
        console.log('numbers', numbers)
        const day = numbers.slice(0, 2)
        const month = numbers.slice(2, 4)
        const year = numbers.slice(4, 8)

        const formattedDate = `${day}${month.length ? '/' : ''}${month}${
          year.length ? '/' : ''
        }${year}`

        setValue('birth_date', formattedDate)
        setError('birth_date', {})
        if (formattedDate.length === 10 && !isValid(parse(formattedDate, 'dd/MM/yyyy', new Date()))) {
          setError('birth_date', { message: 'Data inválida' })
        }
        return
      }
      setValue('birth_date', numbers)
    } catch (error) {
      console.error('data conversion: ', error)
      if (error instanceof RangeError) {
        setError('birth_date', { message: 'Data inválida' })
      }
    }
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
        </ThemedView>
        <ThemedView style={styles.row}>
          <Input
            control={control}
            name='birth_date'
            placeholder='dd/mm/aaaa'
            onChangeText={formatDate}
            wrapStyle={{ flex: 2 }}
            label='Data de nascimento'
            keyboardType='numeric'
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
