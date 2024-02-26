import { nameRegex, emailRegex } from './regex'

export function handleInput(e) {
  function isEmailValid(value) {
    return emailRegex.test(value)
  }
  function isNameValid(value) {
    return nameRegex.test(value)
  }
  const element = e.target
  const errorElement = document.querySelector(`#error-${element.id}`)
  errorElement.textContent = ''
  element.classList.remove('text-rose-500')
  if (element.value.length > 1 && element.id === 'email') {
    if (!isEmailValid(element.value)) {
      errorElement.textContent = 'Передан некорректный email'
      element.classList.add('text-rose-500')
    }
  } else if (element.value.length > 1 && element.id === 'name') {
    if (!isNameValid(element.value)) {
      errorElement.textContent =
        'Имя может содержать латинские и кириллические буквы, пробел и дефис'
      element.classList.add('text-rose-500')
    }
  } else {
    if (!element.checkValidity()) {
      errorElement.textContent = element.validationMessage
      element.classList.add('text-rose-500')
    }
  }
}
