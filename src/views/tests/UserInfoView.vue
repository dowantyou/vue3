<!-- src/views/tests/UserInfoView.vue -->
<template>
    <div class="flex min-h-screen flex-col">
        <header class="bg-blue-200 p-1 flex h-24 w-full">
            <Dropdown />Header
        </header>
        <div class="flex flex-1 flex-row">
            <main class="flex-1 bg-blue-50 p-4">Content</main>
            <nav class="order-first w-60 bg-blue-100 p-4">Navigation</nav>
            <!-- <aside class="w-32 bg-blue-100 p-4">Side</aside> -->
            <div class="absolute left-5 bottom-8 h-40 w-40 rounded bg-blue-500">Fixed in bottom left</div>
            <div class="absolute right-40 bottom-40 h-20 w-20 flexd items-center justify-center">
                <!-- 将SlideOver组件放置在这里 -->
                <SlideOver trigger="button" />
            </div>
        </div>
        <footer class="bg-blue-200 p-4 h-24">
            <Footer />
        </footer>
    </div>

</template>

<script setup>
import Dropdown from '@/components/home/Dropdown.vue';
import Footer from '@/components/home/Footer.vue';
import SlideOver from '@/components/home/SlideOver.vue';
</script>
<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>