export const formatDateOnInput = (text: string) => {
  const numbers = text.replace(/\D/g, '')

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