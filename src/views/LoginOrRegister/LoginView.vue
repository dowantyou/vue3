<!-- src/views/LoginOrRegister/LoginView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient p-4 relative" @touchstart="handleTouchStart"
    @touchmove="handleTouchMove" @touchend="handleTouchEnd">

    <!-- 移动端时显示的可下拉白色区域，初始高度为0，最大高度为20px -->
    <div v-if="isMobile" class="absolute top-0 left-0 right-0 z-index-10" ref="pullDownDiv"
      :style="{ height: pullDownHeight + 'px', backgroundColor: 'white', transition: 'height 0.2s' }">
      <div class="w-full h-full flex items-center justify-center">
        <!-- <p class="text-center">向下滚动以触发刷新...</p> -->
      </div>
    </div>

    <div class="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row w-full max-w-4xl">
      <div id="logo" class="flex-1 flex flex-col items-center justify-center p-4">
        <img src="@/assets/images/Transparent_lw_web.png" alt="Logo" class="w-250px h-250px mb-4 pointer-events-none">
        <!-- 下面这里做广告语或者宣传语 -->
        <!-- <h1 class="text-2xl font-bold text-green-700">PROGRESSIVE TUTORIAL</h1>
        <p class="text-zinc-500">Dare to define, dare to RE-define</p> -->

      </div>
      <LoginForm />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginForm from '@/components/login/LoginForm.vue';
import Footer from '@/components/home/Footer.vue';
import { onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(window.innerWidth <= 768);
const pullDownHeight = ref(0);
const startY = ref(0);

const pullDownDiv = ref(null);

function handleTouchStart(event) {
  if (isMobile.value) {
    startY.value = event.touches[0].clientY;
  }
}

function handleTouchMove(event) {
  if (!isMobile.value) return;
  event.preventDefault();
  const deltaY = event.touches[0].clientY - startY.value;
  pullDownHeight.value = Math.min(deltaY, 20);
  if (pullDownHeight.value >= 20) {
    window.location.reload();
  }
}

function handleTouchEnd() {
  if (isMobile.value) {
    pullDownHeight.value = 0;
    startY.value = 0;
  }
}

function handleResize() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  handleResize(); // 组件挂载时调用一次以确定初始值
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<style lang="scss" scoped>
@import '@/assets/css/login/login-common.scss';
</style>
