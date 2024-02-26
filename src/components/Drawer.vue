<script setup>
import axios from 'axios'
import { computed, inject, ref } from 'vue'
import DrawerHead from './DrawerHead.vue'
import AddedCards from './AddedCards.vue'
import InfoBlock from './InfoBlock.vue'

const { addedCards, totalPrice, handleDrawer } = inject('provider')
const isLoading = ref(false)
const orderId = ref(null)
const isOrderButtonDisabled = computed(() =>
  addedCards.value.length === 0 ? true : isLoading.value ? true : false
)
const tax = computed(() => Math.round((totalPrice.value / 100) * 5))

async function makeOrder() {
  try {
    isLoading.value = true
    const { data } = await axios.post('https://d1420ae5d0bea5e1.mokky.dev/orders', {
      order: addedCards.value,
      price: totalPrice.value
    })
    orderId.value = data.id
    addedCards.value = []
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fixed w-full h-full inset-0 overlay z-10 cursor-pointer" @click="handleDrawer">
    <div
      @click.stop
      class="fixed w-96 h-full right-0 top-0 bg-white z-20 p-8 flex flex-col justify-between overflow-y-scroll cursor-default"
    >
      <div class="flex flex-col gap-6 h-full">
        <DrawerHead />

        <div v-if="totalPrice" class="flex flex-col h-full justify-between">
          <AddedCards />
          <transition name="fade">
            <div v-if="totalPrice" class="flex flex-col gap-6 mt-5">
              <div class="flex gap-3">
                <p>Итого:</p>
                <div class="border-b border-dashed border-slate-300 grow mb-1"></div>
                <b>{{ totalPrice }} руб.</b>
              </div>
              <div class="flex justify-between gap-3">
                <p>Налог 5%:</p>
                <div class="border-b border-dashed border-slate-300 grow mb-1"></div>
                <b>{{ tax }} руб.</b>
              </div>
              <button
                @click="makeOrder"
                :disabled="isOrderButtonDisabled"
                class="rounded-2xl border-none bg-lime-300 text-white pt-3 pb-4 font-semibold disabled:bg-slate-400 disabled:shadow-none disabled:translate-y-0 active:bg-lime-400 hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                Оформить заказ
              </button>
            </div></transition
          >
        </div>
        <transition name="fade2">
          <div v-if="!totalPrice" class="flex flex-col justify-center items-center h-full">
            <InfoBlock
              :title="orderId ? 'Заказ оформлен!' : 'Корзина пустая'"
              :description="
                orderId
                  ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                  : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
              "
              :imageUrl="orderId ? '/order-success-icon.png' : '/package-icon.png'"
              :alt="orderId ? 'Иконка успешно оформленного заказа' : 'Иконка пустой корзины'"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.7);
}
.fade-enter-active {
  animation: 0.3s fade forwards ease-in-out;
}

.fade-leave-active {
  animation: 0.3s fade reverse ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade2-enter-active {
  animation: 1s fade forwards ease-in-out;
}

.fade2-enter,
.fade2-leave-to {
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
