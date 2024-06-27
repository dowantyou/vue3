// src/store/modules/userStore.js
import { defineStore } from 'pinia';
import { localStorage } from '@/utils/storage.js';
import { getJWTByPassword }
   from '@/api/user_action.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null, // 用户认证令牌
  }),
  
  actions: {
    // 登录并保存令牌
    async login(usernameOrPhoneOrEmail, password) {
      try {
        const response = await getJWTByPassword(usernameOrPhoneOrEmail, password);
        if (response.status === 'success') {
          this.token = response.jwtString;
          localStorage.set('token', this.token);
          // javascript:console.log(localStorage.getItem('token')) // 控制台上查看已存储的 token
          // 执行其他登录后的操作...
        } else {
          console.error('登录失败:', response.msg);
        }
      } catch (error) {
        console.error('登录请求失败:', error);
        // 处理请求失败的情况
      }
    },

    // 登出并清除令牌
    logout() {
      this.token = null;
      localStorage.remove('token');
      // 待补充：执行其他登出操作...
    },

    // 其他接口

    
  }
});
