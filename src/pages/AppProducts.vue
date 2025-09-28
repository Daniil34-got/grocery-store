<script setup>
import { onMounted, ref } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import {useProductStore} from "@/stores/ProductStore.js";

const productStore = useProductStore()

const items = ref()
const isLoading = ref(false)

onMounted( async() => {
  try {
    isLoading.value = true

    await productStore.loadCard()
    await productStore.loadCart()

    items.value = productStore.products

    isLoading.value = false
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="wrapper">
    <h2 class="catalog-title">Каталог товаров</h2>
    <div class="product-cards" v-auto-animate>
      <product-card
          v-for="item in items"
          :item="item"
      />
    </div>
  </div>
  <div class="loader-container" v-if="isLoading">
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
  </div>
</template>

<style scoped>
.catalog-title {
  font-size: 30px;
  font-weight: 500;

  margin-bottom: 40px;
}

.product-cards {
  gap: 30px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
}

.loader-container {
  gap: 30px;
  margin-top: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-bar {
  width: 40px;
  height: 160px;
  background: linear-gradient(to bottom, #dec7fb, #90b9ff);
  border-radius: 8px;
  animation: pulse 1.4s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(37, 117, 252, 0.25);
}

/* Задержки для плавной волны */
.loader-bar:nth-child(1) { animation-delay: 0s; }
.loader-bar:nth-child(2) { animation-delay: 0.2s; }
.loader-bar:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 100% {
    transform: scaleY(1);
    opacity: 1;
  }
  50% {
    transform: scaleY(1.1);
    opacity: 0.7;
  }
}

@media (width <= 1400px) {
  .catalog-title {
    margin-bottom: 30px;
  }

  .wrapper {
    width: 1000px;
  }
}

@media (width <= 1050px) {
  .product-cards {
    gap: 10px;
    grid-template-columns:  repeat(3, 1fr);
  }

  .wrapper {
    width: 600px;
  }
}

@media (width <= 650px) {
  .wrapper {
    width: 400px;
  }

  .product-cards {
    grid-template-columns:  repeat(2, 1fr);
  }
}
</style>