<script setup>
import {useProductStore} from "@/stores/ProductStore.js"
import {computed, ref} from "vue";

const props = defineProps({
  item: Object,
})

const productStore = useProductStore()
const URlImage = import.meta.env.VITE_APP_API_URL_IMAGE
const isDisabled = ref(false)

const nameProduct = computed(() => {
  return productStore.productName(props.item.name)
})

const quantifyInCart = computed(() => {
  return productStore.getCartItemCounter(props.item.id)
})

const addCart = async () => {
  await productStore.addToCart(props.item, props.item.id, true, isDisabled)
}
</script>

<template>
  <article class="card">
    <img :src="URlImage + props.item.image" :alt="nameProduct">
    <div class="info-card">
      <div class="container-text">
        <h3 class="title">{{ nameProduct }}</h3>
        <p class="description">{{ props.item.description }}</p>
      </div>

      <div class="container-bottom">
        <b class="price">{{ props.item.price }} руб.</b>
        <button
            v-if="productStore.userIsAuthorized().value"
            @click="addCart"
            class="addToCart"
            :disabled="quantifyInCart >= 14 || isDisabled"
            :style="quantifyInCart >= 14 || isDisabled ? {opacity: 0.5} : {opacity: 1}"
        >
          <b v-if="quantifyInCart > 0">{{ quantifyInCart }}</b>
          <span>В корзину</span>
        </button>
      </div>

    </div>
  </article>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;

  border-radius: 0.75rem;
}

.card {
  position: relative;

  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.02);
  border-radius: 0.75rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-0.1rem);
    box-shadow: 0 10px 15px -5px rgba(0 0 0 / 0.1);
  }
}

.info-card {
  gap: 5px;
  padding: 10px;

  display: inline-flex;
  flex-direction: column;
}

.title {
  font-size: 20px;
  max-width: 250px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.price {
  font-size: 18px;

  padding: 7px 0;
}

.description {
  max-width: 250px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.container-text {
  row-gap: 5px;

  display: flex;
  flex-direction: column;
}

.container-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.addToCart {
  cursor: pointer;
  user-select: none;

  color: white;
  background-image: linear-gradient(to right, #6993f8 0%, #508ad3 51%, #5986e2 100%);

  padding: 7px 30px;
  gap: 10px;

  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;

  box-shadow: 0 0 20px #eee;
  border-radius: 5px;
  border: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-position: right center;
    border-radius: 10px;
  }

  &:active {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5) inset;
  }
}

.counter span {
  font-size: 20px;
}

@media (width <= 1400px) {
  img {
    width: 220px;
  }

  .card {
    width: 220px;
  }

  .description {
    max-width: 200px;
  }

  .title {
    font-size: 18px;
  }

  .price {
    font-size: 14px;
  }

  .description {
    max-width: 220px;
  }

  .addToCart {
    padding: 5px 20px;
    gap: 7px;
  }
}

@media (width <= 1050px) {
  img {
    width: 180px;
  }

  .card {
    width: 180px;
  }

  .title {
    font-size: 16px;
  }

  .price {
    font-size: 12px;
  }

  .description {
    max-width: 180px;
  }

  .addToCart {
    padding: 5px 15px;
    gap: 7px;

    font-size: 10px;
  }
}

@media (width <= 650px) {
  img {
    width: 170px;
  }

  .card {
    width: 170px;
  }

  .title {
    font-size: 16px;
  }

  .price {
    font-size: 12px;
  }

  .addToCart {
    padding: 5px 10px;
    gap: 7px;

    font-size: 10px;
  }
}
</style>