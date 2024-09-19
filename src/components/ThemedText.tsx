import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Colors } from '@/src/constants/Colors';
import { Fonts } from '../constants/Fonts';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'info' | 'error';
  colorType?: keyof typeof Colors.light
}

const errorColor = useThemeColor({}, 'error')

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  colorType = 'text',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorType)

  return (
    <Text
      style={[
        { color },
        styles.fixed,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'info' ? styles.info : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'error' ? styles.error : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  fixed: {
    fontFamily: Fonts.poppins
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  error: {
    lineHeight: 30,
    fontSize: 14,
    color: errorColor,
  },
});
