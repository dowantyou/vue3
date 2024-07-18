<template>
    <div class="search-container mx-auto my-10">
        <!-- Search Box -->
        <div class="search-box flex items-center relative border-2 border-black rounded p-1">
            <input type="text" v-model="query" class="search-input flex-1 p-2" placeholder="Search..." />
            <div class="relative">
                <button @click="toggleDropdown"
                    class="bg-white text-black border-2 border-black py-1 px-2 rounded inline-flex items-center">
                    <span>{{ selectedOption }}</span>
                    <svg class="fill-current h-4 w-4 ml-2" viewBox="0 0 20 20">
                        <path d="M0 0h20v20H0z" fill="none" />
                        <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </button>
                <ul v-if="isDropdownOpen"
                    class="absolute z-10 left-0 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg">
                    <li v-for="option in options[selectedTab]" :key="option" @click="selectOption(option)"
                        class="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-200">{{ option }}</li>
                </ul>
            </div>
            <button @click="search" class="search-button ml-2 p-2 bg-black text-white rounded">
                搜索🔍
            </button>
        </div>
        <!-- Tab Navigation -->
        <div class="tab-navigation flex justify-between mt-2">
            <button v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)"
                :class="['tab-button flex-1 text-center py-2', selectedTab === index ? 'active' : '']">
                {{ tab }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const tabs = ref(['词典', '语法', '资源']);
const options = ref([
    ['英文', '中文'],
    ['分析', '纠错'],
    ['外刊', '真题', '经典']
]);

const selectedTab = ref(0);
const selectedOption = ref(options.value[0][0]);
const query = ref('');
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (option) => {
    selectedOption.value = option;
    isDropdownOpen.value = false;
};

const selectTab = (index) => {
    selectedTab.value = index;
    selectedOption.value = options.value[index][0];
};

const search = () => {
    console.log('Searching for:', query.value, 'in category:', tabs.value[selectedTab.value], 'with option:', selectedOption.value);
};

// Update selected option when tab changes
watch(selectedTab, (newTab) => {
    selectedOption.value = options.value[newTab][0];
});
</script>

<style scoped>
.search-container {
    /* background: #f0f0f0; */
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
    border-width: 10px;
}

.tab-button {
    padding: 10px;
    cursor: pointer;
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