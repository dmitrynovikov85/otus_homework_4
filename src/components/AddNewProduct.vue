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

  <div v-if="!success" style="margin: 50px 20px 0">
    <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ values }">
      <div class="wrapper_form">
        <div class="wrapper_field">
          <label for="title">Title</label>
          <Field name="title" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="title" />
        </div>

        <div class="wrapper_field">
          <label for="price">Price</label>
          <Field name="price" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="price" />
        </div>

        <div class="wrapper_field">
          <label for="description">Description</label>
          <Field
            as="textarea"
            name="description"
            type="text"
            style="resize: none"
          />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="description" />
        </div>

        <div class="wrapper_field">
          <label for="image">Image</label>
          <Field name="image" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="image" />
        </div>

        <div class="wrapper_field">
          <label for="category">Category</label>
          <Field name="category" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="category" />
        </div>

        <div class="product-price-btn">
          <button>Add New Product</button>
        </div>
      </div>
    </Form>
  </div>
  <div
    v-else
    style="
      margin: 50px 20px 0;
      font-weight: bold;
      font-size: 30px;
      text-align: center;
    "
  >
    NEW PRODUCT HAS BEEN SUCCESSFULLY ADDED<br />
    <div class="wrapper_nav add_new_product" @click="addOneMoreProduct">
      Add One More Product
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";
import { ref } from "vue";
import router from "../router/router.js";
const success = ref(false);
const isAuth = ref(localStorage.getItem("isAuth"));
const login = ref(localStorage.getItem("login"));
const checkAuth = ref(isAuth.value && +isAuth.value === 1);

const schema = {
  title: (value) => {
    if (value && value.length > 6) {
      return true;
    }
    return "Title must contain at least 6 characters";
  },
  price: (value) => {
    let re = /^[+-]?\d+(\.\d+)?$/;
    if (value && re.test(value)) {
      return true;
    }
    return "Invalid price";
  },
  description: (value) => {
    if (value && value.length >= 4) {
      return true;
    }
    return "Description must contain at least 4 characters";
  },
  image: (value) => {
    if (value) {
      return true;
    }
    return "Invalid image";
  },
  category: (value) => {
    if (value && value.length > 6) {
      return true;
    }
    return "Category must contain at least 6 characters";
  },
};
function onSubmit(values) {
  axios
    .post("https://fakestoreapi.com/products", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      console.log(response);
      if (+response.status === 200) {
        success.value = true;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
const logout = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("login");
  isAuth.value = "";
  login.value = "";
  checkAuth.value = "";
  router.push("/");
};

const addOneMoreProduct = () => {
  success.value = false;
  router.push("/add_new_product");
};
</script>

<style scoped>
.wrapper_form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper_field {
  margin: 10px;
  display: flex;
  align-items: center;
}
.wrapper_field label {
  display: block;
  width: 120px;
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
  margin: 0 10px;
  display: inline-block;
  height: 50px;
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

input[type="text"],
textarea {
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
.consent {
  margin-bottom: 2px;
}
.wrapper_consent {
  display: flex;
  align-items: center;
}
.wrapper_error {
  font-size: 12px;
  color: red;
}
.wrapper_success {
  text-align: center;
  font-size: 30px;
  margin-top: 30px;
  color: #1dab1d;
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
.add_new_product:hover {
  color: forestgreen;
}
</style>
