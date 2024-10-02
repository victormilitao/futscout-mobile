import { Ionicons } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { ComponentProps } from 'react'

interface CustomIconProps
  extends IconProps<ComponentProps<typeof Ionicons>['name']> {
  loading?: boolean
}

export function Icon({ style, ...rest }: CustomIconProps) {
  return <Ionicons size={28} style={[style]} {...rest} />
}
