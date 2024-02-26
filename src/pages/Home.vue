<script setup>
import { inject, ref, watch } from 'vue'
import axios from 'axios'
import Cards from '../components/Cards.vue'

const { handleClickAdd, cards, initialCards, nameFilter, favoritesIds, isLoggedIn, currentUser } =
  inject('provider')

const sortBy = ref('')
const searchQuery = ref('')

function onSelectChange(e) {
  sortBy.value = e.target.value
}

function onInput(e) {
  searchQuery.value = e.target.value
}

function cheapFilter(arr) {
  return arr.sort((a, b) => a.price - b.price)
}

function richFilter(arr) {
  return arr.sort((a, b) => b.price - a.price)
}

function searchQueryFilter(arr) {
  return arr.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLocaleLowerCase())
  )
}

function filterCards(arr) {
  if (sortBy.value === 'cheapPrice') {
    cards.value = cheapFilter(arr)
  } else if (sortBy.value === 'richPrice') {
    cards.value = richFilter(arr)
  } else {
    cards.value = nameFilter(arr)
  }
}

async function handleClickFavorite(item) {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      favoritesIds.value.push(item.productId)
      await axios.post('https://d1420ae5d0bea5e1.mokky.dev/favorites', {
        ...item,
        owner: currentUser.value.id
      })
    } else {
      item.isFavorite = false
      favoritesIds.value.splice(favoritesIds.value.indexOf(item.productId), 1)
      const { data: favorites } = await axios.get(`https://d1420ae5d0bea5e1.mokky.dev/favorites`)
      const favorite = favorites
        .filter((item) => item.owner === currentUser.value.id)
        .find((favorite) => favorite.productId === item.productId)
      await axios.delete(`https://d1420ae5d0bea5e1.mokky.dev/favorites/${favorite.id}`)
    }
  } catch (error) {
    console.log(error)
  }
}

watch(sortBy, () => {
  filterCards(cards.value)
})

watch(searchQuery, () => {
  filterCards(
    searchQueryFilter(
      initialCards.value.map((card) => ({
        ...card,
        isFavorite: favoritesIds.value.includes(card.productId)
      }))
    )
  )
})
</script>

<template>
  <div v-if="isLoggedIn" class="flex justify-between gap-5">
    <h1 class="text-3xl font-bold">Все кроссовки</h1>
    <div class="flex justify-between gap-3">
      <select
        @change="onSelectChange"
        class="min-w-56 cursor-pointer outline-none border rounded-3xl border border-slate-100 border-solid py-2 px-3 text-slate-500 focus:border-slate-300 appearance-none select-arrow"
      >
        <option value="name">По названию</option>
        <option value="cheapPrice">По возрастанию цены</option>
        <option value="richPrice">По убыванию цены</option>
      </select>
      <div class="relative">
        <img src="/search.svg" alt="Иконка поиска" class="absolute top-3 left-4" />
        <input
          @input="onInput"
          type="search"
          placeholder="Поиск..."
          class="non-cross cursor-pointer outline-none border rounded-3xl border border-slate-100 border-solid focus:border-slate-300 py-2 pl-12 pr-4 text-slate-500 appearance-none"
        />
      </div>
    </div>
  </div>
  <Cards
    v-if="isLoggedIn"
    :cards="cards"
    isHomePage
    @onAddClick="handleClickAdd"
    @onClickFavorite="handleClickFavorite"
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

<style scoped>
.select-arrow {
  background-image: url('/select.png');
  background-size: 10px;
  background-position: bottom 15px right 20px;
  background-repeat: no-repeat;
  max-height: 41.6px;
}
.non-cross::-webkit-search-cancel-button {
  display: none;
}
</style>
