import Button from '@/src/components/Button'
import Select, { Option } from '@/src/components/form/select'
import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { useCity } from '@/src/contexts/city'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import zod from 'zod'

export default function NewTeam() {
  const { cities, searchCity } = useCity()
  const [options, setOptions] = useState<Option[]>([])
  const newTeamValidation = zod.object({
    city: zod.any(),
  })
  type TeamData = zod.infer<typeof newTeamValidation>

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TeamData>({
    resolver: zodResolver(newTeamValidation),
    defaultValues: {
      city: '',
    },
    mode: 'onSubmit',
  })

  const citySearch = watch('city')
  useEffect(() => {
    console.log('citySearch: ', citySearch)
    if (citySearch) searchCity(citySearch)
  }, [citySearch])

  useEffect(() => {
    console.log('cities: ', cities)
    if (!cities) return
    const newOptions: Option[] = cities?.map((city) => ({
      id: city?.id,
      text: city.name,
    }))
    setOptions(newOptions)
  }, [cities])

  const handleSave = async (data) => {
    console.log(data)
  }

  return (
    <PageView>
      {/* <ScrollView automaticallyAdjustKeyboardInsets> */}
      <ThemedText type='subtitle' style={styles.title}>
        Adicione um time
        {options.length}
      </ThemedText>
      <View style={styles.form}>
        <Select
          control={control}
          name='city'
          label=''
          placeholder='Selecione uma cidade...'
          options={options}
        />
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
