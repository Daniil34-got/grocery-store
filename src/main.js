import { createApp } from 'vue'
import App from './App.vue'
import  { autoAnimatePlugin } from "@formkit/auto-animate/vue"
import { createPinia } from 'pinia'
import {createRouter, createWebHistory} from 'vue-router'

import AppProducts from '@/pages/AppProducts.vue'
import RegistrationWindow from "@/pages/RegistrationWindow.vue"
import AuthenticationWindow from "@/pages/AuthenticationWindow.vue"
import CompletedOrders from "@/pages/CompletedOrders.vue"

const routes = [
    { path: '/', name: 'AppProducts', component: AppProducts },
    { path: '/registration', name: 'RegistrationWindow', component: RegistrationWindow },
    { path: '/authentication', name: 'AuthenticationWindow', component: AuthenticationWindow },
    { path: '/orders', name: 'OrdersWindow', component: CompletedOrders },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.use(createPinia())
app.mount('#app')
