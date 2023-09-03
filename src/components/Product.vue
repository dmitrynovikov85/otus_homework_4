<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

defineProps({
  product: Object,
});

const route = useRoute();
const product = ref({});
onMounted(async () => {
  const routeParams = route.params;
  const res = await axios.get(
    "https://fakestoreapi.com/products/" + routeParams.id
  );
  product.value = res.data;
});
</script>

<template>
  <div class="wrapper">
    <div class="product-img">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="product-info">
      <div class="product-text">
        <h1>
          <u><router-link :to="{ name: 'Catalog' }">Catalog</router-link></u> -
          {{ product.title }}
        </h1>
        <h2>Category: {{ product.category }}</h2>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-price-btn">
        <p>
          <span>{{ product.price }}</span
          >$
        </p>
        <button type="button">add in cart</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex: 1;
  border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0 14px 32px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 14px 32px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 14px 32px 0 rgba(0, 0, 0, 0.15);
}

.product-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.product-img img {
  border-radius: 7px 0 0 7px;
  max-width: 300px;
}

.product-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
  justify-content: space-between;
}

.product-text h1 {
  margin: 0 0 0 38px;
  padding: 5px 0;
  font-size: 16px;
  color: #474747;
}
.product-text h1 a {
  color: #474747;
}

.product-text h2 {
  margin: 0 0 0 38px;
  padding: 5px 0;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  color: #d2d2d2;
  letter-spacing: 0.2em;
}

.product-text p {
  margin: 0 0 0 38px;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.product-price-btn {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 5px;
  justify-content: space-between;
}

.product-price-btn p {
  margin: 0 0 0 38px;
  font-size: 28px;
  color: #474747;
}

.product-price-btn button {
  display: inline-block;
  height: 50px;
  width: 176px;
  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #9cebd5;
  cursor: pointer;
  outline: none;
}

.product-price-btn button:hover {
  background-color: #79b0a1;
}
</style>
