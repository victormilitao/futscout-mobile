import { StyleSheet, View } from 'react-native'

type SpaceProps = {
  size?: 'sm' | 'md' | 'lg'
}

export default function Space({ size = 'sm' }: SpaceProps) {
  const spaceSize = { sm: 10, md: 20, lg: 40 } as const
  return <View style={[{ height: spaceSize[size] }]} />
}
