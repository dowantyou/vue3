<!-- src\components\home\chatgpt\History.vue -->
<template>
  <div class="container active" v-for="(item, key) in store.recordList" :key="key" @click="selectChat(key)">
    <div class="name">聊天会话</div>
    <div class="count-time">
      <div class="count">{{ item.length }} 条对话</div>
      <div class="time">{{ currentYear }}</div>
    </div>
    <div class="mask"></div>
    <div class="btn-wrapper">
      <button @click.stop="deleteChat(key)">删除会话</button>
    </div>
  </div>
  <button @click="newChat">新建会话</button>
</template>

<script setup>
import { computed } from 'vue';
import { useChatStore } from '@/store/modules/chatStore';

const store = useChatStore();
const currentYear = new Date().getFullYear();

const selectChat = (key) => {
  store.setCurrentKey(key);
};

const newChat = () => {
  const newKey = store.generateKey();
  store.addRecord(newKey, []);
  store.setCurrentKey(newKey);
};

const deleteChat = (key) => {
  store.deleteRecord(key);
  if (store.currentKey === key) {
    store.setCurrentKey(null);
  }
};
</script>

  <style lang="scss" scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .container {
      @apply p-4 bg-white rounded-lg cursor-pointer overflow-hidden relative;

      &.active {
        @apply border border-blue-500 transition duration-100;
      }

      &:hover .mask {
        @apply opacity-100;
      }

      &:hover .btn-wrapper {
        @apply opacity-100;
      }

      .name {
        @apply text-lg font-bold text-gray-800 w-3/4;
      }

      .count-time {
        @apply mt-2 flex justify-between text-xs text-gray-500;
      }

      .btn-wrapper {
        @apply transition-opacity duration-200 opacity-0;
      }
    }
  </style>
