import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "axios";

export const useProductStore = defineStore("productStore", () => {
    const userToken = ref(localStorage.getItem('token') === undefined || localStorage.getItem('token') === '' ? '' : localStorage.getItem('token'));
    const URL = import.meta.env.VITE_APP_API_URL

    const cartIsOpen = ref(false)
    const cart = ref([])
    const products = ref([])

    const changeToken = (token) => {
        userToken.value = token
    }

    const getCartItemCounter = (id) => {
        const item = groupedCart.value.find(i => i.product_id === id)
        return item ? item.counter : 0
    }

    const userIsAuthorized = () => {
        return userToken
    }

    const productName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    const loadCard = async () => {
        try {
            const { data } = await axios.get(`${URL}products`)

            products.value = data.data.map(item => ({
                ...item,
                counter: 1
            }))
        } catch (error) {
            console.error(error);
        }
    }

    const loadCart = async () => {
        try {
            const { data } = await axios.get(`${URL}cart`, {
                headers: { Authorization: `Bearer ${userToken.value}` }
            });

            cart.value = data.data.map(item => ({
                ...item,
                counter: 1
            }))
        } catch (error) {
            console.error(error);
        }
    }

    const groupedCart = computed(() => {
        const grouped = {}
        cart.value.forEach(item => {
            const key = item.product_id
            if (grouped[key]) {
                grouped[key].counter += item.counter || 1
            } else {
                grouped[key] = {
                    ...item,
                    counter: item.counter || 1
                }
            }
        })
        return Object.values(grouped);
    })

    const removeFromCart = async(id, isDisabled) => {
        try {
            isDisabled.value = true
            await axios.delete(`${URL}cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`
                }
            })

            const existing = cart.value.find(item => item.id === id)
            if (existing && existing.counter > 1) {
                existing.counter -= 1;
            } else {
                cart.value = cart.value.filter(item => item.id !== id)
            }
        } catch (error) {
            console.error(error)
        } finally {
            isDisabled.value = false
        }
    }

    const addToCart = async(product, productId, flag, isDisabled) => {
        isDisabled.value = true
        const existing = cart.value.find(item => item.product_id === product.product_id)
        if (existing) {
            existing.counter += 1
        } else {
            cart.value.push({ ...product, counter: 1 })
        }

        try {
            await axios.post(`${URL}cart/${productId}`, {}, {
                headers: { Authorization: `Bearer ${userToken.value}` }
            })

            if (flag) {
                await loadCart()
            }
        } catch (error) {
            console.error(error)

            if (existing) {
                existing.counter -= 1;
            } else {
                cart.value.pop();
            }
        } finally {
            isDisabled.value = false
        }
    }

    return {
        URL,
        cart,
        userToken,
        cartIsOpen,
        products,

        changeToken,
        userIsAuthorized,
        productName,
        removeFromCart,
        addToCart,
        loadCart,
        loadCard,

        groupedCart,
        getCartItemCounter,
    }
})