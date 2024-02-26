<script setup>
import { inject, provide, ref } from 'vue'
import axios from 'axios'
import Form from '@/components/Form.vue'

const { currentUser, isLoggedIn } = inject('provider')
const apiError = ref('')
const isEditing = ref(false)

function handleClickEdit() {
  isEditing.value = true
  apiError.value = ''
}

async function handleSave() {
  try {
    const { data } = await axios.get('https://d1420ae5d0bea5e1.mokky.dev/users')
    const usersEmails = data
      .map((userData) => userData.email)
      .filter((email) => email !== currentUser.value.email)
    if (usersEmails.includes(document.forms.profile.elements.email.value)) {
      throw new Error('Пользователь с таким email уже существует')
    } else {
      const { data } = await axios.patch(
        `https://d1420ae5d0bea5e1.mokky.dev/users/${currentUser.value.id}`,
        {
          name: document.forms.profile.elements.name.value,
          email: document.forms.profile.elements.email.value
        }
      )
      currentUser.value = data
    }
  } catch (error) {
    error.message === 'Пользователь с таким email уже существует'
      ? (apiError.value = error.message)
      : (apiError.value = 'Что-то пошло не так')
    console.log(error)
  }
  isEditing.value = false
}

provide('profile', { apiError, isEditing })
</script>

<template>
  <Form
    v-if="isLoggedIn"
    :title="`Привет, ${currentUser.name}!`"
    formName="profile"
    :nameInputValue="currentUser.name"
    :emailValue="currentUser.email"
    buttonText="Сохранить"
    linkText="Выйти из аккаунта"
    :onFormSubmit="handleSave"
    :onClickEdit="handleClickEdit"
    isProfilePage
  />
  <div v-else class="flex flex-col gap-6 mx-auto my-10">
    <h2 class="text-2xl text-center">
      Для просмотра и оформления товаров вам необходима авторизация
    </h2>
    <router-link class="text-xl text-center text-lime-500 cursor-pointer" to="/login"
      >Страница авторизации</router-link
    >
  </div>
</template>
