// src/store/modules/userStore.js
import { defineStore } from 'pinia';
import { localStorage } from '@/utils/storage.js';
import { getJWTByPassword, getJWTByPhoneCode,getPhoneCode, getEmailCode, 
  registerByPhone, registerByEmail, modifyPassword }
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
    // 通过手机短信验证码登录并获取 JWT
    async loginByPhoneCode(phone, code) {
      try {
        const response = await getJWTByPhoneCode(phone, code);
        if (response.status === 'success') {
          this.token = response.jwtString;
          localStorage.set('token', this.token);
          console.log('登录成功，JWT 已保存。');
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

    // 发送手机验证码
    async sendPhoneCode(phone) {
      try {
        const response = await getPhoneCode(phone);
        if (response.status === 'success') {
          // 处理发送成功逻辑
          console.log('手机验证码发送成功');
        } else {
          // 处理发送失败逻辑
          console.error('发送手机验证码失败');
        }
      } catch (error) {
        console.error('发送手机验证码请求失败:', error);
      }
    },

    // 发送邮箱验证码
    async sendEmailCode(email) {
      try {
        const response = await getEmailCode(email);
        if (response.status === 'success') {
          // 处理发送成功逻辑
          console.log('邮箱验证码发送成功');
        } else {
          // 处理发送失败逻辑
          console.error('发送邮箱验证码失败');
        }
      } catch (error) {
        console.error('发送邮箱验证码请求失败:', error);
      }
    },

    // 通过手机号注册
    async registerByPhone(username, password, phone, code) {
      try {
        const response = await registerByPhone(username, password, phone, code);
        if (response.status === 'success') {
          // 注册成功的逻辑
          console.log('注册成功');
          // 可以在这里调用 login 方法自动登录用户
          this.login(username, password);
        } else {
          // 处理注册失败的逻辑
          console.error('注册失败:', response.msg);
        }
      } catch (error) {
        console.error('注册请求失败:', error);
        // 处理请求失败的情况
      }
    },

    // 通过邮箱注册
    async registerByEmail(username, password, email, code) {
      try {
        const response = await registerByEmail(username, password, email, code);
        if (response.status === 'success') {
          // 注册成功的逻辑
          console.log('注册成功');
          // 可以在这里调用 login 方法自动登录用户
          this.login(username, password);
        } else {
          // 处理注册失败的逻辑
          console.log('response:', response);
          console.error('注册失败:', response.msg);
        }
      } catch (error) {
        console.error('注册请求失败:', error);
        // 处理请求失败的情况
      }
    },

    // 修改密码
    async modifyPasswordAction(new_password, phone_or_email, key, code) {
      try {
        const response = await modifyPassword({
          new_password,
          phone_or_email,
          key,
          code,
        });
        if (response.status === 'success') {
          this.token = response.new_jwt; // 更新 token
          localStorage.set('token', this.token); // 更新本地存储
          console.log('密码修改成功，新 token 已保存。');
          // 可能需要跳转到登录页面或其他页面
        } else {
          console.error('密码修改失败:', response.msg);
        }
      } catch (error) {
        console.error('密码修改请求失败:', error);
        // 处理错误，如提示用户等
      }
    },
    // 其他接口

    
  }
});
