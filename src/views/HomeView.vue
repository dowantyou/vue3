<!-- src/views/HomeView.vue -->
<template>
  <div class="flex min-h-screen flex-col">
    <header class=" p-1 flex h-24 w-full">
      <Dropdown />
      <!-- Header -->
    </header>
    <div class="flex flex-1 flex-row">
      <main class="flex-1 ">
        <div class="Content">
          <Main />
          <FullCard />
        </div>
      </main>
      <!-- <nav class="order-first w-60 ">Navigation</nav>
      <aside class="w-32 p-4">Side-搜索记录</aside> -->
      <div class="absolute left-5 bottom-8 h-40 w-40 rounded">
        <LogoGroup />
      </div>
      <div class="absolute right-40 bottom-40 h-20 w-20 flexd items-center justify-center">
        <SlideOver trigger="button" />
      </div>
    </div>
    <footer class="h-10">
      <!-- <Footer /> -->
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

.Content {
  position: relative;

}
</style>