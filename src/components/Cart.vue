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
      <router-link :to="{ path: `/` }" v-if="checkAuth">
        <div class="wrapper_nav">Add product</div>
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
      margin-top: 70px;
      flex-direction: column;
      width: 100%;
      align-items: center;
    "
  >
    <div style="text-align: center; font-size: 30px; margin: 20px">
      SHOPPING CART
    </div>

    <ProductItem
      v-for="product in productsInCart"
      :key="product.id"
      :product="product"
      @removeProduct="removeProduct"
      @minusProductItem="minusProductItem"
      @plusProductItem="plusProductItem"
    />

    <div class="wrapper_total">
      <div style="margin-right: 40px">TOTAL:</div>
      <div>
        <p style="font-size: 25px; font-weight: bold; text-align: center">
          <span>{{ total }}</span
          >$
        </p>
      </div>
    </div>
    <div class="wrapper_checkout">
      <div class="product-price-btn">
        <router-link :to="{ path: `/checkout` }">
          <button type="button">checkout</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ProductItem from "./ProductItem.vue";

const productsInCart = ref([]);
const total = ref(0);
const isAuth = ref(localStorage.getItem("isAuth"));
const login = ref(localStorage.getItem("login"));
const checkAuth = ref(isAuth.value && +isAuth.value === 1);
onMounted(() => {
  productsInCart.value = JSON.parse(localStorage.getItem("productsInCart"));
  calcTotal();
});
const removeProduct = (product) => {
  productsInCart.value = JSON.parse(localStorage.getItem("productsInCart"));
  let index = productsInCart.value.findIndex(
    (item) => +item.id === +product.id
  );
  productsInCart.value.splice(index, 1);
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart.value));
  calcTotal();
};
const minusProductItem = (product) => {
  productsInCart.value = JSON.parse(localStorage.getItem("productsInCart"));
  let index = productsInCart.value.findIndex(
    (item) => +item.id === +product.id
  );
  productsInCart.value[index].quantity -= 1;
  if (productsInCart.value[index].quantity === 0) {
    removeProduct(product);
  }
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart.value));
  calcTotal();
};
const plusProductItem = (product) => {
  productsInCart.value = JSON.parse(localStorage.getItem("productsInCart"));
  let index = productsInCart.value.findIndex(
    (item) => +item.id === +product.id
  );
  productsInCart.value[index].quantity += 1;
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart.value));
  calcTotal();
};

const calcTotal = () => {
  total.value = 0;
  productsInCart.value.forEach(function (product) {
    total.value += product.price * product.quantity;
  });
  total.value = +total.value.toFixed(2);
};
const goToCheckout = () => {};
</script>

<style scoped>
.wrapper_checkout {
  width: 70%;
  display: flex;
  justify-content: flex-end;
}
.wrapper_total {
  margin: 25px 120px 25px 0;
  width: 70%;
  display: flex;
  justify-content: flex-end;
  /*margin-right: 120px;*/
  /* margin: 25px 0; */
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  align-items: center;
}
.column_labels {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.wrapper_product {
}
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

.product-info {
  display: flex;
  flex-direction: column;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
  justify-content: space-between;
}

.product-img {
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  height: 190px;
  max-width: 200px;
}
</style>
