<!-- src/components/home/search/Dropdown.vue -->
<template>
    <div class="dropdown">
        <select v-model="selectedOption">
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    options: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['update:selected']);

const selectedOption = ref(props.options[0]);

watch(selectedOption, (newVal) => {
    emit('update:selected', newVal);
});
</script>

<style scoped>
.dropdown {
    margin-left: 10px;
}

select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>