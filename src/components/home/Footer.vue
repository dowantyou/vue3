<!-- src/components/home/Footer.vue -->
<template>
  <div class="footer">
    <!-- 作品版权归作者所有，如果侵犯了您的版权，请联系我们，本站将在3个工作日内删除。<br /> -->
    备案号：XXXXXXXXXXX
    <!-- <br />Copyright © 2024 light-word.com All Rights Reserved. -->
  </div>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 15px;
  padding: 10px;
  /* color: #010101; */
  color: #999;
  pointer-events: none;
  font-weight: bold;
}
</style>