<!-- src/components/login/ModalForgetPW.vue -->
<template><!-- 模态弹窗-忘记密码 -->
    <div class="fixed inset-0 flex items-center justify-center w-full" v-if="showModal">
        <div class="bg-black bg-opacity-50 absolute inset-0 z-0" @click="closeForgetPWModal"></div>
        <div class="relative z-10 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <form @submit.prevent="onSubmit" class="space-y-4 mt-3 mb-1">
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-green-500">忘记密码</h3>
                </div>
                <!-- 手机号或邮箱输入 -->
                <div class="relative">
                    <img src="@/assets/images/icon/user.svg" class="absolute left-3 top-3 h-6 w-6" alt="User Icon">
                    <input type="text" placeholder="请输入手机号或邮箱" class="InputText" v-model="identifier"
                        autocomplete="username">
                </div>

                <!-- 验证码输入 -->
                <div class="flex items-center space-x-4">
                    <div class="relative w-2/5">
                        <img src="@/assets/images/icon/CAPTCHA.svg"
                            class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" alt="CAPTCHA Icon">
                        <input type="validate" placeholder="验证码" class="InputText pl-16" v-model="captcha">
                    </div>
                    <button type="button" class="CAPTCHA" @click="onShow" :disabled="countdown > 0">
                        {{ countdown > 0 ? `${countdown}s后可重发` : '获取验证码' }}
                    </button>
                </div>

                <!-- 新密码输入 -->
                <div class="relative">
                    <input type="password" placeholder="新密码（长度8~32，仅支持：a-z，A-Z，0-9，_）" class="InputText"
                        v-model="newPassword" autocomplete="new-password">
                    <img src="@/assets/images/icon/lock.svg" class="absolute left-3 top-3 h-6 w-6" alt="Lock Icon">
                </div>

                <!-- 重复密码输入 -->
                <div class="relative">
                    <input type="password" placeholder="请重复新密码，牢记此密码噢！" class="InputText" v-model="confirmNewPassword"
                        autocomplete="new-password">
                    <img src="@/assets/images/icon/relock.svg" class="absolute left-3 top-3 h-6 w-6" alt="Re-Lock Icon">
                </div>
                <!-- 错误信息提示 -->
                <div class="text-center mb-3"
                    :class="{ 'text-red-500': errorMessage, 'text-green-500': !errorMessage }">
                    {{ errorMessage || '我们正在找回您的账号！' }}
                </div>
                <!-- 提交按钮 -->
                <div class="mt-3 flex justify-center space-x-4">
                    <button ref="modifyPWButton"
                        class="p-3 bg-red-500 text-white rounded-full border-3 py-2 px-4 w-32 h-14 FontBold"
                        id="modifyPW" @click="submitForgetPW">修改密码</button>
                    <button class="p-3 bg-gray-500 text-white rounded-full border-3 mx-auto w-32 h-14 FontBold"
                        @click="closeForgetPWModal">取消</button>
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
const newPassword = ref('');
const confirmNewPassword = ref('');
const errorMessage = ref('');
const countdown = ref(0);
const timer = ref(null);
const modifyPWButtonRef = ref(null);
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
onMounted(() => {
    modifyPWButtonRef.value = document.querySelector('#modifyPW');
});
// 关闭模态窗口
const closeForgetPWModal = () => {
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
// 发送验证码
const onSuccess = async () => {
    console.log('这里显示验证码是否发送成功↓');
    if (identifier.value) {
        try {

            if (identifier.value.includes('@')) {
                await userStore.sendEmailCode(identifier.value);
                errorMessage.value = '邮箱验证码已发送，请注意查收';
                onClose(); startCountdown();
            } else {
                await userStore.sendPhoneCode(identifier.value);
                errorMessage.value = '手机验证码已发送，请注意查收';
                onClose(); startCountdown();
            }

        } catch (error) {
            console.error('发送验证码请求失败:', error);
            errorMessage.value = '发送验证码请求失败';
            onClose();
        }
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
// 提交忘记密码表单
const submitForgetPW = async () => {
    if (validateForm()) {
        try {
            const key = identifier.value.includes('@') ? 'email' : 'phone';
            await userStore.modifyPasswordAction(newPassword.value, identifier.value, key, captcha.value);
            if (userStore.token) {
                localStorage.setItem('jwtString', userStore.token);
                errorMessage.value = '修改密码成功，请重新登录';
                ChangeModifyPWButton();
                return;
            } else {
                errorMessage.value = '修改密码失败，请稍后再试';
            }
        } catch (error) {
            console.error('修改密码请求失败:', error);
            errorMessage.value = '网络错误，请稍后重试';
        }
    }
};
// 设置登录按钮的样式和事件处理器
const ChangeModifyPWButton = () => {
    if (modifyPWButtonRef.value) {
        modifyPWButtonRef.value.classList.remove('bg-red-500');
        modifyPWButtonRef.value.classList.add('bg-green-500');
        modifyPWButtonRef.value.textContent = '立即登录';
        modifyPWButtonRef.value.onclick = () => closeForgetPWModal();
    }
};
// 验证表单
const validateForm = () => {
    // 重置错误信息
    errorMessage.value = '';
    let isFormValid = true;

    // 验证标识符（手机号或邮箱）
    if (!identifier.value) {
        errorMessage.value = '手机号或邮箱不能为空';
        isFormValid = false;
    } else if (!identifier.value.includes('@') && !/^\d{11}$/.test(identifier.value)) {
        // 如果是手机号，检查是否为11位数字
        errorMessage.value = '请输入有效的手机号';
        isFormValid = false;
    } else if (identifier.value.includes('@') && !/^[^@]+@(qq|126|163)\.com$/.test(identifier.value)) {
        // 如果是邮箱，检查邮箱格式
        errorMessage.value = '请输入有效的邮箱地址';
        isFormValid = false;
    }

    // 验证码验证
    if (!captcha.value) {
        errorMessage.value = '验证码不能为空';
        isFormValid = false;
    }

    // 新密码验证
    if (!newPassword.value) {
        errorMessage.value = '新密码不能为空';
        isFormValid = false;
    } else if (!/^[a-zA-Z0-9_]{8,32}$/.test(newPassword.value)) {
        // 检查密码复杂度
        errorMessage.value = '密码长度8~32，仅支持：a-z，A-Z，0-9，_';
        isFormValid = false;
    }

    // 确认密码验证
    if (!confirmNewPassword.value) {
        errorMessage.value = '请重复新密码';
        isFormValid = false;
    } else if (newPassword.value !== confirmNewPassword.value) {
        errorMessage.value = '两次输入的密码不一致';
        isFormValid = false;
    }

    return isFormValid;
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