import { Href, Link as LinkExpo, LinkProps } from 'expo-router'
import { ThemedText } from '../ThemedText'
import { PropsWithChildren } from 'react'

type Props = {
  text?: string
  href: Href
} & PropsWithChildren<LinkProps<string | object>>

export default function Link(props: Props) {
  return (
    <LinkExpo href={props.href} style={props.style}>
      {props.text && <ThemedText type='link'>{props.text}</ThemedText>}
      {props.children}
    </LinkExpo>
  )
}
