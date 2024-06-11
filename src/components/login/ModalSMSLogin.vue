<!-- src/components/login/ModalSMSLogin.vue -->
<template><!-- 模态弹窗-手机短信登录 -->
  <div class="fixed inset-0 flex items-center justify-center w-full" v-if="showModal">
    <div class="bg-black bg-opacity-50 absolute inset-0 z-0" @click="closeSMSLoginModal"></div>
    <div class="relative z-10 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <form @submit.prevent="onSubmit" class="space-y-4 mt-3 mb-1">
        <div class="text-center mb-6">
          <h3 class="text-xl font-bold text-green-500">手机短信登录</h3>
        </div>
        <!-- 输入手机号 -->
        <div class="relative">
          <img src="@/assets/images/icon/phone.svg" class="absolute left-3 top-3 h-6 w-6" alt="User Icon">
          <input type="text" placeholder="请输入您的手机号" class="InputText" v-model="identifier" autocomplete="username">
        </div>

        <!-- 输入短信验证码 -->
        <div class="flex items-center space-x-4">
          <div class="relative w-2/5">
            <img src="@/assets/images/icon/CAPTCHA.svg" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
              alt="CAPTCHA Icon">
            <input type="validate" placeholder="验证码" class="InputText pl-16" v-model="captcha">
          </div>
          <button type="button" class="CAPTCHA" @click="onShow" :disabled="countdown > 0">
            {{ countdown > 0 ? `${countdown}s后可重发` : '获取验证码' }}
          </button>
        </div>

        <!-- 信息提示 -->
        <div class="text-center mb-3" :class="{ 'text-red-500': errorMessage, 'text-green-500': !errorMessage }">
          {{ errorMessage || '欢迎使用灵问词典！' }}
        </div>
        <!-- 提交按钮 -->
        <div class="mt-3 flex justify-center space-x-4">
          <button class="p-3 bg-green-500 text-white rounded-full border-3 py-2 px-4 w-32 h-14 FontBold"
            @click="submitSMSLogin">登录</button>
          <button class="p-3 bg-gray-500 text-white rounded-full border-3 mx-auto w-32 h-14 FontBold"
            @click="closeSMSLoginModal">取消</button>
        </div>

      </form>
      <!-- 行为验证组件 -->
      <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Vcode from "vue3-puzzle-vcode";
import { useUserStore } from '@/store/modules/userStore.js';

const isShow = ref(false);
const identifier = ref('');
const captcha = ref('');
const errorMessage = ref('');
const countdown = ref(0);
const timer = ref(null);
const emit = defineEmits(['update:showModal']);
const userStore = useUserStore();
const props = defineProps({
  showModal: Boolean,
});
// 监听 prop `isShow` 的变化
watch(isShow, (newValue) => {
  if (newValue) {
    onShow();
  } else {
    isShow.value = false;// 重置表单状态等
  }
});
// 关闭模态窗口
const closeSMSLoginModal = () => {
  emit('update:showModal', false);
};
// 显示行为验证vcode组件
const onShow = () => {
  isShow.value = true;
  emit('update:isShow', true);
  countdown.value = 0;
  if (timer.value) clearInterval(timer.value);
};
// 关闭行为验证vcode组件
const onClose = () => {
  isShow.value = false;
  emit('close');
};
// 获取手机验证码
const onSuccess = async () => {
  console.log('这里显示验证码是否发送成功↓');
  if (identifier.value) {
    try {
      await userStore.sendPhoneCode(identifier.value);
      errorMessage.value = '验证码已发送，请查收短信';
      onClose(); startCountdown();
    } catch (error) {
      console.error('发送验证码请求失败:', error);
      errorMessage.value = '发送验证码失败，请稍后再试';
    }
  } else {
    errorMessage.value = '请输入手机号';
  }
};

// 开始验证码倒计时
const startCountdown = () => {
  countdown.value = 30;
  timer.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer.value);
      countdown.value = 0;
    }
  }, 1000);
};
// 提交短信登录表单
const submitSMSLogin = async () => {
  if (validateForm()) {
    try {
      let response = await userStore.loginByPhoneCode(identifier.value, captcha.value);
      // closeSMSLoginModal();
      // 检查 response 中的 new_sign_up 字段来判断用户是否首次登录
      if (response.new_sign_up === 'yes') {
        // 用户是首次登录，显示提示弹窗
        showFirstLoginModal();
      } else {
        // 用户已注册过，直接跳转到主页
        redirectToHome();
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      if (error.response && error.response.status === 500) {
        errorMessage.value = '服务器内部错误，请稍后再试或联系管理员。';
      } else {
        errorMessage.value = '登录失败，请检查手机号和验证码是否正确';
      }
    }
  } else {
    errorMessage.value = '手机号和验证码不能为空';
  }
};
// 验证表单
const validateForm = () => {
  // 重置错误信息
  errorMessage.value = '';
  let isFormValid = true;

  // 验证手机号
  if (!identifier.value) {
    errorMessage.value = '手机号不能为空';
    isFormValid = false;
  } else if (!/^\d{11}$/.test(identifier.value)) {
    // 如果是手机号，检查是否为11位数字
    errorMessage.value = '请输入有效的11位手机号';
    isFormValid = false;
  }

  // 验证码验证
  if (!captcha.value) {
    errorMessage.value = '验证码不能为空';
    isFormValid = false;
  }
  return isFormValid;
};
// 显示首次登录的提示弹窗
const showFirstLoginModal = () => {
  confirm('首次登录，默认密码为 12345678 ，请及时修改密码，保护账号安全！', '提示', {
    confirmButtonText: '确定',
    type: 'warning'
  }).then(() => {
    redirectToHome();
  });
};

// 跳转到主页
import { useRouter } from 'vue-router';
const router = useRouter();
const redirectToHome = () => {
  router.push('/home');
};
</script>

<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<style lang="scss" scoped>
@import '@/assets/css/login/login-common.scss';
</style>
