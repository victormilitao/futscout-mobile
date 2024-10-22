import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { isValid, parse } from 'date-fns'
import Input from './Input'

interface DateInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  error?: string
  defaultValue?: string
}

const DateInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'dd/mm/aaaa',
  error,
}: DateInputProps<T>) => {
  const [date, setDate] = useState<string>('')

  const formatDate = (text: string) => {
    const numbers = text.replace(/\D/g, '')

    if (numbers.length >= 2) {
      const day = numbers.slice(0, 2)
      const month = numbers.slice(2, 4)
      const year = numbers.slice(4, 8)

      const formattedDate = `${day}${month.length ? '/' : ''}${month}${
        year.length ? '/' : ''
      }${year}`

      return formattedDate
    }
    return numbers
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Input
          control={control}
          name={name}
          label={label}
          placeholder={placeholder || 'dd/mm/aaaa'}
          keyboardType='numeric'
          onChangeText={(text) => onChange(formatDate(text))}
          error={error}
        />
      )}
    />
  )
}

export default DateInput
