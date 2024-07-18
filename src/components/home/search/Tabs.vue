<!-- src/components/home/search/Tabs.vue -->
<template>
    <div class="tabs">
        <div v-for="tab in tabs" :key="tab" :class="['tab', { active: tab === selectedTab.value }]"
            @click="selectTab(tab)">
            {{ tab }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    }
});

const selectedTab = ref(props.tabs[0]);

const selectTab = (tab) => {
    selectedTab.value = tab;
    emit('tab-selected', tab);
};

const emit = defineEmits(['tab-selected']);
</script>

<style scoped>
.tabs {
    display: flex;
    justify-content: center;
    /* margin-top: -10px; */
}

.tab {
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 5px;
}

.tab.active {
    background-color: #ccc;
}
</style>