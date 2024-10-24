import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import Input from './Input'
import { formatDateOnInput } from '@/src/lib/date'

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
  placeholder,
  error,
}: DateInputProps<T>) => {
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
          onChangeText={(text) => onChange(formatDateOnInput(text))}
          error={error}
        />
      )}
    />
  )
}

export default DateInput
