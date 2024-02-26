<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
  alt: String
})
</script>

<template>
  <img :src="imageUrl" :alt="alt" class="w-1/3 object-contain object-center" />
  <h3 class="text-xl font-bold text-center">{{ title }}</h3>
  <p class="text-base font-medium text-center text-slate-400">{{ description }}</p>
</template>
