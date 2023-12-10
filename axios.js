import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://51.83.131.199:8080',
    timeout: 100000000000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;