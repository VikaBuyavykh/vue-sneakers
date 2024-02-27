<script setup>
import { computed, ref, watch } from 'vue'
import Card from './Card.vue'
const props = defineProps({
  cards: Array,
  isFavorites: Boolean,
  isHomePage: Boolean
})

const count = ref(12)
const isMoreVisible = ref(true)
const doubleCards = computed(() => props.cards.filter((card, index) => index < count.value))
const emit = defineEmits(['onClickFavorite', 'onAddClick'])

function showMore() {
  count.value = count.value + 4
}

watch(doubleCards, () => {
  count.value >= props.cards.length ? (isMoreVisible.value = false) : ''
})
</script>

<template>
  <transition-group name="flip-list" tag="div" class="grid grid-cols-4 gap-5" v-bind:css="false">
    <Card
      v-for="card in doubleCards"
      :key="card.id"
      :title="card.title"
      :imageUrl="card.imageUrl"
      :price="card.price"
      :isFavorite="card.isFavorite"
      :isAdded="card.isAdded"
      @onClickFavorite="() => emit('onClickFavorite', card)"
      @onAddClick="() => emit('onAddClick', card)"
      :isFavorites="isFavorites"
    />
  </transition-group>
  <button
    v-if="isMoreVisible && isHomePage"
    type="button"
    @click="showMore"
    class="mx-auto my-10 py-1 w-1/2 border-none bg-color rounded-xl text-slate-400 text-lg active:bg-lime-500 hover:shadow-xl hover:-translate-y-0.5 transition"
  >
    show more
  </button>
</template>

<style scoped>
.flip-list-move {
  transition: transform 1s ease;
}

.bg-color {
  background-color: rgba(156, 246, 77, 0.28);
}
</style>
<!-- v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave" -->
