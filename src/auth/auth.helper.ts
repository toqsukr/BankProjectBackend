export const isValidBirthDate = (value: string) => {
  value = value.replace(/\s/g, '')
  if (value.length !== 10) {
    return false
  }

  const day = parseInt(value.substring(0, 2), 10)
  const month = parseInt(value.substring(3, 5), 10)
  const year = parseInt(value.substring(6), 10)

  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > 2007 ||
    value[2] !== '.' ||
    value[5] !== '.'
  ) {
    return false
  }

  return true
}

export const isValidPhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^(\+\d{1,2} )?(\d{1} )?\d{3} \d{3}-\d{2}-\d{2}$/
  return phoneRegex.test(phoneNumber)
}

export const isValidCardNumber = (cardNumber: string) => {
  const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/
  return cardNumberRegex.test(cardNumber)
}
