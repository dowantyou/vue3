<template>
  <!-- Ai聊天室 -->
  <div class="h-4/5 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
    <!-- 聊天记录 -->
  <div class="space-y-4">
    <!-- 动态渲染聊天记录 -->
  <template v-for="message in messages" :key="message.id">
     <!-- 机器人版 -->
    <div class="flex items-end">
      <img src="@/assets/images/icon/search-chat.svg" class="h-8 w-8 rounded-full" alt="Avatar" />
      <div class="ml-3 bg-gray-100 p-2 rounded-lg">
        <span>你好</span>
      </div>
    </div>
  
    <!-- 用户版 -->
    <div class="flex flex-row-reverse">
      <img src="@/assets/images/icon/user.svg" class="h-8 w-8 rounded-full" alt="Avatar" />
      <div class="ml-3 bg-gray-100 p-2 rounded-lg">
        <span>{{ userMessage }}</span>
      </div>
    </div>
  </template>
  </div>
  </div>
  
  <!-- 输入框 -->
  <div class="h-1/5 flex items-center px-4 bg-gray-50">
    <input v-model="userMessage" type="text" placeholder="Type your message..." class="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
    
    <!-- 发送按钮  -->
    <button @click="sendMessage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Send</button>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  </script>
  
  <style lang="css" scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  </style>
  