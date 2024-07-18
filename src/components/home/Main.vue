<!-- src/components/home/Main.vue -->
<template>
  <div class="main">
    <div class="search-container">
      <textarea placeholder="Search..." rows="1" ref="textareaRef" @click="animateUI"></textarea>

      <!-- Tabs 组件 -->
      <div class="tabs" :style="tabsStyle" ref="tabsRef">
        <ul class="tab-list">
          <li v-for="tab in tabs" :key="tab" :class="{ 'active': activeTab === tab }" @click="onTabClick(tab)"
            class="relative cursor-pointer py-2 px-4 transition-all duration-300 ease-in-out">
            <div v-if="activeTab === tab" class="pt-line"></div>
            {{ tab }}
          </li>
        </ul>
      </div>

      <!--Dropdown 触发按钮 -->
      <div class="dropdown" ref="dropdownRef">
        <div class="dropdown-button" @click="toggleDropdown">
          <span>{{ selectedOption }}</span>
        </div>
        <!-- 下拉菜单依赖于 dropdownVisible -->
        <ul v-if="dropdownVisible" class="dropdown-content">
          <li v-for="option in getOptionsForTab(activeTab)" :key="option"
            :class="{ 'selected': selectedOption === option }" @click="selectOption(option); toggleDropdown;">
            {{ option }}
          </li>
        </ul>
      </div>

      <button @click="">
        <!-- light it -->
      </button>
    </div>
    <div class="content-wrapper">
      <div class="content" ref="contentRef">
        这里是一段内容
      </div>
      <img ref="logoRef" src="@/assets/images/lw_web.png" alt="Logo" class="logo" v-show="!isFocused" />

    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue';
const activeTab = ref('词典'); // 默认选中词典
const dropdownVisible = ref(false);
const tabs = ['词典', '语法', '资源'];
const selectedOption = ref('');
// 计算属性，根据当前激活的 tab 返回对应的选项
const getOptionsForTab = computed(() => {
  const options = {
    '词典': ['英文', '中文'],
    '语法': ['分析', '纠错'],
    '资源': ['外刊', '真题', '经典']
  };
  return tab => options[tab] || [];
});
// 更新 selectedOption 为当前 tab 的首个选项
watch(activeTab, (newTab) => {
  selectedOption.value = getOptionsForTab.value(newTab)[0];
});
function onTabClick(tab) {
  activeTab.value = tab;
  selectedOption.value = getOptionsForTab.value(tab)[0]; // 设置 selectedOption 为首个选项
  dropdownVisible.value = false; // 点击 tab 时关闭下拉菜单
}
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};
const selectOption = (option) => {
  selectedOption.value = option; // 更新当前选中的选项
  console.log('Selected option:', selectedOption.value);
  dropdownVisible.value = false;
};


// 关闭下拉菜单的方法
const closeDropdown = () => {
  dropdownVisible.value = false;
};

// 确保点击下拉菜单外部时关闭菜单
const dropdownRef = ref(null);
// 确保 closeDropdownIfClickedOutside 中有非空检查
const closeDropdownIfClickedOutside = (event) => {
  // 检查 dropdownRef 是否有值
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

document.addEventListener('click', closeDropdownIfClickedOutside);

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownIfClickedOutside);
});
// 创建响应式引用
const textareaRef = ref(null);
const contentRef = ref(null);
const logoRef = ref(null);
const isFocused = ref(false);
// 使用 reactive 或 ref 来定义样式状态
const tabsStyle = reactive({
  marginTop: '83px'
});

// 使用 nextTick 等待 DOM 更新
onMounted(async () => {
  await nextTick();
  animateUI();
  hideLogo();
  selectedOption.value = getOptionsForTab.value(activeTab.value)[0] || activeTab.value;
});
const hideLogo = () => {
  const logo = logoRef.value;
  if (logo && logo.parentNode) {
    // 存储引用并在 DOM 中删除元素
    logo.parentNode.removeChild(logo);
  }
};
const animateUI = () => {
  textareaRef.value.addEventListener('input', handleTextareaInput);
  textareaRef.value.addEventListener('focus', handleTextareaFocus);
  textareaRef.value.addEventListener('blur', handleTextareaBlur);
};

const handleTextareaInput = () => {
  const textarea = textareaRef.value;
  if (textarea.scrollHeight > 10) {
    textarea.style.height = 'auto';
    tabsStyle.marginTop = '83px';
  }
  if (textarea.scrollHeight > 90) {
    textarea.style.height = '90px';
    tabsStyle.marginTop = '124px';
  }
};

const handleTextareaFocus = () => {
  isFocused.value = true;
  animateContentIn();
};

const handleTextareaBlur = () => {
  const textarea = textareaRef.value;
  if (textarea.value.trim() === '') {
    isFocused.value = false;
    animateContentOut();
  }
};

const animateContentIn = () => {
  const content = contentRef.value;
  content.style.opacity = '1';
  content.style.transform = 'translateY(0)';
  content.style.minHeight = '75%';
  content.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

const animateContentOut = () => {
  const content = contentRef.value;
  content.style.opacity = '0';
  // content.style.transform = 'translateY(100%)';
  content.style.display = 'none';
  document.body.style.overflow = '';
};

// 监听 textarea 的值变化，以便在内容变化时调整高度
watch(isFocused, (newValue) => {
  if (newValue) {
    handleTextareaFocus();
  } else {
    handleTextareaBlur();
  }
});
</script>



<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.main {
  grid-row: 2;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  justify-content: flex-start;
  position: relative;
  z-index: 50;
}

.content-wrapper {
  top: 50%;
  /* 初始状态，内容位于视窗中心 */
  left: 50%;
  height: 100%;
  text-align: center;
  opacity: 1;
  min-width: none;
}

.logo {
  /* Logo图片样式 */
  width: 450px;
  border-radius: 1rem;
  -webkit-user-drag: none;
  user-select: none;
  pointer-events: none;
  z-index: -1;
  margin-top: -8%;
}

.search-container {
  background-color: #ffffff;
  border: 1px solid #f5f5f5;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  border-top-right-radius: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 42px;
  /* 这里是永远悬浮在固定位 */
  /* position: sticky;
  top: 50px; */

}

.search-container textarea {
  width: 35vw;
  padding: 5px;
  border: 1px solid #fff;
  border-radius: 5px;
  outline: none;
  resize: none;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  height: auto;
  min-height: 36px;
  max-height: 90px;
  overflow-y: hidden;
  word-wrap: break-word;
  /* 长单词或无法使用空白符分割的字符串，将被分割 */
}

/* 当textarea获得焦点时，允许垂直滚动 */
.search-container textarea:focus {
  overflow: auto;
  white-space: normal;
  text-overflow: clip;
}

.search-container button {
  margin-top: 10px;
  padding: 20px 20px;
  margin-left: 10px;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-image: url("@/assets/images/LW.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.content {
  background-color: #ffffff;
  border: 1px solid #f5f5f5;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  min-width: 60.03px;
  width: 42.29vw;
  box-sizing: border-box;
  /* min-height: 30vh; */
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.5s ease, transform 0.5s ease;

}

/* 当搜索框获得焦点时，触发动画 */
.search-container textarea:focus~.content-wrapper .logo {
  opacity: 0;
  transform: scale(0.5);
  /* Logo缩小并向上移动 */
}

.search-container textarea:focus~.content-wrapper .content {
  opacity: 1;
  transform: translateY(0);
}

/* Tabs 和 Dropdown 的样式 */
.tabs {
  @apply -mb-2;
  flex-direction: column;
  /* 垂直排列 */
  align-items: flex-start;
  position: absolute;
  padding: 0px 0px;
}

.tab-list {
  list-style: none;
  display: flex;
  padding: 0;
}

.tab-list li {
  @apply px-4 pb-[0.5rem] pt-[0.78rem] mx-2 text-sm font-semibold text-gray-600 rounded-lg;
  cursor: pointer;
}

.tab-list li.active {
  @apply text-gray-900 border-gray-300;
  font-weight: bold;
}

.pt-line {
  @apply absolute top-1 pb-[0.199rem] left-0 w-full h-0.5 bg-black transition-all duration-300 ease-in-out;
}

/* Dropdown 样式 */
.dropdown {
  position: relative;
  display: inline-block;
  margin-bottom: -2.3%;
}

.dropdown-content {
  @apply absolute z-10 list-none bg-white rounded-lg shadow-lg py-1;
  display: none;
  top: 100%;
  left: 0;
}

.dropdown-button {
  @apply px-4 py-2 text-sm font-semibold text-left text-gray-600 bg-white rounded-lg border border-gray-300 shadow-md cursor-pointer;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Dropdown 选项样式 */
.dropdown-content li {
  @apply px-4 py-2 text-sm text-gray-600 cursor-pointer;
}

.dropdown-content li:hover {
  @apply bg-gray-200;
}
</style>
