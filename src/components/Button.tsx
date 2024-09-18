import type { PropsWithChildren } from 'react'
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'

import { useThemeColor } from '../hooks/useThemeColor'

type Props = PropsWithChildren<PressableProps>

export default function Button({ children, ...rest }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const bgColor = useThemeColor({}, 'brandingPrimary')
  const textColor = useThemeColor({}, 'white')

  return (
    <Pressable style={[styles.button, { backgroundColor: bgColor }]} {...rest}>
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
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
