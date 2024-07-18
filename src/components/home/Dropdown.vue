<!-- src/components/home/Dropdown.vue -->
<template>
    <div class="absolute z-[98] right-5 mt-5 justify-center">
        <div class="relative inline-block" @keydown.esc="close" @focusin="closeIfOutside">
            <!-- Button -->
            <button ref="button" :aria-expanded="isOpen" type="button" class="relative" @mouseenter="handleMouseEnter"
                v-show="!isOpen" @click="goToProfileOrLogin">
                <div class="h-10 w-10">
                    <img :src="avatarSrc" alt="avatar"
                        class="h-full w-full rounded-full object-cover object-center ring ring-white" />
                </div>
            </button>

            <!-- Panel -->
            <div ref="panel"
                class="fixed right-2 z-[98] -mt-7 w-60 divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white text-left text-sm shadow-lg"
                v-show="isOpen" @mouseleave="handleMouseLeave">
                <!-- Panel Content -->
                <div class="py-3 px-4" v-if="userStore.isLoggedIn">
                    <!-- 登录后显示的内容 -->
                    <div class="flex items-center gap-3">
                        <div class="relative h-10 w-10">
                            <img class="h-full w-full rounded-full object-cover object-center ring ring-white pointer-events-none"
                                :src="avatarSrc" alt="avatar" />
                            <span
                                class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                        </div>
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">{{ userStore.username }}</div>
                            <div class="text-gray-400">{{ userStore.email }}</div>
                        </div>
                    </div>
                </div>

                <!-- 公共菜单项 -->
                <div class="p-1">
                    <a href="/user" v-if="userStore.isLoggedIn"
                        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg&#34;" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        个人资料
                        <span class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400">
                            <!-- <kbd class="min-w-[1em] font-sans">⌥</kbd> -->
                        </span>
                    </a>
                    <a href="/login" @click="goToLogin" v-if="!userStore.isLoggedIn"
                        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg&#34;" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        登录/注册
                        <span class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400">
                        </span>
                    </a>
                    <a href="#"
                        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"><svg
                            xmlns="http://www.w3.org/2000/svg&#34;" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        快捷设置
                        <span class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400">

                        </span>
                    </a>
                    <a href="#"
                        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg&#34;" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        下载APP
                    </a>
                </div>
                <div class="p-1">
                    <a href="#"
                        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg&#34;" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                        寻求帮助
                        <span class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400">
                        </span>
                    </a>
                    <a href="#"
                        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg&#34;" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        开发者文档
                    </a>
                    <a href="#"
                        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg&#34;" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                        下载PC客户端
                    </a>
                </div>
                <!-- 退出登录按钮，仅在登录后才显示 -->
                <div class="p-1" v-if="userStore.isLoggedIn" @click="logout">
                    <a href="#"
                        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg&#34;" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        退出账号
                        <span class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400"></span>
                    </a>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import defaultAvatar from '@/assets/images/icon/user.svg'; // 默认头像
const isOpen = ref(false);
const button = ref(null);
const panel = ref(null);
const isHoveredPanel = ref(false); // 用于跟踪鼠标是否在下拉菜单上
import useUserStore from '@/store/modules/userStore.js';
const userStore = useUserStore();
const avatarSrc = ref(userStore.isLoggedIn ? userStore.avatar : defaultAvatar);
// 监听 userStore.isLoggedIn 的变化来更新 src
watch(userStore.isLoggedIn, async (newVal) => {
    if (newVal) {
        await userStore.fetchUserAvatar(); // 用户登录时获取用户头像
        await userStore.updateUserInfo(); // 用户登录时获取用户基本信息
    }
    avatarSrc.value = newVal ? userStore.avatar : defaultAvatar;
});

// 初始化时检查用户是否已经登录
if (userStore.isLoggedIn) {
    userStore.fetchUserAvatar();
    userStore.updateUserInfo();
}

// 根据用户是否登录跳转至登录页面或个人资料
const goToProfileOrLogin = () => {
    if (!userStore.isLoggedIn) {
        goToLogin();
    } else {
        // 这里可以添加跳转到个人资料的逻辑
        console.log('Go to profile');
    }
};

const goToLogin = () => {
    event.preventDefault();    // 阻止默认的链接行为
    const loginUrl = '/login';
    window.open(loginUrl, '_blank');
};
const handleMouseEnter = () => {
    if (!isOpen.value) {
        isOpen.value = true;
    }
};

const handleMouseLeave = (event) => {
    // 检查鼠标是否从按钮移动到了下拉菜单
    if (isOpen.value && panel.value && !panel.value.contains(event.relatedTarget)) {
        isOpen.value = false;
        isHoveredPanel.value = false;
    }
};

const close = () => {
    isOpen.value = false;
    isHoveredPanel.value = false;
};

const closeIfOutside = (event) => {
    if (isOpen.value && (!button.value.contains(event.target) && !panel.value.contains(event.target))) {
        close();
    }
};
// 退出账号
const logout = () => {
    userStore.logout();
    window.location.reload(); // 刷新页面以确保登出状态生效
};
</script>


<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>