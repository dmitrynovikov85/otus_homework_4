<template>
  <div class="wrapper_in_cart" v-if="routePath === '/cart'">
    <div class="product-img">
      <router-link :to="{ path: `/product/${product.id}` }">
        <img
          :src="product.image"
          class="product_img_in_cart"
          :alt="product.title"
        />
      </router-link>
    </div>
    <div class="product-info" style="width: 100px">
      <p style="font-size: 25px; font-weight: bold; text-align: center">
        <span>{{ product.price }}</span
        >$
      </p>
    </div>
    <div
      class="product-quantity"
      style="width: 150px; display: flex; align-items: center"
    >
      <div class="minus" @click="minusProductItem(product)">-</div>
      <div
        style="
          width: 100px;
          text-align: center;
          font-weight: bold;
          font-size: 20px;
        "
      >
        {{ product.quantity }}
      </div>
      <div class="plus" @click="plusProductItem(product)">+</div>
    </div>
    <div class="product-price-btn">
      <button
        type="button"
        @click="removeProduct(product)"
        @removeProduct="removeProduct"
      >
        remove
      </button>
    </div>
    <div class="product-info" style="width: 100px">
      <p style="font-size: 25px; font-weight: bold; text-align: center">
        <span>{{ product.price }}</span
        >$
      </p>
    </div>
  </div>

  <div v-else class="wrapper">
    <div class="product-img">
      <img :src="product.image" class="product_img" :alt="product.title" />
    </div>
    <div class="product-info">
      <div class="product-text">
        <h1>
          <router-link :to="{ path: `/product/${product.id}` }">
            {{ product.title }}
          </router-link>
        </h1>
        <h2>Category: {{ product.category }}</h2>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-price-btn">
        <p>
          <span>{{ product.price }}</span
          >$
        </p>
        <button type="button" @click="addProductInCart(product)">
          add in cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

defineProps({
  product: Object,
});
const route = useRoute();
const routePath = ref(route.path);
const productsInCart = ref([]);
const emit = defineEmits(["addProduct", "removeProduct"]);
const addProductInCart = (product) => {
  if (localStorage.getItem("productsInCart")) {
    productsInCart.value = JSON.parse(localStorage.getItem("productsInCart"));
  }

  if (product.quantity) {
    let index = productsInCart.value.findIndex(
      (item) => +item.id === +product.id
    );
    productsInCart.value[index].quantity += 1;
  } else {
    product.quantity = 1;
    productsInCart.value.push(product);
  }

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart.value));
  emit("addProduct", product);
};
const removeProduct = (product) => {
  emit("removeProduct", product);
};

const minusProductItem = (product) => {
  emit("minusProductItem", product);
};

const plusProductItem = (product) => {
  emit("plusProductItem", product);
};
</script>

<style scoped>
.wrapper_in_cart {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 70%;
}
.product_img_in_cart {
  width: 50px;
  height: auto;
}
.product_img {
  width: 150px;
  height: auto;
}
.wrapper {
  display: flex;
  height: 320px;
  width: 500px;
  margin: 15px;
  flex: 1;
  border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0 14px 32px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 14px 32px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 14px 32px 0 rgba(0, 0, 0, 0.15);
}

.product-img {
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.product-img img {
  border-radius: 7px 0 0 7px;
}

.product-info {
  display: flex;
  flex-direction: column;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
  justify-content: space-between;
}

.product-text {
  width: 327px;
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
  height: 125px;
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

.minus {
  color: red;
  font-weight: bold;
  font-size: 20px;
}
.plus {
  color: forestgreen;
  font-weight: bold;
  font-size: 20px;
}
.minus,
.plus {
  font-size: 30px;
  padding: 8px 5px 8px 5px;
  text-align: center;
  cursor: pointer;
}
</style>
