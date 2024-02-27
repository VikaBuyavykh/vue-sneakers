<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>

<template>
  <h2 class="text-9xl text-center mt-32">404</h2>
  <p class="text-3xl text-center">Страница не найдена</p>
  <a class="text-xl text-center text-lime-500 hover:opacity-50 mb-32" @click="goBack">Назад</a>
</template>
