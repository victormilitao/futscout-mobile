import type { PropsWithChildren } from 'react'
import {
  StyleSheet,
  TextInputProps,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { ThemedText } from '../ThemedText'
import { Fonts } from '@/src/constants/Fonts'
import { ThemedView } from '../ThemedView'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = PropsWithChildren<TextInputProps> & {
  label?: string
  error?: string
  control?: Control<T>
  wrapStyle?: StyleProp<ViewStyle>
  name: Path<T>
}

export default function Input<T extends FieldValues>({
  children,
  name,
  error,
  control,
  wrapStyle,
  ...rest
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <ThemedView style={wrapStyle}>
            {rest.label && <ThemedText type='default'>{rest.label}</ThemedText>}
            <TextInput
              style={[styles.input]}
              autoCapitalize='none'
              onChangeText={onChange}
              value={value}
              {...rest}
            />
            {error && <ThemedText type='error'>{error}</ThemedText>}
          </ThemedView>
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    fontFamily: Fonts.default,
    fontSize: 16,
  },
})
