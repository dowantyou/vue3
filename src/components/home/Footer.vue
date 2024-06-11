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
