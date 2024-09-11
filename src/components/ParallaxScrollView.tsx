import type { PropsWithChildren, ReactElement } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { ThemedView } from '@/src/components/ThemedView'
import { PageView } from './PageView'

const HEADER_HEIGHT = 300

type Props = PropsWithChildren<{
  headerImage: ReactElement
  centeredImage?: ImageSourcePropType
}>

export default function ParallaxScrollView({
  children,
  headerImage,
  centeredImage,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light'
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={1}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          {headerImage}
          {centeredImage && (
            <View style={styles.logoContainer}>
              <Image source={centeredImage} style={styles.centeredImage} />
            </View>
          )}
        </Animated.View>
        <PageView>{children}</PageView>
      </Animated.ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  logoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
  },
  centeredImage: {
    width: 150,
    height: 150,
  },
})
