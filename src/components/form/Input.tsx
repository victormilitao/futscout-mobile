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

type Props = PropsWithChildren<TextInputProps> & {
  label?: string
  error?: string
  wrapStyle?: StyleProp<ViewStyle>
}

export default function Input({ children, error, wrapStyle, ...rest }: Props) {
  return (
    <ThemedView style={wrapStyle}>
      {rest.label && <ThemedText type='default'>{rest.label}</ThemedText>}
      <TextInput style={[styles.input]} autoCapitalize='none' {...rest} />
      {error && <ThemedText type='error'>{error}</ThemedText>}
    </ThemedView>
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
