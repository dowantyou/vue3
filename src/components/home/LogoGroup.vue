<!-- src/components/home/LogoGroup.vue -->
<template>
    <div class="relative flex flex-col w-full h-full rounded-lg cursor-pointer">
        <!-- Logo 1 -->
        <div class="logo-container flex items-center mb-1 h-20 pl-4" @mouseenter="isExpanded1 = true"
            @mouseleave="isExpanded1 = false">
            <img class="w-2/5 mr-2 pointer-events-none" :src="imageUrl1" alt="Logo1" />
            <div class="text-description absolute top-0 left-20" v-if="isExpanded1">
                <h4 class="font-bold mt-4">灵问词典</h4>
                Light-Word Dictionary
            </div>
        </div>

        <!-- Logo 2 -->
        <div class="logo-container flex items-center h-20" @mouseenter="isExpanded2 = true"
            @mouseleave="isExpanded2 = false">
            <img class="w-1/2 mr-2 pointer-events-none" :src="imageUrl2" alt="Logo2" />
            <div class="text-description absolute top-full left-20" v-if="isExpanded2" style="width: 100%;">
                <h4 class="font-bold mt-4">先进教程：英语完备基础</h4>
                Progressive Tutorial: The Baseline of English
            </div>
        </div>
    </div>
</template>

<script setup>
const isExpanded1 = ref(false);
const isExpanded2 = ref(false);
import { ref } from 'vue'
import imageUrl1 from '@/assets/images/LW.png'; // 图片1的路径
import imageUrl2 from '@/assets/images/Transparent_lw_web.png'; // 图片2的路径

</script>

<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 添加基础样式 */
.logo-container {
    position: relative;
}

/* 更新 .text-description 的样式 */
.text-description {
    position: absolute;
    padding: 0.5rem;
    z-index: 10;
    /* width: auto; */
    top: 0;
    white-space: nowrap;
    text-align: left;
    pointer-events: none;
    font-size: x-small;
}

/* Logo 2 的文字描述需要在底部 */
.text-description.top-full {
    top: 100%;
    margin-top: -5rem;
}
</style>
