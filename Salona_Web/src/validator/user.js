// validations.js
export const validateName = (name) => {
  if (!name.trim()) {
    return 'Name is required.'
  }
  if (name.length < 3) {
    return 'Name must be at least 3 characters long.'
  }
  return null
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    return 'Email is required.'
  }
  if (!emailRegex.test(email)) {
    return 'Enter a valid email address.'
  }
  return null
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/
  if (!phone) {
    return 'Phone number is required.'
  }
  if (!phoneRegex.test(phone)) {
    return 'Enter a valid 10-digit phone number.'
  }
  return null
}

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.'
  }
  return null
}
