<script setup>
import { inject, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Form from '@/components/Form.vue'

const router = useRouter()
const apiError = ref('')
const isEditing = false
const { isLoggedIn, currentUser } = inject('provider')

async function handleRegister() {
  try {
    const { data } = await axios.post('https://d1420ae5d0bea5e1.mokky.dev/register', {
      name: document.forms.register.elements.name.value,
      email: document.forms.register.elements.email.value,
      password: document.forms.register.elements.password.value
    })
    currentUser.value = data.data
    localStorage.setItem('token', data.token)
    isLoggedIn.value = true
    router.push('/')
  } catch (error) {
    if (error.response.data.statusCode === 401) {
      apiError.value = 'Пользователь с таким email уже существует'
    } else {
      apiError.value = 'Ошибка. Попробуйте зарегистрироваться еще раз'
      console.log(error)
    }
  }
}

provide('register', { apiError, isEditing })
</script>

<template>
  <Form
    title="Добро пожаловать!"
    formName="register"
    buttonText="Зарегистрироваться"
    linkHref="/login"
    linkText="Войти"
    :onFormSubmit="handleRegister"
    isRegisterPage
  >
  </Form>
</template>
