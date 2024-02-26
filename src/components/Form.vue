<script setup>
import { inject } from 'vue'
import { handleInput } from '@/utils/handleInput'

const props = defineProps({
  title: String,
  formName: String,
  nameInputValue: String,
  emailValue: String,
  buttonText: String,
  linkHref: String,
  linkText: String,
  onFormSubmit: Function,
  onClickEdit: Function,
  isLoginPage: Boolean,
  isRegisterPage: Boolean,
  isProfilePage: Boolean
})

const { apiError } = inject(
  props.isLoginPage ? 'login' : props.isRegisterPage ? 'register' : 'profile'
)
const { isEditing } = inject(
  props.isLoginPage ? 'login' : props.isRegisterPage ? 'register' : 'profile'
)
const { isLoggedIn, currentUser, cards } = inject('provider')

function logOut() {
  isLoggedIn.value = false
  cards.value = []
  localStorage.clear()
}

function checkValidity(e) {
  apiError.value = ''
  const form = e.target.form
  const formErrors = form.querySelectorAll('span')
  const formInputs = form.querySelectorAll('input')
  const formButton = form.querySelector('button[type="submit"]')
  const isFormInvalid = Array.from(formErrors).some((error) => {
    return error.textContent !== ''
  })
  const hasAnEmptyInput = Array.from(formInputs).some((input) => {
    return input.value === ''
  })
  if (!isFormInvalid && !hasAnEmptyInput) {
    formButton.removeAttribute('disabled')
  } else {
    formButton.setAttribute('disabled', true)
  }
  if (form.name.name === 'name') {
    if (
      Array.from(formInputs)[0].value === currentUser.value.name &&
      Array.from(formInputs)[1].value === currentUser.value.email
    ) {
      formButton.setAttribute('disabled', true)
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-24 items-center w-550 my-20 mx-auto">
    <h2 class="text-3xl font-bold text-center">{{ title }}</h2>
    <form
      @submit.prevent="onFormSubmit"
      @input="checkValidity"
      :name="formName"
      :id="formName"
      novalidate
      class="flex flex-col items-stretch w-full"
    >
      <div
        v-if="!isLoginPage"
        class="flex flex-col w-full pt-6 pb-2 border-b border-solid border-lime-400"
      >
        <div class="flex w-full justify-between gap-10">
          <label for="name" class="text-xl">Имя</label>
          <input
            @input="handleInput"
            type="text"
            name="name"
            id="name"
            :value="isProfilePage ? nameInputValue : ''"
            placeholder="Введите имя"
            minlength="2"
            maxlength="30"
            required
            :disabled="isProfilePage && !isEditing"
            class="w-full text-xl bg-transparent placeholder:text-slate-400 placeholder:font-thin placeholder:text-base text-right font-semibold outline-none"
          />
        </div>
        <span id="error-name" class="min-h-5 text-rose-500 text-right text-sm"></span>
      </div>

      <div class="flex flex-col w-full pt-6 pb-2 border-b border-solid border-lime-400">
        <div class="flex w-full justify-between gap-10">
          <label for="email" class="text-xl">Email</label>
          <input
            @input="handleInput"
            type="text"
            name="email"
            id="email"
            :value="isProfilePage ? emailValue : ''"
            placeholder="Ваша почта"
            minlength="2"
            maxlength="30"
            required
            :disabled="isProfilePage && !isEditing"
            class="w-full text-xl bg-transparent placeholder:text-slate-400 placeholder:font-thin placeholder:text-base text-right font-semibold outline-none"
          />
        </div>
        <span id="error-email" class="min-h-5 text-rose-500 text-right text-sm"></span>
      </div>
      <div
        v-if="!isProfilePage"
        class="flex flex-col w-full pt-6 pb-2 border-b border-solid border-lime-400"
      >
        <div class="flex w-full justify-between gap-10">
          <label for="password" class="text-xl">Пароль</label>
          <input
            @input="handleInput"
            type="password"
            name="password"
            id="password"
            placeholder="Введите пароль"
            minlength="8"
            maxlength="30"
            required
            class="w-full text-xl bg-transparent placeholder:text-slate-400 placeholder:font-thin placeholder:text-base text-right font-semibold outline-none"
          />
        </div>
        <span id="error-password" class="min-h-5 text-rose-500 text-right text-sm"></span>
      </div>
      <span class="min-h-5 text-rose-500 text-center text-sm mt-20">{{ apiError }}</span>
      <button
        v-if="isProfilePage && !isEditing"
        @click="onClickEdit"
        type="button"
        class="mt-4 w-2/3 self-center rounded-2xl border-none bg-lime-300 text-white text-lg pt-3 pb-4 font-semibold disabled:bg-slate-400 disabled:shadow-none disabled:translate-y-0 active:bg-lime-400 hover:shadow-xl hover:-translate-y-0.5 transition"
      >
        Редактировать
      </button>
      <button
        v-else
        disabled
        type="submit"
        class="mt-4 w-2/3 self-center rounded-2xl border-none bg-lime-300 text-white text-lg pt-3 pb-4 font-semibold disabled:bg-slate-400 disabled:shadow-none disabled:translate-y-0 active:bg-lime-400 hover:shadow-xl hover:-translate-y-0.5 transition"
      >
        {{ buttonText }}
      </button>
      <router-link
        v-if="!isProfilePage"
        :to="linkHref"
        class="mt-4 cursor-pointer no-underline text-lg font-semibold text-center text-slate-400"
        >{{ linkText }}</router-link
      >
      <router-link
        v-if="isProfilePage"
        @click="logOut"
        to="/login"
        class="mt-4 cursor-pointer no-underline text-lg font-semibold text-center text-slate-400"
        >{{ linkText }}</router-link
      >
    </form>
  </div>
</template>

<style scoped>
.w-550 {
  width: 550px;
}

form div:last-of-type {
  border: none;
}
</style>
