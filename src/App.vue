<script setup>
import axios from 'axios'
import { computed, onMounted, provide, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const isDrawerOpened = ref(false)
const initialCards = ref([])
const cards = ref([])
const addedCards = ref(JSON.parse(localStorage.getItem('addedCards')) || [])
const favoritesIds = ref([])
const isLoggedIn = ref(false)
const currentUser = ref({})
const totalPrice = computed(() => addedCards.value.reduce((sum, card) => sum + card.price, 0))
const router = useRouter()

function handleDrawer() {
  isDrawerOpened.value ? (isDrawerOpened.value = false) : (isDrawerOpened.value = true)
}

function handleClickAdd(item) {
  if (!item.isAdded) {
    item.isAdded = true
    addedCards.value.push(item)
  } else {
    item.isAdded = false
    addedCards.value.splice(addedCards.value.indexOf(item), 1)
    cards.value.splice(
      cards.value.indexOf(cards.value.find((card) => card.productId === item.productId)),
      1,
      item
    )
  }
}

function nameFilter(arr) {
  return arr.sort((a, b) => a.title.localeCompare(b.title))
}

async function getInitials() {
  try {
    const { data } = await axios.get('https://d1420ae5d0bea5e1.mokky.dev/items')
    initialCards.value = nameFilter(data).map((item) => {
      return { ...item, isFavorite: false, isAdded: false, productId: item.id }
    })
    cards.value = initialCards.value
  } catch (error) {
    console.log(error)
  }
}

async function getFavorites() {
  try {
    const { data: favorites } = await axios.get('https://d1420ae5d0bea5e1.mokky.dev/favorites')
    const myFavorites = favorites.filter((favorite) => favorite.owner === currentUser.value.id)
    favoritesIds.value = myFavorites.map((favorite) => favorite.productId)
    cards.value = cards.value.map((card) =>
      favoritesIds.value.includes(card.productId) ? { ...card, isFavorite: true } : card
    )
  } catch (error) {
    console.log(error)
  }
}

async function auth() {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const { data } = await axios.get('https://d1420ae5d0bea5e1.mokky.dev/auth_me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      currentUser.value = data
      isLoggedIn.value = true
      router.push('/')
    } catch (error) {
      console.log(error)
      router.push('/login')
      isLoggedIn.value = false
    }
  }
}

onMounted(async () => {
  await auth()
  await getInitials()
  await getFavorites()
  cards.value = cards.value.map((card) => ({
    ...card,
    isAdded: addedCards.value.some((item) => item.productId === card.productId)
  }))
})

watch(isLoggedIn, async () => {
  if (isLoggedIn.value) {
    await getInitials()
    await getFavorites()
  }
})

watch(
  addedCards,
  () => {
    localStorage.setItem('addedCards', JSON.stringify(addedCards.value))
  },
  {
    deep: true
  }
)

watch(addedCards, () => {
  cards.value = cards.value.map((card) => {
    return { ...card, isAdded: false }
  })
})

provide('provider', {
  handleDrawer,
  handleClickAdd,
  addedCards,
  cards,
  initialCards,
  nameFilter,
  totalPrice,
  favoritesIds,
  isLoggedIn,
  currentUser
})
</script>

<template>
  <div class="w-4/5 mx-auto bg-white rounded-xl shadow-xl my-14 min-w-768">
    <Header :totalPrice="totalPrice" @onCartClick="handleDrawer" :isLoggedIn="isLoggedIn" />
    <div class="flex flex-col gap-10 p-10">
      <router-view></router-view>
    </div>
  </div>
  <transition name="fade">
    <Drawer v-if="isDrawerOpened" />
  </transition>
</template>

<style scoped>
.min-w-768 {
  min-width: 768px;
}
.fade-enter-active {
  animation: 0.6s fade forwards ease-in-out;
}

.fade-leave-active {
  animation: 0.5s fade reverse ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
