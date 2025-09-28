<script setup>
import {reactive, ref} from "vue"
import axios from "axios";
import {useRouter} from "vue-router";
import {useProductStore} from "@/stores/ProductStore.js";

const URL = import.meta.env.VITE_APP_API_URL
const router = useRouter()
const productStore = useProductStore()

const isShowPassword = ref(false)

const dataUser = reactive({
  email: "",
  password: "",
})

const validationError = reactive({
  error: {
    flag: true,
    message: '',
  },
})

const viewPassword = () => {
  isShowPassword.value = !isShowPassword.value

  const password = document.getElementById(['password'])

  if (password.getAttribute('type') === 'text') {
    password.setAttribute("type", "password")
  } else {
    password.setAttribute("type", "text")
  }
}

async function isAuth(dataUser, validationError) {
  try {
    validationError.error.message = ''

    const userToken = await axios.post(`${URL}login`, dataUser)
    const token = userToken.data.data.user_token

    localStorage.setItem('token', token)
    productStore.changeToken(token)

    await router.push('/')
  } catch (error) {
    console.log(error)
    if (error.response?.data.error?.message !== undefined) {
      validationError.error.message = 'Неверный пароль или электронная почта'
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <h2>Вход в аккаунт</h2>

    <form class="form" @submit.prevent="isAuth(dataUser, validationError)">
      <div class="input-box">
        <input id="email" type="email" required placeholder=" " v-model="dataUser.email"/>
        <label for="email">Email</label>
      </div>

      <div class="input-box">
        <input id="password" type="password" required v-model="dataUser.password"/>
        <label for="password">Пароль</label>
        <div>
          <img src="../assets/images/openEye.png" alt="Посмотреть пароль" class="eye"
               v-if="isShowPassword" @click="viewPassword">
          <img src="../assets/images/closedEye.png" alt="Скрыть пароль" class="eye"
               v-else @click="viewPassword">
        </div>
        <p class="error" v-if="validationError.error.flag">{{ validationError.error.message }}</p>
      </div>

      <button>Войти</button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 700px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 30px;
  font-weight: 400;

  margin-bottom: 30px;
}

.form {
  row-gap: 30px;
  padding:30px;

  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.form h2 {
  font-size: 32px;
  color: #000000;
  text-align: center;
}

.input-box {
  position: relative;

  width: 310px;

  padding: 0 40px 0 20px;

  border: 1px solid #000000;
  border-radius: 5px;
}

.input-box input {
  width: 100%;
  height: 40px;
  font-size: 14px;

  color: #000000;

  border: none;
  outline: none;
  border-radius: 5px;
}

input:focus + label,
input:valid + label,
input[type="email"]:not(:placeholder-shown)  + label {
  top: -9px;
  left: 15px;

  font-size: 14px;

  background-color: white;
  padding: 0 5px;
}

.input-box label {
  position: absolute;
  top: 11px;
  left: 20px;

  font-size: 16px;

  color: #000000;

  transition: 0.3s;

  pointer-events: none;
}

.eye {
  position: absolute;
  top: 11px;
  right: 10px;

  width: 20px;
  height: 20px;

  cursor: pointer;
}

.error {
  position: absolute;
  left: 10px;

  color: red;
}

button {
  padding: 7px 30px;
}

@media (width <= 650px) {
  .wrapper {
    max-width: 330px;
  }
}
</style>