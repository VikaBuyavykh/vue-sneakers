<script setup>
import { inject, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Form from '@/components/Form.vue'

const router = useRouter()
const apiError = ref('')
const isEditing = false
const { isLoggedIn, currentUser } = inject('provider')

async function handleLogin() {
  try {
    const { data } = await axios.post('https://d1420ae5d0bea5e1.mokky.dev/auth', {
      email: document.forms.login.elements.email.value,
      password: document.forms.login.elements.password.value
    })
    currentUser.value = data.data
    localStorage.setItem('token', data.token)
    isLoggedIn.value = true
    router.push('/')
  } catch (error) {
    if (error.response.data.statusCode === 401) {
      apiError.value = 'Вы ввели неправльный логин или пароль'
    } else {
      apiError.value = 'Ошибка. Попробуйте авторизоваться еще раз'
      console.log(error)
    }
  }
}

provide('login', { apiError, isEditing })
</script>

<template>
  <Form
    title="Рады видеть!"
    formName="login"
    nameInputValue=""
    emailValue=""
    buttonText="Войти"
    linkHref="/register"
    linkText="Регистрация"
    :onFormSubmit="handleLogin"
    isLoginPage
  />
</template>
