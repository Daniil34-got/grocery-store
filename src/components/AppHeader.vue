<script setup>
import {useProductStore} from "@/stores/ProductStore.js"
import axios from "axios";

const productStore = useProductStore()

const logoutFromAccount = async() => {
  try {
    await axios.get(`${productStore.URL}logout`, {
      headers: {
        Authorization: `Bearer ${productStore.userToken}`
      }
    })

    productStore.changeToken('')
    localStorage.removeItem('token')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <nav class="header-logo">
    <router-link to="/" class="container-logo">
      <img src="../assets/images/logo.svg" alt="logo" />
      <h1>Просто <br> купить</h1>
    </router-link>
  </nav>

  <nav class="header-actions" v-if="!productStore.userIsAuthorized().value">
    <router-link to="registration">Зарегистрироваться</router-link>
    <router-link to="authentication">Войти</router-link>
  </nav>
  <nav class="header-actions" v-else>
    <router-link to="/orders">Оформленные заказы</router-link>
    <p @click="productStore.loadCart(); productStore.cartIsOpen = true">Корзина</p>
    <router-link to="authentication" @click="logoutFromAccount">Выйти</router-link>
  </nav>
</template>

<style scoped>
.header-logo {
  gap: 5px;

  display: flex;
  align-items: center;
}

.container-logo {
  display: flex;
  align-items: center;
}

.header-actions {
  font-size: 20px;

  gap: 30px;

  display: flex;
  align-items: center;
}

.header-actions a,
.header-actions p {
  color: grey;
  cursor: pointer;

  &:hover {
    color: black;
  }
}

.header-logo img {
  width: 50px;
  height: 50px;
}

h1 {
  font-size: 24px;
  font-weight: 400;
  line-height: 0.8;
  letter-spacing: 2px;
}

@media (width <= 1050px) {
  .header-logo img {
    width: 40px;
    height: 40px;
  }

  h1 {
    font-size: 20px;
  }

  .header-actions {
    font-size: 16px;

    gap: 20px;
  }
}

@media (width <= 650px) {

}
</style>