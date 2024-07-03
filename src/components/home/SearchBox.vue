<template>
    <div class="search-container mx-auto my-10">
        <!-- Search Box -->
        <div class="search-box flex items-center relative border-2 ml-5 mr-5 mt-3 border-black rounded p-1">
            <input type="text" v-model="query" class="search-input flex-1 p-2" placeholder="Search..." />
            <select v-model="selectedOption" class="search-select ml-2 p-2 border-2 border-black rounded">
                <option v-for="option in options[selectedTab]" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            <button @click="search" class="search-button ml-2 p-2 bg-black text-white rounded">
                搜索🔍
            </button>
        </div>
        <!-- Tab Navigation -->
        <div class="tab-navigation flex justify-between mt-2 ml-10 mx-5   w-1/2">
            <button v-for="(tab, index) in tabs" :key="index" @click="selectedTab = index"
                :class="['tab-button flex-1 text-center py-2 ', selectedTab === index ? 'active' : '']">
                {{ tab }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const tabs = ref(['词典', '语法', '聊天', '资源']);
const options = ref([
    ['英文', '中文'],
    ['分析', '纠错'],
    ['ChatGPT-3.5', 'ChatGPT-4'],
    ['外刊', '真题', '经典']
]);

const selectedTab = ref(0);
const selectedOption = ref(options.value[0][0]);
const query = ref('');

const search = () => {
    console.log('Searching for:', query.value, 'in category:', tabs.value[selectedTab.value], 'with option:', selectedOption.value);
};
</script>

<style scoped>
.search-container {
    background: #f0f0f0;
    max-width: 800px;
    border: 2px solid #000;
    padding: 10px;
    border-radius: 10px;
}

.search-box {
    border: 1px solid #000;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: white;
}

.search-input {
    flex: 1;
    padding: 10px;
    border: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.search-select {
    border: 1px solid #000;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
}

.search-button {
    background-color: #000;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.tab-navigation {
    background: #fff;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    /* border-left: 2px solid #000;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    border-radius: 0 0 10px 10px; */
    border-width: 10px;
}

.tab-button {
    padding: 10px;
    cursor: pointer;
    /* border: 1px solid transparent; */
    border-bottom: none;
    background-color: transparent;
    transition: all 0.3s ease;
    position: relative;
    top: 1px;

}

.tab-button.active {
    background-color: #f0f0f0;
    font-weight: bold;
    border: 1px solid #000;
    border-top: none;
    border-radius: 0 0 10px 10px;
    top: -1px;
}
</style>

<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
