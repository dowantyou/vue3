<template>
    <div class="relative z-50 w-auto h-auto" v-if="trigger === 'button'">
        <button @click="toggleSlideOver(true)"
            class="inline-flex text-base font-bold items-center justify-center  p-4  transition-colors bg-white border rounded-full hover:bg-neutral-100 active:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-200/60 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
            <img class="w-8 h-8 pointer-events-none" src="@/assets/images/icon/search-chat.svg" alt="">
        </button>
        <template v-if="slideOverOpen">
            <div class="relative z-[99]">
                <div @click="toggleSlideOver(false)" class="fixed inset-0 bg-black bg-opacity-10"></div>
                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div class="w-screen max-w-xl"
                                :class="{ 'translate-x-full': !slideOverOpen, 'translate-x-0': slideOverOpen }">
                                <div
                                    class="flex flex-col h-full py-5 overflow-y-scroll bg-white border-l shadow-lg border-neutral-100/70">
                                    <div class="px-4 sm:px-5">
                                        <div class="flex items-start justify-between pb-1">
                                            <h2 class="text-base font-semibold leading-6 text-gray-900"
                                                id="slide-over-title">与ChatGPT聊天🤖</h2>
                                            <button @click="toggleSlideOver(false)"
                                                class="absolute top-0 right-0 z-30 flex items-center justify-center px-3 py-2 mt-4 mr-5 space-x-1 text-xs font-medium uppercase border rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100">
                                                <span class="font-bold text-gray-950 text-base">关闭页面</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="relative flex-1 px-4 mt-5 sm:px-5">
                                        <div class="absolute inset-0 px-4 sm:px-5">
                                            <div
                                                class="relative h-full overflow-hidden border border-dashed rounded-md border-neutral-300">
                                                <!-- Content here -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
    trigger: String
});

const slideOverOpen = ref(false);
function toggleSlideOver(value) {
    // 直接使用 value 参数来更新 slideOverOpen 的状态，如果传入的不是布尔值，我们默认切换状态
    slideOverOpen.value = (typeof value === 'boolean') ? value : !slideOverOpen.value;
}
</script>

<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>