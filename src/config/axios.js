import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-app-apis-qej0.onrender.com/api'
    // baseURL: 'http://localhost:5000/api'
});

export default instance;