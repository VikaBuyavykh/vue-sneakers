<script setup>
defineProps({
  title: String,
  imageUrl: String,
  price: Number
})
const emit = defineEmits(['onClickAdd'])
</script>

<template>
  <div
    class="flex items-center gap-3 p-5 rounded-3xl border border-slate-100 border-solid hover:shadow-xl hover:-translate-y-0.5 transition"
  >
    <img :src="imageUrl" :alt="title" class="w-1/4 object-contain object-center" />
    <div class="flex flex-col justify-between gap-2">
      <span class="text-gray-900 font-medium leading-4 text-sm">{{ title }}</span>
      <b class="text-gray-900 text-sm">{{ price }} руб.</b>
    </div>
    <img
      @click="() => emit('onClickAdd')"
      src="/close.svg"
      alt="Иконка удаления"
      class="w-6 self-end object-contain object-center opacity-70 hover:opacity-100 cursor-pointer"
    />
  </div>
</template>
