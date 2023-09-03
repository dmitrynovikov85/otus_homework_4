<script setup>
import { onMounted, ref } from "vue";
import ProductItem from "./ProductItem.vue";
import getProductList from "../services/index.js";
import Search from "./Search.vue";
import router from "../router/router.js";

const productInCartList = ref([]);
const productList = ref([]);
const filteredProductList = ref([]);
const isAuth = ref(localStorage.getItem("isAuth"));
const login = ref(localStorage.getItem("login"));
const checkAuth = ref(isAuth.value && +isAuth.value === 1);

onMounted(async () => {
  productList.value = await getProductList();
  filteredProductList.value = productList.value;
});
const logout = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("login");
  isAuth.value = "";
  login.value = "";
  checkAuth.value = "";
  router.push("/");
};
const search = (filterPrice, filterProduct) => {
  if (filterPrice && filterProduct) {
    filteredProductList.value = filteredProductList.value.filter(
      (product) =>
        product.title.toLowerCase().includes(filterProduct) &&
        +product.price === +filterPrice
    );
    return;
  }
  if (filterPrice) {
    filteredProductList.value = filteredProductList.value.filter(
      (product) => +product.price === +filterPrice
    );
    return;
  }
  if (filterProduct) {
    filteredProductList.value = filteredProductList.value.filter((product) =>
      product.title.toLowerCase().includes(filterProduct)
    );
    return;
  }
  filteredProductList.value = productList.value;
};
const addProduct = (product) => {

};
</script>

<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      background-color: #9cebd5;
      position: fixed;
      width: 100%;
    "
  >
    <div style="display: flex">
      <router-link :to="{ path: `/` }">
        <div class="wrapper_nav">Home</div>
      </router-link>
      <router-link :to="{ path: `/add_new_product` }" v-if="checkAuth">
        <div class="wrapper_nav">Add New Product</div>
      </router-link>
    </div>
    <div style="display: flex">
      <div class="wrapper_nav" v-if="checkAuth">
        {{ login }}
      </div>
      <router-link :to="{ path: `/cart` }">
        <div style="text-decoration: underline" class="wrapper_nav">Cart</div>
      </router-link>
      <div class="wrapper_nav" @click="logout" v-if="checkAuth">Logout</div>
      <router-link :to="{ path: `/login` }" v-else>
        <div class="wrapper_nav">Login</div>
      </router-link>
    </div>
  </div>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      margin: 50px 20px 0;
      cursor: pointer;
    "
  >
    <Search @search="search" />
  </div>
  <div class="wrapper_products">
    <ProductItem
      v-for="product in filteredProductList"
      :key="product.id"
      :product="product"
      @addProduct="addProduct"
    />
  </div>
</template>

<style scoped>
.wrapper_products {
  display: flex;
  flex-wrap: wrap;
}
.product-price-btn {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 5px;
  justify-content: space-between;
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

input[type="text"] {
  margin: 0 10px;
  width: 250px;
  height: 50px;
  padding-left: 15px;
  border-radius: 6px;
  border: none;
  color: #939393;
  font-weight: 500;
  background-color: #fffbf8;
  -webkit-box-shadow: 0 -2px 2px 0 rgba(199, 199, 199, 0.55), 0 1px 1px 0 #fff,
    0 2px 2px 1px #fafafa, 0 2px 4px 0 #b2b2b2 inset, 0 -1px 1px 0 #f2f2f2 inset,
    0 15px 15px 0 rgba(41, 41, 41, 0.09) inset;
  -moz-box-shadow: 0 -2px 2px 0 rgba(199, 199, 199, 0.55), 0 1px 1px 0 #fff,
    0 2px 2px 1px #fafafa, 0 2px 4px 0 #b2b2b2 inset, 0 -1px 1px 0 #f2f2f2 inset,
    0 15px 15px 0 rgba(41, 41, 41, 0.09) inset;
  box-shadow: 0 -2px 2px 0 rgba(199, 199, 199, 0.55), 0 1px 1px 0 #fff,
    0 2px 2px 1px #fafafa, 0 2px 4px 0 #b2b2b2 inset, 0 -1px 1px 0 #f2f2f2 inset,
    0 15px 15px 0 rgba(41, 41, 41, 0.09) inset;
}
input[type="search"]:focus {
  outline: 0;
}
.wrapper_nav {
  padding: 15px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}
.wrapper_nav:hover {
  color: white;
}
</style>
