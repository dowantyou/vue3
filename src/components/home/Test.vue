<template>
    <div class="search-container">
        <!-- Search Box -->
        <div class="search-box">
            <input type="text" v-model="query" class="search-input" placeholder="Search..." />
            <button @click="search" class="search-button">搜索🔍</button>
            <!-- Dropdown for selecting options is not shown in the provided UI, so it's omitted -->
        </div>
        <!-- Tab Navigation -->
        <div class="tab-navigation">
            <button v-for="(tab, index) in tabs" :key="index"
                :class="{ 'tab-button active': selectedTab === index, 'tab-button': selectedTab !== index }"
                @click="selectTab(index)">
                {{ tab }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const tabs = ref(['外刊', '词典', '语法', '聊天', '资源']);
const selectedTab = ref(0); // Default selected tab
const query = ref('');

const selectTab = (index) => {
    selectedTab.value = index;
};

const search = () => {
    console.log('Search query:', query.value, 'Selected tab:', tabs.value[selectedTab.value]);
};
</script>

<style scoped>
.search-container {
    max-width: 600px;
    margin: 10px auto;
    padding: 20px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
}

.search-input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.search-button {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-button:hover {
    background: #0056b3;
}

.tab-navigation {
    display: flex;
    justify-content: center;
}

.tab-button {
    padding: 8px 20px;
    margin: 0 10px;
    border-radius: 4px;
    border: 1px solid transparent;
    background: #e9ecef;
    color: #343a40;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.tab-button:hover,
.tab-button.active {
    border-color: #007bff;
    background: #007bff;
    color: white;
}
</style>
<style lang="css" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>