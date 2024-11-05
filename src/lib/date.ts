import { format, isValid, parse, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const isDateValid = (value: string): boolean => {
  return isValid(parse(value, 'dd/MM/yyyy', new Date()))
}

export const formatDateOnInput = (value: string) => {
  const numbers = value.replace(/\D/g, '')

  if (numbers.length >= 2) {
    const day = numbers.slice(0, 2)
    const month = numbers.slice(2, 4)
    const year = numbers.slice(4, 8)

    const formattedDate = `${day}${month.length ? '/' : ''}${month}${
      year.length ? '/' : ''
    }${year}`

    return formattedDate
  }
  return numbers
}

export const formatToBr = (date): string => {
  if (!date) return date
  const dataISO = parseISO(date)
  return format(dataISO, 'dd/MM/yyyy', { locale: ptBR })
}
