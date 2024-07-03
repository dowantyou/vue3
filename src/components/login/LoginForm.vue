<!-- src/components/login/LoginForm.vue -->
<template>
  <div class="flex-1 p-4">
    <h2 class="text-2xl font-bold text-green-700 mb-6 mt-3 ">账号登录</h2>
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="relative">
        <input type="text" :placeholder="placeholder1"
          class="w-full p-3 pl-10 border-3 border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          :value="usernameOrEmail" @input="event => usernameOrEmail = event.target.value"
          autocomplete="current-password">
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400  pointer-events-none">
          <img src="@/assets/images/icon/user.svg" class="h-5 w-5" alt="User Icon">
        </span>
      </div>
      <div class="relative">
        <input type="password" :placeholder="placeholder2"
          class="w-full p-3 pl-10 border-3 border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          :value="password" @input="event => password = event.target.value" autocomplete="current-password">
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400   pointer-events-none">
          <img src="@/assets/images/icon/lock.svg" class="h-5 w-5" alt="Lock Icon">
        </span>
      </div>
      <button type="submit"
        class="w-full py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition FontBold">登 录</button>
    </form>
    <div class="flex justify-between mt-4">
      <a href="#" class="text-green-700 hover:underline" @click="">注册账号</a>
      <a href="#" class="text-green-700 hover:underline" @click="">忘记密码</a>
    </div>
    <div class="mt-6 space-y-2">
      <!-- 其他第三方登录方式 -->
      <a href="#" class="block text-center text-green-700 hover:underline" @click="">短信验证码登录</a>
      <!-- <a href="#" class="block text-center text-green-700 hover:underline">邮箱验证码登录</a> -->
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/userStore.js';
import { useRouter } from 'vue-router';

const usernameOrEmail = ref('');
const password = ref('');
const placeholder1 = '请输入用户名/手机号/邮箱';
const placeholder2 = '密码';

const router = useRouter();
const userStore = useUserStore();

// 表单提交处理函数
const handleSubmit = async () => {
  try {
    await userStore.login(usernameOrEmail.value, password.value);
    console.log('Token stored successfully:', userStore.token);
    redirectToHome();
  } catch (error) {
    console.error('登录失败:', error);
    // 登录失败的处理逻辑...（待补充：有个弹窗，暂时不写）
  }
};



// 跳转到主页
const redirectToHome = () => {
  router.push('/home');
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<style lang="scss" scoped>
@import '@/assets/css/login/login-common.scss';
</style>
