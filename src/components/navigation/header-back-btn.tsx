import { StyleSheet, View } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Icon } from '../icon'
import Link from './Link'
import { Href } from 'expo-router'

type Props = {
  href: Href
  text?: string
}

export function HeaderLeftBtn(props: Props) {
  return (
    <Link href={'/menu'}>
      <View style={styles.link}>
        <Icon name='arrow-back' />
        {props.text && <ThemedText type='subtitle'>{props.text}</ThemedText>}
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  },
})
