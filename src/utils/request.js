// src/utils/request.js
import router from '@/router';
import axios from 'axios';

const instance = axios.create({
  // baseURL: import.meta.env.VITE_APP_SERVICE_API, // 设置统一的请求地址
  baseURL: 'http://localhost:5173', // 设置统一的请求地址
  timeout: 10000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
    // 'JwtString': 'Pinia_Store_token' // 设置统一的请求头
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，比如加入token
    console.log('请求配置:', config);
    let user = JSON.parse(localStorage.getItem('user') || "{}")
    config.headers['token'] = user.token
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    let res = response.data

    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }

    if(res.code == '401'){
      router.push('/home')
    }
    return res;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
