import type { PropsWithChildren } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { useThemeColor } from '../hooks/useThemeColor'

type Props = {
  isLoading?: boolean
} & PropsWithChildren<TouchableOpacityProps>

export default function Button({ children, isLoading = true, ...rest }: Props) {
  const disabled = useThemeColor({},'disabled')
  const brandingPrimary = useThemeColor({},'brandingPrimary')
  const textColor = useThemeColor({}, 'white')
  const backgroundColor = (rest.disabled || isLoading) ? disabled : brandingPrimary

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      disabled={isLoading}
      {...rest}
    >
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
      {isLoading && <ActivityIndicator color={textColor}></ActivityIndicator>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
})
