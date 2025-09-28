<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import {useProductStore} from "@/stores/ProductStore.js";
import ProcessedGoods from "@/components/ProcessedGoods.vue";

const orders = ref([])
const productStore = useProductStore()
const URL = import.meta.env.VITE_APP_API_URL



onMounted( async() => {
  try {
    const { data } = await axios.get(`${URL}order`, {
      headers: {
        Authorization: `Bearer ${productStore.userToken}`
      }
    })
    orders.value = data.data
  } catch (error) {
    console.log(error)
  }
})

onMounted(() => {
  productStore.loadCard()
})

</script>

<template>
  <h2>Оформленные заказы</h2>

  <div class="orders">
    <article v-for="(order, index) of orders" class="order">
      <ul>
        <processed-goods
            :order="order"
        />
      </ul>

      <div class="container-bottom">
        <h4>Номер заказа: {{index + 1}}</h4>
        <b>{{order.order_price}} р.</b>
      </div>

    </article>
  </div>

</template>

<style scoped>
.orders {
  gap: 20px 50px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.order {
  width: 300px;

  background-color: #dadada;
  padding: 20px;
  gap: 10px;

  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  font-size: 30px;
  font-weight: 100;

  margin-bottom: 20px;
}

.container-bottom {
  font-size: 16px;
  font-weight: 200;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (width <= 1050px) {
  .order {
    width: 250px;
  }
}
</style>