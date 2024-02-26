<script setup>
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'
import Cards from '../components/Cards.vue'

const favorites = ref([])
const { currentUser, isLoggedIn } = inject('provider')

async function getfavorites() {
  try {
    const { data } = await axios.get('https://d1420ae5d0bea5e1.mokky.dev/favorites')
    favorites.value = data.filter((favorite) => favorite.owner === currentUser.value.id)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getfavorites()
})
</script>

<template>
  <h1 v-if="isLoggedIn" class="text-3xl font-bold">Мои закладки</h1>
  <Cards v-if="isLoggedIn" :cards="favorites" isFavorites />
  <div v-else class="flex flex-col gap-6 mx-auto my-10">
    <h2 class="text-2xl text-center">
      Для просмотра и оформления товаров вам необходима авторизация
    </h2>
    <router-link class="text-xl text-center text-lime-500 cursor-pointer" to="/login"
      >Страница авторизации</router-link
    >
  </div>
</template>
