import Button from '@/src/components/Button'
import Select from '@/src/components/form/select'
import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import zod from 'zod'

export default function NewTeam() {
  const newTeamValidation = zod.object({
    name: zod.any(),
  })
  type TeamData = zod.infer<typeof newTeamValidation>

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TeamData>({
    resolver: zodResolver(newTeamValidation),
    defaultValues: {
      name: {},
    },
    mode: 'onSubmit',
  })

  const options = [
    { id: 1, text: 'Fortaleza' },
    { id: 2, text: 'Sao Paulo' },
    { id: 3, text: 'Recife' },
  ]

  const handleSave = async (data) => {
    console.log(data)
  }

  return (
    <PageView>
      {/* <ScrollView automaticallyAdjustKeyboardInsets> */}
      <ThemedText type='subtitle' style={styles.title}>
        Adicione um time
      </ThemedText>
      <View style={styles.form}>
        <Select
          control={control}
          name='name'
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
