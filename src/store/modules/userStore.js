// src/store/modules/userStore.js
import { defineStore } from 'pinia';
import { localStorage } from '@/utils/storage.js';
import { getJWTByPassword } from '@/api/user_action.js';
import { getUserProfile, getUserInfo } from '@/api/user_action.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null, // 用户认证令牌
    isLoggedIn: false, // 用户是否已登录
    avatar: null,
    username: null,
    phone: null,
    email: null,
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
          this.isLoggedIn = true;
          // await this.updateUserInfo();
          // await this.fetchUserAvatar();
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
      this.isLoggedIn = false;
      // 待补充：执行其他登出操作...
    },

    // 获取用户头像
    async fetchUserAvatar() {
      try {
        const response = await getUserProfile();
        if (response.status === 'success') {
          this.avatar = `data:image/${response.file_type};base64,${response.file_base64_string}`;
        } else {
          console.error('获取头像失败:', response.msg);
        }
      } catch (error) {
        console.error('获取头像请求失败:', error);
      }
    },
    // 获取用户信息
    async updateUserInfo() {
      try {
        const response = await getUserInfo();
        if (response.status === 'success') {
          this.username = response.username;
          this.email = response.email;
          this.phone = response.phone;
        } else {
          console.error('获取用户信息失败:', response.msg);
        }
      } catch (error) {
        console.error('获取用户信息请求失败:', error);
      }
    },


  } 
});
    
export default useUserStore;
