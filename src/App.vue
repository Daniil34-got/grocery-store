<script setup>
import AppHeader from "@/components/AppHeader.vue";
import CartOfOrders from "@/components/CartOfOrders.vue";
</script>

<template>
  <div class="wrapper">
    <cart-of-orders/>

    <header class="header">
      <app-header />
    </header>

    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1440px;
  margin: 0 auto;
}

.header {
  user-select: none;
  width: 100%;

  border-bottom: 1px #1d397d solid;

  padding: 10px 60px;
  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main {
  max-width: 85%;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (width <= 650px) {
  .header{
    gap: 10px;
    padding: 10px 40px;

    flex-direction: column;
  }
}
</style>