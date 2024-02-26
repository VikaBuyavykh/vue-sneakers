<script setup>
import { inject } from 'vue'
import AddedCard from './AddedCard.vue'
const { addedCards, handleClickAdd } = inject('provider')
</script>

<template>
  <transition-group name="list" tag="div" class="flex flex-col gap-5">
    <AddedCard
      v-for="card in addedCards"
      :key="card.id"
      :title="card.title"
      :imageUrl="card.imageUrl"
      :price="card.price"
      :isAdded="card.isAdded"
      @onClickAdd="handleClickAdd(card)"
    />
  </transition-group>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s linear;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
