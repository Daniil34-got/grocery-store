<script setup>
import CartItem from "@/components/CartItem.vue"
import {useProductStore} from "@/stores/ProductStore.js"

const productStore = useProductStore()
</script>

<template>
  <div class="orders" v-for="item in productStore.groupedCart" :key="item.product_id">
    <cart-item
      :item="item"
    />
  </div>
</template>
