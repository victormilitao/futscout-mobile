import Button from '@/src/components/Button'
import Select, { Option } from '@/src/components/form/select'
import { PageView } from '@/src/components/PageView'
import Space from '@/src/components/space'
import { ThemedText } from '@/src/components/ThemedText'
import { useCity } from '@/src/contexts/city'
import { useTeam } from '@/src/contexts/team'
import { handleError } from '@/src/lib/error-handler'
import { showError } from '@/src/lib/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import zod from 'zod'

export default function NewTeam() {
  const router = useRouter()
  const { cities, searchCity } = useCity()
  const { teams, searchByCityId, saveTeam } = useTeam()
  const [cityOptions, setCityOptions] = useState<Option[]>([])
  const [teamOptions, setTeamOptions] = useState<Option[]>([])

  const newTeamValidation = zod.object({
    city: zod.any().optional(),
    city_id: zod.number({ required_error: 'Selecione uma cidade' }),
    team: zod.any().optional(),
    team_id: zod.number().optional(),
  })
  type TeamData = zod.infer<typeof newTeamValidation>

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TeamData>({
    resolver: zodResolver(newTeamValidation),
    defaultValues: {
      city: '',
      city_id: undefined,
    },
    mode: 'onSubmit',
  })

  const citySearch: string = watch('city')
  const cityId = watch('city_id')
  const teamSearch: string = watch('team')

  useEffect(() => {
    if (citySearch && citySearch?.length <= 2) {
      setCityOptions([])
      return
    }
    searchCity(citySearch)
  }, [citySearch])

  useEffect(() => {
    setCityOptions([])
    if (!cities || cities?.length <= 0) return
    const newOptions: Option[] = cities?.map((city) => ({
      id: city?.id,
      text: `${city?.name} - ${city?.acronym}`,
    }))
    setCityOptions(newOptions)
  }, [cities])

  useEffect(() => {
    if (teamSearch && teamSearch?.length === 0) {
      return
    }
  }, [teamSearch])

  useEffect(() => {
    if (!teams || teams?.length <= 0) return
    const newOptions: Option[] = teams?.map((team) => ({
      id: team?.id,
      text: team.name,
    }))
    setTeamOptions(newOptions)
  }, [teams])

  const handleCityOption = (option: Option | null) => {
    searchByCityId(option?.id || null)
    if (option?.id) setValue('city_id', option?.id)
  }

  const handleTeamOption = (option: Option | null) => {
    if (option?.id) setValue('team_id', option?.id)
  }

  const handleSave = async (data: TeamData) => {
    console.log(data)
    try {
      saveTeam({ team_id: data?.team_id, name: data?.team, city_id: data?.city_id })
      router.navigate('/(tabs)')
    } catch (error) {
      console.log('handle save player team: ', error)
      const errorHandled = handleError(error)
      if (!errorHandled) return

      errorHandled.response?.data?.errors?.forEach((errorMsg) => {
        showError(errorMsg, 'Erro ao associar jogador a um time')
      })
    }
  }

  return (
    <PageView>
      <ThemedText type='subtitle' style={styles.title}>
        Adicione um time
      </ThemedText>
      <View style={styles.form}>
        <Select
          control={control}
          name='city'
          label='Cidade'
          placeholder='Procurar uma cidade...'
          options={cityOptions}
          handleOption={handleCityOption}
          wrapStyle={{ zIndex: 2 }}
          error={errors.city_id?.message}
        />

        {cityId && (
          <Select
            control={control}
            name='team'
            label='Nome do time'
            placeholder='Procurar um time...'
            options={teamOptions}
            handleOption={handleTeamOption}
            wrapStyle={{ zIndex: 1 }}
            error={errors.team_id?.message}
          />
        )}
        <Space />
        <Button onPress={handleSubmit(handleSave)}>Salvar</Button>
      </View>
    </PageView>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    gap: 8,
  },
})
