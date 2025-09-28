<script setup>
import {useProductStore} from "@/stores/ProductStore.js";
import {computed, ref} from "vue";

const props = defineProps({
  item: Object,
})

const disabled = ref(false)

const productStore = useProductStore()
const URlImage = import.meta.env.VITE_APP_API_URL_IMAGE

const nameProduct = computed(() =>
    productStore.productName(props.item.name)
)

const totalPrice = computed(() => {
  return props.item.price * props.item.counter
})

const removeOne = () => {
  productStore.removeFromCart(props.item.id, disabled)
}

const addOne = () => {
  productStore.addToCart(props.item, props.item.product_id, false, disabled)
}
</script>

<template>
  <article v-show="props.item.counter">
    <div class="container">
      <div>
        <img :src="URlImage + props.item.image" alt="cart">
      </div>
      <div class="info-cart">
        <h2 class="title">{{ nameProduct }}</h2>
        <div class="flex-gap">
          <div class="counter">
            <button class="btn"
                    :disabled="disabled"
                    :style="disabled ? {opacity: 0.5} : null"
                    @click="removeOne">-</button>
            <span>{{ props.item.counter }}</span>
            <button class="btn" :disabled="disabled || props.item.counter >= 14"
                    :style="disabled || props.item.counter >= 14 ? {opacity: 0.5} : null"
                    @click="addOne">+</button>
          </div>
          <b class="price">{{ totalPrice }} р.</b>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  padding: 15px;

  border: 1px solid black;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.container {
  column-gap: 10px;

  display: flex;
  align-items: center;
}

.counter {
  gap: 5px;

  display: flex;
  align-items: center;
}

.btn {
  background-color: rgba(0, 0, 0, 0);

  border: none;
  border-radius: 0;
  cursor: pointer;
}

.counter button {
  width: 20px;
  height: 20px;

  background-color: #d5d5d5;
}

.container img {
  width: 80px;
  height: 80px;
}

.flex-gap {
  gap: 10px;

  display: flex;
  flex-direction: column;
}

.info-cart {
  gap: 15px;

  display: flex;
  flex-direction: column;
}

.delete {
  width: 30px;
  height: 30px;
}
</style>