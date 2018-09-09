import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-f39e4.firebaseio.com'
});

export default instance;