<template>
<!-- Ai聊天室 -->
<div class="h-4/5 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" ref="listEl">
  <!-- 聊天记录 -->
  <div class="space-y-4" >
    <!-- 动态渲染聊天记录 -->
    <div v-for="(message, index) in msgList" :key="index">
      <!-- AI -->
      <div  v-if="message.role === 'system'" class="flex items-start">
        <img src="@/assets/images/icon/search-chat.svg" class="h-8 w-8 rounded-full" alt="Avatar" />
        <div class="ml-3 bg-gray-100 p-2 rounded-lg " >
          <span v-html="markdome(message.content)"></span>
        </div>
      </div>

      <!-- 用户 -->
      <div  v-if="message.role === 'user'" class="flex flex-row-reverse">
        <img src="@/assets/images/icon/user.svg" class="h-8 w-8 rounded-full" alt="Avatar" />
        <div class="ml-3 bg-gray-100 p-2 rounded-lg " >
          <span> {{ message.content }}</span>
        </div>
      </div>
    </div>

    <!-- 显示的流式 -->
    <div  v-if="streaming" class="flex items-start">
        <img src="@/assets/images/icon/search-chat.svg" class="h-8 w-8 rounded-full" alt="Avatar" />
        <div class="ml-3 bg-gray-100 p-2 rounded-lg" >
          <span v-html="markdome(streamingText)"></span>
        </div>
      </div>
  </div>
</div>

<!-- 输入框 -->
<div class="h-1/5 flex items-center px-4 bg-gray-50">
  <input v-model="inputValue" @keydown.enter="sendMessage" type="text" placeholder="Type your message..." class="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />

  <!-- 发送按钮  -->
  <button @click="sendMessage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Send</button>
</div>
</template>



<script setup>
import { ref, watch, nextTick } from 'vue';
import { useGpt } from '@/hooks/index.js';
// 渲染markdown，代码高亮
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'   
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import { useScroll } from '@vueuse/core'   //注册vue-core

const listEl = ref()
const { y } = useScroll(listEl)
const { streamingText, streaming, msgList, stream } = useGpt(true);
const inputValue = ref('');

function markdome(content) {
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<div class="hl-code"><div class="hl-code-header"><span>${lang}</span></div><div class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></div></div>`
      } catch (__) {
        console.log(__, 'error')
      }
    }
    return `<div class="hl-code"><div class="hl-code-header"><span>${lang}</span></div><div class="hljs"><code>${md.utils.escapeHtml(
      str
    )}</code></div></div>`
  }
})
// 渲染Markdown文本
  return md.render(content)
}

// 发送消息
const sendMessage = async () => { 
  if (inputValue.value.trim() !== '') { 
    const prompt = inputValue.value;
    inputValue.value = '';
    await stream(prompt);
    nextTick(() => {
      scrollToBottom();
    });
  }     
};

// 滚动效果
const scrollToBottom = () => {
  nextTick(() => {
    y.value = listEl.value?.scrollHeight || 0
  })
}
watch([streamingText, msgList], () => {
  scrollToBottom();
});

</script>

<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

