import { Colors } from '@/src/constants/Colors'
import { PropsWithChildren } from 'react'
import { SafeAreaView, StyleSheet, View, useColorScheme } from 'react-native'

type Props = PropsWithChildren

export function PageView({ children }: Props) {
  const colorScheme = useColorScheme() ?? 'light'
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: Colors[colorScheme]?.background },
      ]}
    >
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
  },
})
