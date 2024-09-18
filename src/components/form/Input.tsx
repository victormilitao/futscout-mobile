import type { PropsWithChildren } from 'react'
import { StyleSheet, TextInputProps, TextInput } from 'react-native'
import { ThemedText } from '../ThemedText'

type Props = PropsWithChildren<TextInputProps> & {
  label?: string
  error?: string
}

export default function Input({ children, error, ...rest }: Props) {
  // const bgColor = useThemeColor({}, 'brandingPrimary')
  // const textColor = useThemeColor({}, 'white')

  return (
    <>
      {rest.label && <ThemedText type='default'>{rest.label}</ThemedText>}
      <TextInput
        style={[styles.input]}
        placeholder='Senha'
        autoCapitalize='none'
        {...rest}
      />
      {error && <ThemedText>{error}</ThemedText>}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
})
