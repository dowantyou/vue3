// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import request from '@/utils/request'
import router from '@/router';
import '@/assets/css/main.css';

// 将 request 设置为全局属性
const app = createApp(App);
app.config.globalProperties.$request = request;

// 设置全局属性 $baseUrl 指向环境变量 VITE_APP_BASE_URL
app.config.globalProperties.$baseUrl = import.meta.env.VITE_APP_SERVICE_API;

// pinia
import { createPinia } from 'pinia';
const pinia = createPinia();
// 持久化存储
import { createPersistedState } from 'pinia-plugin-persistedstate';
pinia.use(
  createPersistedState({
    auto: true, // 启用所有 Store 默认持久化
  }),
);
// 重写 $reset 方法 => 解决组合式api中无法使用问题
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));
  store.$reset = () => {
    store.$patch(initialState);
  };
});
app.use(pinia);

// store
import store from '@/store';
app.config.globalProperties.$store = store;

// 配置全局api
import api from '@/api';
app.config.globalProperties.$api = api;

// 使用 router 插件
app.use(router);

// 挂载应用到 DOM 中
app.mount('#app');

// 引入并注册 Element Plus 组件库和样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus);

