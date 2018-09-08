import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'OVERIDED TOKEN';
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
    (req) => {
        console.log(req);
        return req;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    (res) => {
        console.log(res);
        return res;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
)

export default instance;