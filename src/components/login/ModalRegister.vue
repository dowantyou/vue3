<!-- src/components/login/ModalRegister.vue -->
<template><!-- 模态弹窗-注册 -->
  <div class="fixed inset-0 flex items-center justify-center w-full" v-if="showModal">
    <div class="bg-black bg-opacity-50 absolute inset-0 z-0" @click="closeRegisterModal"></div>
    <div class="relative z-10 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <form @submit.prevent="onSubmit" class="mt-1">
        <!-- 双选tab -->
        <div class="flex justify-between mb-4">
          <button @click="showPhoneForm" :class="phoneTabClasses" class="text-xl font-bold">手机号注册</button>
          <button @click="showEmailForm" :class="emailTabClasses" class="text-xl font-bold">邮箱注册</button>
        </div>
        <!-- 手机号注册表单 -->
        <div id="phone-form" v-if="isPhoneFormVisible" class="space-y-4 mt-9 mb-4">

          <div class="relative">
            <img src="@/assets/images/icon/user.svg" class="absolute left-3 top-3 h-6 w-6" alt="User Icon">
            <input type="text" placeholder="用户名  （长度4~32，仅支持：a-z，A-Z，0-9，_）" class="InputText pl-16" v-model="username"
              autocomplete="phone-number">
          </div>

          <div class="relative">
            <img src="@/assets/images/icon/phone.svg" class="absolute left-3 top-3 h-5 w-5" alt="Phone Icon">
            <input type="text" placeholder="手机号码  （目前仅支持中国大陆的号码）" class="InputText" v-model="phone"
              autocomplete="username">
          </div>

          <div class="relative">
            <img src="@/assets/images/icon/lock.svg" class="absolute left-3 top-3 h-6 w-6" alt="Lock Icon">
            <input type="password" placeholder="密码  （长度8~32，仅支持：a-z，A-Z，0-9，_）" class="InputText" v-model="password"
              autocomplete="current-password">
          </div>

          <div class="relative">
            <img src="@/assets/images/icon/relock.svg" class="absolute left-3 top-3 h-6 w-6" alt="Re-Lock Icon">
            <input type="password" placeholder="重复密码" class="InputText" v-model="confirmPassword"
              autocomplete="current-password">
          </div>

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
        </div>
        <!-- 邮箱注册表单 -->
        <div id="email-form" v-else class="space-y-4 mt-9 mb-4">
          <div class="relative">
            <img src="@/assets/images/icon/user.svg" class="absolute left-3 top-3 h-6 w-6" alt="User Icon">
            <input type="text" placeholder="用户名  （长度4~32，仅支持：a-z，A-Z，0-9，_）" class="InputText pl-16" v-model="username"
              autocomplete="username">
          </div>

          <div class="relative">
            <img src="@/assets/images/icon/mail.svg" class="absolute left-4 top-4 h-4 w-4" alt="Mail Icon">
            <input type="text" placeholder="邮箱地址  （目前仅支持国内的邮箱）" class="InputText" v-model="email">
          </div>

          <div class="relative">
            <img src="@/assets/images/icon/lock.svg" class="absolute left-3 top-3 h-6 w-6" alt="Lock Icon">
            <input type="password" placeholder="密码  （长度8~32，仅支持：a-z，A-Z，0-9，_）" class="InputText" v-model="password"
              autocomplete="current-password">
          </div>

          <div class="relative">
            <img src="@/assets/images/icon/relock.svg" class="absolute left-3 top-3 h-6 w-6" alt="RE-Lock Icon">
            <input type="password" placeholder="重复密码" class="InputText" v-model="confirmPassword"
              autocomplete="current-password">
          </div>

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
        </div>
        <!-- 文字提示框 -->
        <div class="text-center mb-3" :class="{ 'text-red-500': errorMessage, 'text-green-500': !errorMessage }">
          {{ errorMessage || '欢迎使用灵问词典！' }}
        </div>
        <!-- 注册按钮 -->
        <div class="mt-3 flex justify-center space-x-4">
          <button class="p-3 bg-green-500 text-white rounded-full border-3  py-2 px-4 w-32 h-14 FontBold"
            @click="submitRegistration">注册账号</button>
          <button class="p-3 bg-gray-500 text-white rounded-full border-3 mx-auto w-32 h-14 FontBold"
            @click="closeRegisterModal">取消</button>
        </div>

      </form>
    </div>
    <!-- 行为验证组件 -->
    <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
  </div>
</template>



<script setup>
import { ref, watch } from 'vue';
import Vcode from "vue3-puzzle-vcode";
import { useUserStore } from '@/store/modules/userStore.js';

const isShow = ref(false);
const isPhoneFormVisible = ref(true);
const phone = ref('');
const email = ref('');
const emit = defineEmits(['update:isShow', 'success', 'close']);
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const captcha = ref('');
const errorMessage = ref('');
const userStore = useUserStore();
const countdown = ref(0);
const timer = ref(null);
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
const closeRegisterModal = () => {
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


const onSuccess = async () => {
  console.log('这里显示验证码是否发送成功↓');
  try {
    if (isPhoneFormVisible.value) {
      // 如果当前是手机号注册表单可见，则发送手机号验证码
      await userStore.sendPhoneCode(phone.value);
      onClose();
      if (countdown.value === 0) {
        countdown.value = 30;
        timer.value = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--; // 倒计时递减
          } else {
            clearInterval(timer.value); // 清除定时器
            countdown.value = 0; // 重置倒计时
          }
        }, 1000);
      }
    } else {
      // 如果当前是邮箱注册表单可见，则发送邮箱验证码
      await userStore.sendEmailCode(email.value);
      onClose();
      if (countdown.value === 0) {
        countdown.value = 30;
        timer.value = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--; // 倒计时递减
          } else {
            clearInterval(timer.value); // 清除定时器
            countdown.value = 0; // 重置倒计时
          }
        }, 1000);
      }
    }
    // 验证码发送成功的处理...
  } catch (error) {
    console.error('发送验证码失败:', error);
    // 处理发送验证码失败的情况...
  }
  emit('success');
};

// 重置倒计时（暂时不改动）
const startCountdown = () => {
  if (countdown.value > 0) {
    clearInterval(timer.value);
    countdown.value = 0;
  }
};
// 切换表单视图的方法
const tabClasses = 'w-1/2 text-center py-2 border-b-2';
const activeTabClasses = 'border-green-500 text-green-500 dark:text-green-400';
const formClasses = 'w-full p-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white';// 暂时用不上，先留着

const showPhoneForm = () => {
  isPhoneFormVisible.value = true; // 显示手机号注册表单
  email.value = '';
};

const showEmailForm = () => {
  isPhoneFormVisible.value = false; // 显示邮箱注册表单
  phone.value = '';
};
// 使用 computed 创建计算属性
const phoneTabClasses = computed(() => {
  return isPhoneFormVisible.value ? `${tabClasses} ${activeTabClasses}` : tabClasses;
});

const emailTabClasses = computed(() => {
  return isPhoneFormVisible.value ? tabClasses : `${tabClasses} ${activeTabClasses}`;
});

// 更新错误信息
const updateErrorMessage = (msg) => {
  errorMessage.value = msg;
};

// “注册账号”按钮绑定的提交数据
const submitRegistration = async () => {
  errorMessage.value = '';
  if (validateForm()) {
    try {
      let response;
      if (isPhoneFormVisible.value) {
        response = await userStore.registerByPhone(username.value, password.value, phone.value, captcha.value);
      } else {
        response = await userStore.registerByEmail(username.value, password.value, email.value, captcha.value);
      }

      if (response && response.status === 'success') {
        updateErrorMessage('注册成功');
        console.log('注册成功:', response);
      } else if (response) { // 确保 response 不是 undefined
        // 注册失败的逻辑
        updateErrorMessage(response.msg || '注册失败');
      } else {
        // 处理 response 是 undefined 的情况
        updateErrorMessage('未知错误，请重新尝试');
      }
    } catch (error) {
      console.error('注册请求失败:', error);
      updateErrorMessage('注册请求失败');
    }
  }
};

const validateForm = () => {
  // 重置错误信息
  errorMessage.value = '';

  let isValid = true;
  let phoneRegex = /^\d{11}$/; // 简单的11位数字手机号正则表达式
  let emailRegex = /^[^@]+@(qq|126|163)\.com$/; // 示例邮箱正则表达式，仅支持qq.com, 126.com, 163.com

  // 用户名验证
  if (!username.value.match(/^[a-zA-Z0-9_]{4,32}$/)) {
    isValid = false;
    errorMessage.value = '用户名必须长度4~32，仅支持：a-z，A-Z，0-9，_';
  }

  // 根据当前表单验证手机号码或邮箱
  if (isPhoneFormVisible.value) {
    // 手机号注册
    if (!phone.value) {
      isValid = false;
      errorMessage.value = '手机号码不能为空';
    } else if (!phone.value.match(phoneRegex)) {
      isValid = false;
      errorMessage.value = '手机号码格式不正确';
    }
  } else {
    // 邮箱注册
    if (!email.value) {
      isValid = false;
      errorMessage.value = '邮箱地址不能为空';
    } else if (!email.value.match(emailRegex)) {
      isValid = false;
      errorMessage.value = '邮箱格式不正确';
    }
  }

  // 密码验证
  if (password.value) {
    if (!password.value.match(/^[a-zA-Z0-9_]{8,32}$/)) {
      isValid = false;
      errorMessage.value = '密码格式不正确';
    }
    if (password.value !== confirmPassword.value) {
      isValid = false;
      errorMessage.value = '两次输入的密码不一致';
    }
  } else {
    isValid = false;
    errorMessage.value = '密码不能为空';
  }
  return isValid;
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
