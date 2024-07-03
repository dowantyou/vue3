<!-- src/components/home/Header.vue -->
<template>
  <div class="flex h-24 w-full mb-7 ">
    <Dropdown />
  </div>
</template>

<script setup>
import Dropdown from '@/components/home/Dropdown.vue';
</script>
<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>