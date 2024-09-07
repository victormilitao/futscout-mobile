import { Colors } from '@/constants/Colors'
import { PropsWithChildren } from 'react'
import { SafeAreaView, StyleSheet, View, useColorScheme } from 'react-native'

export function PageView({ children }: PropsWithChildren) {
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
    // paddingTop: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
})
