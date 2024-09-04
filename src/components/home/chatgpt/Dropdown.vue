<!-- \src\components\home\chatgpt\Dropdown.vue -->
<template>
  <el-dropdown>
    <h1 class="text-base font-semibold leading-6 text-gray-900 cursor-pointer" id="slide-over-title">
      与Chatgpt聊天🤖
    </h1>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item plain  v-for="model in models">
          <el-radio-group v-model="selectedModel" @change="onSelectModel">
            <el-radio :key="model" :label="model">
              {{ model }}
            </el-radio>
          </el-radio-group>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/store/modules/chatStore.js'

// 当前选中的模型
const selectedModel = ref('gpt-3.5-turbo');
const models = ['gpt-3.5-turbo','gpt-4o-mini', 'gpt-4o-2024-08-06', 'gpt-4-turbo-2024-04-09', 'claude-3-5-sonnet-20240620']
const chatModel = useChatStore()
// 选择模型
const onSelectModel = async (model) => {
  chatModel.changeModel(model)
  console.log(model)
}

// 监听 selectedModel 的变化并更新 store
watch(selectedModel, (newModel) => {
  chatModel.changeModel(newModel)
})

</script>
<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
