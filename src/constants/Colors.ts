/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#1D6C45'
const tintColorDark = '#fff'
const tintColorWhite = '#fff'
const error = 'red'

export const Colors = {
  light: {
    text: '#0F0E0E',
    infoText: '#1D6C45',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    brandingPrimary: '#228352',
    white: tintColorWhite,
    error: error,
    disabled: '#8BB8A0'
  },
  dark: {
    text: '#ECEDEE',
    infoText: '#1D6C45',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    brandingPrimary: '#228352',
    white: tintColorWhite,
    error: error,
    disabled: '#8BB8A0'
  },
}
