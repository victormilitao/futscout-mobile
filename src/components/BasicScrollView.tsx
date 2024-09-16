import type { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'

import { ThemedView } from '@/src/components/ThemedView'

type Props = ViewProps & PropsWithChildren

export default function BasicScrollView({ children, style }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  return (
    <ThemedView style={[style]}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  )
}
