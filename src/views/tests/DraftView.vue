<!-- src/views/tests/DraftView.vue -->
<template>
    <div class="flex min-h-screen flex-col">
        <header class="bg-blue-200 p-1 flex h-24 w-full">
            <Dropdown />Header
        </header>
        <div class="flex flex-1 flex-row">
            <nav class="order-first w-60 bg-blue-100">Navigation</nav>
            <main class="flex-1 bg-blue-50">
                <Main />
                <!-- <TestButton /> -->
            </main>

            <aside class="w-32 bg-blue-100 p-4">Side-搜索记录</aside>
            <div class="absolute left-5 bottom-8 h-40 w-40 rounded">
                <LogoGroup />
            </div>
            <div class="absolute right-40 bottom-40 h-20 w-20 flexd items-center justify-center">
                <SlideOver trigger="button" />
            </div>
        </div>

        <footer class="bg-blue-200 h-10">
            <FooterBox />
        </footer>
    </div>
</template>

<script setup>
import Dropdown from '@/components/home/Dropdown.vue';
import Footer from '@/components/home/Footer.vue';
import SlideOver from '@/components/home/chatgpt/SlideOver.vue';
import LogoGroup from '@/components/home/LogoGroup.vue';
import Main from '@/components/home/Main.vue';
import FullCard from '@/components/home/card/FullCard.vue';
import FooterBox from '@/components/home/Footerbox/FooterBox.vue';
</script>
<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>