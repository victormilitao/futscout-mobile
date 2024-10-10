import Toast, { ToastType } from 'react-native-toast-message'

export const showSuccess = (msg: string, title?: string) => {
  toast('success', msg, title || 'Sucesso')
}

export const showError = (msg: string, title?: string) => {
  toast('error', msg, title || 'Erro')
}

export const showInfo = (msg: string, title?: string) => {
  toast('info', msg, title || 'Informação')
}

const toast = (type: ToastType, msg: string, title: string) => {
  Toast.show({
    type,
    text1: title,
    text2: msg,
  })
}
