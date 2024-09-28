import type { PropsWithChildren } from 'react'
import { StyleSheet, TextInputProps, TextInput } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Fonts } from '@/src/constants/Fonts'

type Props = PropsWithChildren<TextInputProps> & {
  label?: string
  error?: string
}

export default function Input({ children, error, ...rest }: Props) {
  return (
    <>
      {rest.label && <ThemedText type='default'>{rest.label}</ThemedText>}
      <TextInput style={[styles.input]} autoCapitalize='none' {...rest} />
      {error && <ThemedText type='error'>{error}</ThemedText>}
    </>
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
