<!-- src/components/home/Main.vue -->
<template>
  <div class="main">
    <div class="search-container">
      <textarea placeholder="Search..." rows="1"></textarea>
      <button>
        <!-- light it -->
      </button>
    </div>
    <!-- <div class="content-wrapper">
        <img src="@/assets/images/lw_web.png" alt="Logo" class="logo" />        
        <div class="content"> -->
    <!-- 这里是一段内容 -->
    <!-- <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> -->
    <!-- 这里还是一段内容 -->
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'Main',
  mounted() {
    this.animateUI();
  },
  methods: {
    animateUI() {
      const textarea = this.$el.querySelector('.search-container textarea');
      const logo = this.$el.querySelector('.content-wrapper .logo');
      const content = this.$el.querySelector('.content-wrapper .content');
      let logoReference;

      textarea.addEventListener('input', this.handleTextareaInput.bind(this));
      textarea.addEventListener('focus', this.handleTextareaFocus.bind(this));
      textarea.addEventListener('blur', this.handleTextareaBlur.bind(this));

      this.initAnimation(textarea, logo, content);
    },
    initAnimation(textarea, logo, content) {
      content.style.minHeight = '0';
    },
    handleTextareaInput() {
      const textarea = this.$el.querySelector('.search-container textarea');
      if (textarea.scrollHeight > 10) {
        textarea.style.height = 'auto';
      }
      if (textarea.scrollHeight > 90) {
        textarea.style.height = '90px';
      }
    },
    handleTextareaFocus() {
      const content = this.$el.querySelector('.content-wrapper .content');
      this.animateContentIn(content);
      this.hideLogo();
    },
    handleTextareaBlur() {
      const textarea = this.$el.querySelector('.search-container textarea');
      const content = this.$el.querySelector('.content-wrapper .content');
      if (textarea.value.trim() === '') {
        this.animateContentOut(content);
        this.showLogo();
      }
    },
    animateContentIn(content) {
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
      content.style.minHeight = '75%';
      document.body.style.overflow = 'hidden';
    },
    animateContentOut(content) {
      content.style.opacity = '0';
      content.style.transform = 'translateY(100%)';
      content.style.minHeight = '0';
      document.body.style.overflow = '';
    },
    hideLogo() {
      const logo = this.$el.querySelector('.content-wrapper .logo');
      if (logo.parentNode) {
        this.logoReference = logo; // 存储引用
        logo.parentNode.removeChild(logo); // 从页面移除Logo
      }
    },
    showLogo() {
      const contentWrapper = this.$el.querySelector('.content-wrapper');
      if (this.logoReference && !contentWrapper.querySelector('.logo')) {
        contentWrapper.appendChild(this.logoReference); // 使用存储的引用重新添加Logo
        this.logoReference.style.marginTop = '-62.4px';
        this.logoReference = null; // 清除引用
      }
    }
  }
};
</script>



<style scoped>
.main {
  grid-row: 2;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  justify-content: flex-start;
  position: relative;
}

.content-wrapper {
  top: 50%;
  /* 初始状态，内容位于视窗中心 */
  left: 50%;
  /* transform: translate(-50%, -50%); */
  height: 100%;
  text-align: center;
  opacity: 1;
  /* 初始状态，内容可见 */
  /* transition: opacity 0.5s ease, transform 0.5s ease; */
}

.logo {
  /* Logo图片样式 */
  width: 400px;
  border-radius: 10px;
  -webkit-user-drag: none;
  user-select: none;
  pointer-events: none;
}

.search-container {
  background-color: #ffffff;
  border: 1px solid #f5f5f5;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  /* position: sticky; 这里是永远悬浮在固定位
        top: 50px; */
}

.search-container textarea {
  width: 600px;
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
  padding: 20px 20px;
  margin-left: 18px;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-image: url("@/assets/images/LW.png");
  background-size: cover;
  /* 覆盖整个元素 */
  background-repeat: no-repeat;
  /* 防止图片重复 */
  background-position: center;
  /* 居中显示 */
}

.content {
  background-color: #ffffff;
  border: 1px solid #f5f5f5;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  min-width: 620.03px;
  min-height: 75%;
  opacity: 0;
  /* 初始状态，内容不可见 */
  transform: translateY(100%);
  /* 初始状态，内容位于下方 */
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
  /* 内容向上移动到视窗中心 */
}
</style>