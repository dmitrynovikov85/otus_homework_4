<template>
  <div style="display: flex; justify-content: center; margin: 10px 0">
    <div>
      <input type="text" placeholder="Price" v-model="filterPrice" />
      <input type="text" placeholder="Product" v-model="filterProduct" />
    </div>
    <div class="product-price-btn">
      <button type="button" @click="emit('search', filterPrice, filterProduct)">
        Search
      </button>
      <button type="button" @click="clear">Clear</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filterPrice = ref(null);
const filterProduct = ref(null);
const emit = defineEmits(["search"]);
const clear = function () {
  filterPrice.value = "";
  filterProduct.value = "";
  emit("search", "", "");
};
</script>

<style scoped>
.product-price-btn {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 5px;
  justify-content: space-between;
}
.product-price-btn button {
  margin: 0 10px;
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
</style>
