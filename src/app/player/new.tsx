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
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import zod from 'zod'

export default function NewPlayer() {
  const router = useRouter()
  const { isLoading, player, savePlayer } = usePlayer()
  const newPlayerValidation = zod.object({
    name: zod.string(),
    nick: zod.string(),
    birth_date: zod.date().optional(),
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
    },
    mode: 'onSubmit',
  })

  const handleSave = async (data: PlayerData) => {
    console.log('data', data)
    try {
      await savePlayer(data)
      router.navigate('/(tabs)')
    } catch (error) {
      console.error(error)
      showError('Erro ao salvar jogador')
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
          />
          <Input
            control={control}
            name='birth_date'
            wrapStyle={{ flex: 1 }}
            label='Nascimento'
          />
        </ThemedView>
        <Space />
        <Button onPress={handleSubmit(handleSave)} isLoading={isLoading}>
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
