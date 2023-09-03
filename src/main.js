import router from './router/router.js';
import './style.css'
import { createApp } from 'vue';
import { Field, Form, ErrorMessage, configure } from 'vee-validate';
import App from './App.vue';

configure({
    validateOnInput: true,
});
const app = createApp(App);
app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);
app.use(router).mount('#app');