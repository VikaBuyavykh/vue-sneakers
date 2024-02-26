<script setup>
defineProps({
  totalPrice: Number,
  isLoggedIn: Boolean
})

const emit = defineEmits(['onCartClick'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8 min-w-768">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul v-if="isLoggedIn" class="flex items-center gap-10">
      <li
        @click="() => emit('onCartClick')"
        class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="Иконка корзины" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <li>
        <router-link
          to="/favorites"
          class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
        >
          <img src="/heart.svg" alt="Иконка закладок" />
          <span>Закладки</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/profile"
          class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
        >
          <img src="/profile.svg" alt="Иконка профиля" />
          <span>Профиль</span>
        </router-link>
      </li>
    </ul>

    <ul v-else class="flex items-center gap-10">
      <li>
        <router-link to="/register" class="text-base font-semibold text-gray-500 hover:text-black"
          >Регистрация</router-link
        >
      </li>
      <li>
        <router-link to="/login" class="">
          <button
            class="hover:shadow-xl hover:-translate-y-0.5 transition border-none rounded-2xl bg-lime-300 text-white text-base pt-3 pb-4 px-8 font-semibold active:bg-lime-400"
          >
            Войти
          </button>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.min-w-768 {
  min-width: 768px;
}
</style>
