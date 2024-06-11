<!-- src/components/home/Header.vue -->
<template>
  <div class="header">
    <div class="avatar">
      <div class="dropdown">
        <div class="dropdown-content">
          <a href="#" @click.prevent="goToLogin">登录/注册</a>
          <!-- 个人资料跟后面的都是是登录后显示，未登录则是上面这些a标签 -->
          <!-- <a href="#">个人资料</a> -->
          <!-- <a href="#">修改密码</a>
            <a href="#">退出</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goToLogin() {
      const loginUrl = this.$router.resolve('/login').href;
      window.open(loginUrl, '_blank');
    }
  },
};
</script>

<style scoped>
@keyframes fadeInGradient {
  0% {
    background-color: inherit;
    backdrop-filter: blur(0px);
  }

  50% {
    backdrop-filter: blur(5px);
  }

  100% {
    background-color: rgba(21, 21, 21, 0.826);
    backdrop-filter: blur(10px);
  }
}

.header {
  grid-row: 1;
  grid-column: 1;
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  /* margin-bottom: 22px; */
  margin-bottom: 60px;
}

.header:hover {
  animation: fadeInGradient 0.3s ease-in-out forwards;
}

.header .avatar {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  background-image: url("https://avatars.githubusercontent.com/u/100819988?s=400&u=15d926bcd48de2d3dd304b5458a86adad4a29e7b&v=4");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

/* 下拉菜单样式 */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 110px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  top: 100%;
  /* 位于头像下方 */
  right: 0;
  /* 从头像的右侧开始显示 */
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* 鼠标悬停在头像上时显示下拉菜单 */
.avatar:hover .dropdown-content {
  display: block;
}

/* 下拉菜单淡入动画 */
.dropdown-content {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar:hover .dropdown-content {
  opacity: 1;
}
</style>