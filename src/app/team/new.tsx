import Button from '@/src/components/Button'
import Select, { Option } from '@/src/components/form/select'
import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { useCity } from '@/src/contexts/city'
import { useTeam } from '@/src/contexts/team'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import zod from 'zod'

export default function NewTeam() {
  const { cities, searchCity } = useCity()
  const { teams, searchByCityId } = useTeam()
  const [cityOptions, setCityOptions] = useState<Option[]>([])
  const [teamOptions, setTeamOptions] = useState<Option[]>([])

  const newTeamValidation = zod.object({
    city: zod.any().optional(),
    city_id: zod.number({ required_error: 'Selecione uma cidade' }).nullable(),
    team: zod.any().optional(),
    team_id: zod.number({ required_error: 'Selecione um time' }).nullable(),
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
      city_id: undefined
    },
    mode: 'onSubmit',
  })

  const citySearch: string = watch('city')
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
      text: city.name,
    }))
    setCityOptions(newOptions)
  }, [cities])

  useEffect(() => {
    console.log('teamSearch: ',teamOptions)
    if (teamSearch && teamSearch?.length === 0) {
      // setTeamOptions([])
      return
    }
  }, [teamSearch])

  useEffect(() => {
    console.log('teams: ',teams)
    if (!teams || teams?.length <= 0) return
    const newOptions: Option[] = teams?.map((city) => ({
      id: city?.id,
      text: city.name,
    }))
    setTeamOptions(newOptions)
  }, [teams])

  const handleCityOption = (option: Option | null) => {
    searchByCityId(option?.id || null)
    setValue('city_id', option?.id || null)
  }

  const handleTeamOption = (option: Option | null) => {
    setValue('team_id', option?.id || null)
  }

  const handleSave = async (data) => {
    console.log(data)
  }

  return (
    <PageView>
      {/* <ScrollView automaticallyAdjustKeyboardInsets> */}
      <ThemedText type='subtitle' style={styles.title}>
        Adicione um time
        {cityOptions.length}
        /{teamOptions.length}
      </ThemedText>
      <View style={styles.form}>
        <Select
          control={control}
          name='city'
          label='Cidade'
          placeholder='Procurar uma cidade...'
          options={cityOptions}
          handleOption={handleCityOption}
        />
        {teamOptions?.length > 0 && (
          <Select
            control={control}
            name='team'
            label='Nome do time'
            placeholder='Procurar um time...'
            options={teamOptions}
            handleOption={handleTeamOption}
          />
        )}
        <Button onPress={handleSubmit(handleSave)}>Salvar</Button>
      </View>
      {/* </ScrollView> */}
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
