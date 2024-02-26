<script setup>
import { inject } from 'vue'

defineProps({
  onBackClick: Function
})

const { handleDrawer } = inject('provider')
</script>

<template>
  <div class="flex justify-between items-center">
    <svg
      @click="handleDrawer"
      class="rotate-180 opacity-60 hover:opacity-100 hover:-translate-x-1.5 cursor-pointer transition"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H14.7143"
        stroke="YellowGreen"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="YellowGreen"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <h2 class="text-2xl font-bold text-right">Корзина</h2>
  </div>
</template>
