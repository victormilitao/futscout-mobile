import Select from '@/src/components/form/select'
import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import zod from 'zod'

export default function NewTeam() {
  const newTeamValidation = zod.object({
    name: zod.string().min(1, 'Campo obrigatório'),
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
      name: '',
    },
    mode: 'onSubmit',
  })

  return <Select control={control} name='name' label='' />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  list: {
    position: 'absolute',
    top: 50, // ajusta conforme a posição do input
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    zIndex: 10,
    maxHeight: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  option: {
    padding: 10,
  },
  contentBelow: {
    marginTop: 100, // ajuste conforme o layout
  },
})
