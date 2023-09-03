import axios from 'axios';

async function getProductList() {
    try {
        const res = await axios.get('https://fakestoreapi.com/products');
        return res.data;
    } catch (error) {
        console.log(error);
        return '';
    }
}

export default getProductList;