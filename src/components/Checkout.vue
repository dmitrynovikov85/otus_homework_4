<template>
  <div v-if="!success">
    <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ values }">
      <div class="wrapper_form">
        <div class="wrapper_field">
          <label for="name">Customer Name</label>
          <Field name="name" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="name" />
        </div>

        <div class="wrapper_field">
          <label for="birthday">Birthday</label>
          <Field name="birthday" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="birthday" />
        </div>

        <div class="wrapper_field">
          <label for="country">Country</label>
          <Field name="country" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="country" />
        </div>

        <div class="wrapper_field">
          <label for="card">Card</label>
          <Field name="card" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="card" />
        </div>

        <div class="wrapper_field">
          <label for="email">Email</label>
          <Field name="email" type="text" />
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="email" />
        </div>

        <div class="wrapper_consent">
          <Field name="consent" type="checkbox" />
          <label for="consent" class="consent"
            >Consent to personal data processing</label
          >
        </div>
        <div class="wrapper_error">
          <ErrorMessage name="consent" />
        </div>
        <div class="product-price-btn">
          <button>Submit</button>
        </div>
      </div>
    </Form>
  </div>
  <div v-if="success" class="wrapper_success">Data Sent Successfully</div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";
import { ref } from "vue";
const success = ref(false);
const schema = {
  name: (value) => {
    if (value && value.length > 6) {
      return true;
    }
    return "Name must contain at least 6 characters";
  },
  birthday: (value) => {
    let re = /^(\d{1,2})\.(\d{1,2})(?:\.(\d{4}))?$/;
    if (value && re.test(value)) {
      return true;
    }
    return "Invalid Birthday";
  },
  country: (value) => {
    if (value && value.length >= 4) {
      return true;
    }
    return "Country must contain at least 4 characters";
  },
  card: (value) => {
    let re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
    if (value && re.test(value)) {
      return true;
    }
    return "Invalid card";
  },
  email: (value) => {
    let re = /\S+@\S+\.\S+/;
    if (value && re.test(value)) {
      return true;
    }
    return "Invalid Email";
  },
  consent: (value) => {
    if (!!value) {
      return "You must apply consent";
    }
    return true;
  },
};
function onSubmit(values) {
  axios
    .post("https://httpbin.org/post", values, {
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
