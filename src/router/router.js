import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../components/Catalog.vue';
import Product from '../components/Product.vue';
import Cart from '../components/Cart.vue';
import Checkout from '../components/Checkout.vue';
import Login from '../components/Login.vue';
import AddNewProduct from '../components/AddNewProduct.vue';

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Catalog
    },
    {
        path: '/',
        name: 'Catalog',
        component: Catalog
    },
    {
        path: '/product/:id',
        component: Product,
        name: 'Product',
        props: true
    },
    {
        path: '/cart',
        component: Cart,
        name: 'Cart',
        props: true
    },
    {
        path: '/checkout',
        component: Checkout,
        name: 'Checkout',
        props: true
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
        props: true
    },
    {
        path: '/add_new_product',
        component: AddNewProduct,
        name: 'AddNewProduct',
        props: true
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;