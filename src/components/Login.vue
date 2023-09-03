<template>
  <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ values }">
    <div class="wrapper_form">
      <div class="wrapper_field">
        <label for="login">Login</label>
        <Field
          name="login"
          type="text"
          placeholder="Login"
          class="login_field"
        />
      </div>
      <div class="wrapper_error">
        <ErrorMessage name="login" />
      </div>

      <div class="wrapper_field">
        <label for="password">Password</label>
        <Field
          name="password"
          type="password"
          placeholder="Password"
          class="login_field"
        />
      </div>
      <div class="wrapper_error">
        <ErrorMessage name="password" />
      </div>

      <div class="product-price-btn">
        <button>Login</button>
      </div>
    </div>
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import router from "../router/router.js";
import { onMounted, ref } from "vue";
const isAuth = ref(localStorage.getItem("isAuth"));
const schema = {
  login: (value) => {
    if (value && value.length >= 4) {
      return true;
    }
    return "Login must contain at least 4 characters";
  },
  password: (value) => {
    if (value && value.length >= 6) {
      return true;
    }
    return "Password must contain at least 6 characters";
  },
};
onMounted(() => {
  if (isAuth.value && +isAuth.value === 1) {
    router.push("/add_new_product");
  }
});
function onSubmit(values) {
  localStorage.setItem("isAuth", "1");
  localStorage.setItem("login", values.login);
  router.push("/add_new_product");
}
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

.login_field {
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
</style>
