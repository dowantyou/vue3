<template>
  <div class="h-4/5 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" ref="listEl">
    <div class="my-drawer">
      <el-drawer v-model="drawer" title="I am the title" :with-header="false" :before-close="handleClose" size="50%">
        <template #default>
          <History />
        </template>
      </el-drawer>
    </div>

    <div class="space-y-4">
      <div v-for="(message, index) in msgList" :key="index">
        <div v-if="message.role === 'system'" class="flex items-start">
          <img src="@/assets/images/icon/search-chat.svg" class="h-8 w-8 rounded-full" alt="Avatar" />
          <div class="ml-3 bg-gray-100 px-3 py-2 rounded-lg">
            <span v-html="markdome(message.content)"></span>
          </div>
        </div>
        <div v-if="message.role === 'user'" class="flex flex-row-reverse">
          <img src="@/assets/images/icon/user.svg" class="h-8 w-8 rounded-full" alt="Avatar" />
          <div class="ml-3 bg-gray-100 px-3 py-2 rounded-lg">
            <span> {{ message.content }}</span>
          </div>
        </div>
      </div>

      <div v-if="streaming" class="flex items-start">
        <img src="@/assets/images/icon/search-chat.svg" class="h-8 w-8 rounded-full" alt="Avatar" />
        <div class="ml-3 bg-gray-100 px-3 py-2 rounded-lg">
          <span v-html="markdome(streamingText)"></span>
        </div>
      </div>
    </div>
  </div>

  <div class="h-1/5 flex items-center px-4 bg-gray-50">
    <input
      v-model="inputValue"
      @keydown.enter="sendMessage"
      type="text"
      placeholder="Type your message..."
      class="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
    <button @click="sendMessage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Send</button>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useGpt } from '@/hooks/index.js';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { useScroll } from '@vueuse/core';
import History from './History.vue';
import { useChatStore } from '@/store/modules/chatStore.js';

const listEl = ref();
const { y } = useScroll(listEl);
const { streamingText, streaming, msgList, stream } = useGpt(true);
const inputValue = ref('');
const drawer = ref(false);
const chatStore = useChatStore();

// el-drawer的控制
const handleOpen = () => {
  drawer.value = true;
};

const handleClose = () => {
  drawer.value = false;
};

defineExpose({
  handleOpen,
  handleClose,
});

function markdome(content) {
  const mdi = new MarkdownIt({
    html: false,
    linkify: true,
    highlight(code, language) {
      const validLang = !!(language && hljs.getLanguage(language));
      if (validLang) {
        const lang = language ?? '';
        return highlightBlock(hljs.highlight(code, { language: lang }).value, lang);
      }
      return highlightBlock(hljs.highlightAuto(code).value, '');
    },
  });

  mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } });
  mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: '#cc0000' });

  return mdi.render(content);
}

function highlightBlock(str, lang) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">Copy</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}

// 发送消息
const sendMessage = async () => {
  if (inputValue.value.trim() !== '') {
    const prompt = inputValue.value;
    inputValue.value = '';
    await stream(prompt, chatStore.currentModel);

    nextTick(() => {
      scrollToBottom();
    });
  }
};

// 滚动效果
const scrollToBottom = () => {
  nextTick(() => {
    y.value = listEl.value?.scrollHeight || 0;
  });
};

watch([streamingText, msgList], () => {
  scrollToBottom();
});
</script>
<style lang="scss" scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
