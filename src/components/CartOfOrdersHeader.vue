<script setup>
import {useProductStore} from "@/stores/ProductStore.js"

const productStore = useProductStore();
const closeCart = () => {
  productStore.cartIsOpen = false
}
</script>

<template>
  <div class="exit" @click="closeCart">
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <h2 class="title">Корзина</h2>
  </div>
</template>

<style scoped>
.exit {
  position: fixed;
  z-index: 100;

  column-gap: 12px;
  margin: 10px 20px;

  display: inline-flex;
  align-items: center;

  opacity: 0.6;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateX(-3px);
  }
}

.exit svg {
  rotate: 180deg;
}

.title {
  font-size: 24px;
  font-weight: bold;
}
</style>