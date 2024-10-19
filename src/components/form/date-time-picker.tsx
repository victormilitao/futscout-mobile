import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerEvent,
  IOSNativeProps,
} from '@react-native-community/datetimepicker'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { ThemedText } from '../ThemedText'
import { Icon } from '../icon'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useThemeColor } from '@/src/hooks/useThemeColor'

type DateTimePickerAllProps = AndroidNativeProps | IOSNativeProps

type Props<T extends FieldValues> = DateTimePickerAllProps & {
  control?: Control<T>
  name: Path<T>
  error?: string
  label?: string
}

export default function DatePicker<T extends FieldValues>({
  name,
  control,
  error,
  mode = 'date',
  ...props
}: Props<T>) {
  const brandingPrimary = useThemeColor({}, 'brandingPrimary')
  const [show, setShow] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  const Mode = { date: 'date', time: 'time' }

  const handleDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ): Date | undefined => {
    setShow(false)
    if (!selectedDate) return undefined
    setDate(selectedDate)
    return selectedDate
  }

  const handlePress = () => {
    setShow(true)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const setDate = (event, selectedDate) => {
          onChange(handleDate(event, selectedDate))
        }
        return (
          <>
            <TouchableOpacity onPress={handlePress}>
              {props.label && (
                <ThemedText type='default'>{props.label}</ThemedText>
              )}
              <View style={styles.content}>
                <Icon name='calendar' color={brandingPrimary} />
                <ThemedText>{date.toLocaleDateString('pt-BR')}</ThemedText>
              </View>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                mode='date'
                onChange={setDate}
                display='inline'
              />
            )}
            {error && <ThemedText type='error'>{error}</ThemedText>}
          </>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
})
