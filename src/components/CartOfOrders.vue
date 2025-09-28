<script setup>
import CartOfOrdersHeader from "@/components/CartOfOrdersHeader.vue"
import CartListItem from "@/components/CartListItem.vue"
import {useProductStore} from "@/stores/ProductStore.js"
import {computed, ref} from "vue";
import axios from "axios";

const URL = import.meta.env.VITE_APP_API_URL
const productStore = useProductStore()

const totalPrice = computed(() => {
  return productStore.groupedCart.reduce((price, item) => {
    return price + item.counter * item.price
  }, 0)
})

const isDisabled = ref(false)
const makeAnOrder = async() => {
  try {
    isDisabled.value = true
    await axios.post(`${URL}order`, {}, {
      headers: {
        Authorization: `Bearer ${productStore.userToken}`
      }
    })
    productStore.cart = []
  } catch (error) {
    console.log(error)
  } finally {
    isDisabled.value = false
  }
}
</script>

<template>
  <div class="blackout"
       v-if="productStore.cartIsOpen"
       @click="productStore.cartIsOpen = false">
  </div>

  <div :class="{ 'cart-of-orders': true,
      'open-cart': productStore.cartIsOpen }">
    <header class="header">
    <cart-of-orders-header />
    </header>

    <div v-if="totalPrice">
      <div class="wrapper">
        <main class="main">
          <cart-list-item />
        </main>
      </div>

      <footer class="footer">
        <div class="footer-wrapper">
          <p class="totalPrice">Итого: {{ totalPrice }} рублей</p>
          <button @click="makeAnOrder" :style="isDisabled ? {opacity: 0.5} : null" :disabled="isDisabled">Оформить заказ</button>
        </div>
      </footer>
    </div>

    <div v-else class="cartEmpty">
      <img src="../assets/images/empty-cart.jpg" alt="cart empty">
      <h3>Корзина пуста</h3>
    </div>
    </div>

</template>

<style scoped>
.blackout {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.2);
}

.cart-of-orders {
  position: fixed;
  top: 0;
  right: -450px;
  z-index: 101;

  width: 450px;
  height: 100vh;
  background-color: white;

  overflow: auto;
  transition: 0.5s ease;
}

.header {
  position: fixed;
  z-index: 100;

  width: 100%;
  height: 50px;

  background-color: #ffffff;
}

.main {
  margin: 40px 0 70px;
  gap: 10px;

  display: flex;
  flex-direction: column;
}

.wrapper {
  padding: 20px;
}

.open-cart {
  right: 0;
}

.footer {
  position: fixed;
  z-index: 100;
  bottom: 0;

  width: 450px;
  height: 70px;

  background-color: #ffffff;

  display: flex;
  justify-content: center;
}

.footer-wrapper {

  row-gap: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

button {
  cursor: pointer;
  user-select: none;

  color: white;
  background-image: linear-gradient(to right, #6993f8 0%, #3e7fd0 51%, #5986e2 100%);

  padding: 7px 80px;
  gap: 5px;

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

.totalPrice {
  font-size: 18px;
}

.cartEmpty {
  height: 100%;
  width: 100%;
  font-size: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cartEmpty img {
  width: 200px;
}

@media (width <= 650px) {
  .cart-of-orders {
    right: -300px;

    width: 300px;
  }

  .wrapper {
    padding: 10px;
  }

  .open-cart {
    right: 0;
  }

  .footer {
    width: 300px;
  }

  .cartEmpty {
    font-size: 24px;
  }

  .cartEmpty img {
    width: 150px;
  }
}
</style>