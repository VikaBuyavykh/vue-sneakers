<script setup>
defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  isFavorites: Boolean
})
const emit = defineEmits(['onClickFavorite', 'onAddClick'])
</script>

<template>
  <div
    class="flex flex-col justify-between gap-2 p-5 relative max-w-56 bg-white rounded-3xl border border-slate-100 border-solid hover:-translate-y-1.5 hover:shadow-2xl transition cursor-pointer"
  >
    <img
      v-if="!isFavorites"
      @click="() => emit('onClickFavorite')"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="Иконка лайка"
      class="absolute top-4 left-4"
    />
    <img :src="imageUrl" :alt="title" />
    <p class="text-gray-900 font-medium leading-5">{{ title }}</p>
    <div class="flex justify-between gap-15">
      <div class="flex flex-col">
        <span class="text-slate-400 text-xs uppercase">Цена:</span>
        <b class="text-gray-900">{{ price }} руб.</b>
      </div>
      <img
        v-if="!isFavorites"
        @click="() => emit('onAddClick')"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="Иконка добавления товара"
      />
    </div>
  </div>
</template>
