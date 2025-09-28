<script setup>
import {computed, onMounted} from "vue";
import {useProductStore} from "@/stores/ProductStore.js";

const props = defineProps({
  order: Object,
})
const productStore = useProductStore()

const groupedCart = computed(() => {
  const productIds = props.order?.products || []

  const countMap = {};
  productIds.forEach(id => {
    countMap[id] = (countMap[id] || 0) + 1
  })

  return countMap;
})

const productName = (id) => {
  return productStore.productName(productStore.products[id].name)
}
</script>

<template>
  <li class="productName" v-for="(item, index) in groupedCart">
    <span>{{ productName(index) }}</span>
    <b>{{ item }} шт.</b>
  </li>
</template>

<style scoped>
.productName {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>