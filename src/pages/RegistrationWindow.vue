<script setup>
import {computed, reactive, ref} from "vue"
import axios from "axios";
import {useRouter} from "vue-router";

const URL = import.meta.env.VITE_APP_API_URL
const router = useRouter()
const isShowPassword = ref(false)

const fioUser = reactive({
  firstName: "",
  lastName: "",
  patronymic: ""
})
const dataUser = reactive({
  fio: computed(() => `${fioUser.lastName} ${fioUser.firstName} ${fioUser.patronymic}`),
  email: "",
  password: "",
})

const validationError = reactive({
  errorEmailMessage: '',
  errorPasswordMessage: '',
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

async function isRegister(dataUser, validationError) {
  try {
    validationError.errorEmailMessage = ' '
    validationError.errorPasswordMessage = ' '

    await axios.post(`${URL}signup`, dataUser)
    await router.push('/authentication')
  } catch (error) {
    if (error.response.data.errors[0]?.email !== undefined) {
      validationError.errorEmailMessage = error.response.data.errors[0].email[0] === 'The email must be a valid email address.' ?
          'Такой электронной почты не существует.' : 'Такая электронная почта уже занята.'
    }
    if (error.response.data.errors[0]?.password !== undefined) {
      validationError.errorPasswordMessage = error.response.data.errors[0].password[0] === 'The password must be at least 6 characters.' ?
          'Пароль должен содержать не менее 6 символов.' : ''
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <h2>Регистрация</h2>

    <form class="form" @submit.prevent="isRegister(dataUser, validationError)">
      <div class="input-box">
        <input id="lastName" type="text" autocomplete="on" required v-model="fioUser.lastName">
        <label for="lastName">Фамилия</label>
      </div>

      <div class="input-box">
        <input id="firstName" type="text" autocomplete="on" required v-model="fioUser.firstName">
        <label for="firstName">Имя</label>
      </div>

      <div class="input-box">
        <input id="patronymic" type="text" autocomplete="on" required v-model="fioUser.patronymic">
        <label for="patronymic">Отчество</label>
      </div>

      <div class="input-box">
        <input id="email" type="email" autocomplete="on" required placeholder=" " v-model="dataUser.email"/>
        <label for="email">Email</label>
        <p class="error">{{ validationError.errorEmailMessage }}</p>
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
        <p class="error">{{ validationError.errorPasswordMessage }}</p>
      </div>

      <button>Зарегистрироваться</button>
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
  padding: 7px 20px;
}

@media (width <= 650px) {
  .wrapper {
    max-width: 330px;
  }
}
</style>