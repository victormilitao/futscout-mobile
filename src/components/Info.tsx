import { ReactNode } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type Props = {
  children: ReactNode
} & ViewProps

export default function Info({ children, style }: Props) {
  return <View style={[styles.infoDetails, style]}>{children}</View>
}

const styles = StyleSheet.create({
  infoDetails: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 10,
    width: 'auto',
    alignSelf: 'flex-start',
  },
})
