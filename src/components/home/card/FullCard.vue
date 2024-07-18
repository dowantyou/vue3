<!-- src\components\home\card\FullCard.vue -->
<template>
  <div :class="['wrapper', { 'wrapper--expanded': isWrapperExpanded }]">
    <!-- 使用v-for指令来循环渲染多张卡片 -->
    <div class="book" v-for="(book, index) in books" :key="index" :class="{ 'book--expanded': expandedIndex === index }"
      @click="toggleBook(index)" v-show="expandedIndex === index || showAllCards">

      <div class="book__cover">
        <div class="header-image">
          <div class="overlay"></div>
        </div>

        <div class="title-wrap">
          <h1 class="article-title">{{ book.title }}</h1>
          <p class="light-ipa">{{ book.LightIPA }}</p>
          <p class="old-ipa">{{ book.OldIPA }}</p>
          <p class="mw-ipa">{{ book.MWIPA }}</p>
        </div>

        <p class="book__cover-exerpt">
          {{ Object.values(book.senses_dict_zh)[0].join(', ') }}
        </p>
      </div>
      <div class="book__content">
        <!-- 这里可以添加更多内容 -->
        <!-- <p>
          <span class="drop-cap">O</span>
          {{ Object.values(book.senses_dict_zh)[0].join(', ') }}
        </p> -->

        <p v-for="(sense, index) in Object.values(book.senses_dict_zh)" :key="index">
          {{ sense.join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const books = ref([
  {
    title: 'template',
    LightIPA: 'ˢtem₂ pla₃₋ te₀', OldIPA: 'ˈtemplət', MWIPA: 'ˈtem-plət',
    senses_dict_zh: { n: ["模板", "样板", "标准", "型板", "模框"], v: ["模板化", "样板化", "标准化", "型化", "模拟化"], },
  },
  {
    title: 'phonetic',
    LightIPA: 'pho₃₋ ˢne₂ tic₆', OldIPA: 'fə-ˈne-tik', MWIPA: 'fəˈnetɪk', BFIpa: 'fəˈnetɪk',
    senses_dict_zh: { adj: ["语音的", "音标的", "表示语音的", "与发音近似的"] },
  },
]);
const expandedIndex = ref(null); // 当前展开的卡片索引
const showAllCards = ref(true); // 控制是否显示所有卡片

// 使用计算属性决定是否添加 'wrapper--expanded' 类
const isWrapperExpanded = computed(() => expandedIndex.value !== null);
const checkWrapperExpanded = () => {
  const wrapperExpanded = document.querySelector('.wrapper--expanded');
  const wrapper = document.querySelector('.wrapper');
  if (wrapperExpanded) {
    document.body.style.overflowY = 'hidden';
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0';
  } else {
    document.body.style.overflowY = 'auto';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '-6.1rem';
  }
};

onMounted(() => {
  checkWrapperExpanded();
  // 监听 DOM 变化，确保在运行时动态添加的 .wrapper--expanded 类也能被检测到
  const observer = new MutationObserver(checkWrapperExpanded);
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  });
});
const toggleBook = index => {
  if (expandedIndex.value === index) {
    // 如果点击的是当前已展开的卡片，则关闭它，并显示所有卡片
    expandedIndex.value = null;
    showAllCards.value = true;
  } else {
    // 如果点击的是其他卡片，则展开它，并隐藏其他卡片
    expandedIndex.value = index;
    showAllCards.value = false;
  }
};

</script>

<style scoped>
@import '@/assets/css/main.css';

.mr2 {
  margin-right: 1rem;
}

.ml2 {
  margin-left: 1rem;
}

.article-title {
  font-size: 2.5rem;
  line-height: 1;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  letter-spacing: 0.025em;
  transition: font-size 0.45s ease-in-out, color 0.3s ease-out;
}

.light-ipa {
  font-size: 2rem;
  line-height: 1;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  letter-spacing: 0.025em;
  transition: font-size 0.45s ease-in-out, color 0.3s ease-out;
}

.old-ipa {
  font-size: 1.8rem;
  line-height: 1;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  letter-spacing: 0.025em;
  transition: font-size 0.45s ease-in-out, color 0.3s ease-out;
}

.mw-ipa {
  font-size: 1.8rem;
  line-height: 1;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  letter-spacing: 0.025em;
  transition: font-size 0.45s ease-in-out, color 0.3s ease-out;
}

.header-image {
  /* height: 220px; */
  height: 30vh;
  /* height: 40%; */
  background-image: url(@/assets/images/t1.png);
  background-size: cover;
  background-position: center;
  margin-bottom: 0.5rem;
  position: relative;
  transition: all 0.45s ease-in-out;
}

.overlay {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.title-wrap {
  transform: translateY(0);
  transition: transform 0.45s ease-in;
}

.drop-cap {
  font-size: 55px;
  line-height: 28px;
}

.wrapper {
  /* position: absolute;
  top: -5rem; */
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper--expanded {
  z-index: 101;
  @apply no-scrollbar;
  /* position: fixed;
  top: 0;
  left: 0; */
}

.book__cover-exerpt {
  color: #6a6a6a;
  padding: 1rem 1.5rem;
  line-height: 1.6;
  text-align: center;
  opacity: 1;
  max-width: 370px;
  margin: 0 auto;
  display: block;
  transition: all 0.25s ease-in-out;
}

.book__cover {
  height: 100%;
  width: 100%;
}

.book__content {
  text-align: justify;
  word-wrap: break-word;
  font-size: 1.1rem;
  opacity: 0;
  transition: all 1.5s ease-in-out;
  max-width: 750px;
  margin: 0 auto 6rem;
  padding: 0 2rem;
}

.book__content p {
  line-height: 1.8;
  color: #3a3a3a;
  margin-bottom: 2.5rem;
}

.book {
  overflow: hidden;
  background: white;
  /* width: 240px;
  height: 340px;
  margin-top: 250px; */
  box-shadow: 0 20px 30px -10px #ccc;
  transition: all 0.5s ease-in-out;
  margin: 0 10px;
  width: 30%;

  @media (max-width: 1201px) {
    width: 35%;
  }

  @media (max-width: 1200px) and (min-width: 1001px) {
    width: 40%;
  }

  @media (max-width: 1000px) and (min-width: 769px) {
    width: 45%;
  }

  @media (max-width: 1000px) and (min-width: 768px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 60%;
  }

  /* 30% 25% 20%*/
  height: 64%;
  margin-bottom: -158px;
  min-width: 13%;
  border-radius: 1rem;
}

.book:hover {
  box-shadow: 0 6px 50px 10px #cfcfcf;
}

.book--expanded {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  z-index: 100;
  margin: 0;
}

.book--expanded .overlay {
  opacity: 0.95;
}

.book--expanded .article-title {
  color: white;
  font-size: 64px;
  letter-spacing: 0.05em;
}

.book--expanded .title-wrap {
  transform: translateY(-300px);
  color: white;
}

.book--expanded .book__cover-exerpt {
  opacity: 0;
}

.book--expanded .book__cover {
  height: 460px;
  margin-bottom: 2.5rem;
}

.book--expanded .book__content {
  opacity: 1;
}

.book--expanded .header-image {
  height: 100%;
}

span {
  margin-left: -35px;
}

span .fa {
  font-size: 17px;
  margin-left: 20px;
}

/* 添加的内容 */
.book__cover-expert {
  max-height: 10em;
}

.social {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .5s ease-in-out;
}

.social i {
  margin: .5rem;
  color: #7a7a7a;
}

.book__expanded .book__content {
  opacity: 1;
}

.book__expanded .header-image {
  height: 40vw;
}

.book__expanded .book__cover {
  height: auto;
}

.book__expanded .book__cover-expert,
.book__expanded .social {
  opacity: 0;
  max-height: 0;
  padding: 0rem;
}

html.no-scroll,
body.no-scroll {
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
:root {
  --has-expanded-wrapper: false;
}

.wrapper--expanded {
  --has-expanded-wrapper: true;
}
</style>