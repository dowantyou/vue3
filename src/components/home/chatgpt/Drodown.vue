<template>
  <div class="dropdown">
    <input type="text" class="test01" readonly placeholder="下拉式菜单" />
    <div class="option">
      <div>html</div>
      <div>html</div>
      <div>html</div>
      <div>html</div>
    </div>
  </div>
</template>
<script setup>
let dropdown = document.querySelector('.dropdown');
dropdown.onclick = function () {
  dropdown.classList.toggle('active');
}
</script>
<style lang="scss" scoped>
.dropdown {
  position: relative;
  margin-top: 180px;
  width: 300px;
  height: 50px;
  ::before{
    content: '';
    position: absolute;
    top: 25px;
    right: 28px;
    width: 12px;
    height: 2px;
    background: #555;
    z-index: 10;
    transform: rotate(40deg);
    transition: 0.5s;
  }
  .active::before{
    right: 20px;
  }
  .active::after{
    right: 28px;
  }
  ::after{
    content: '';
    position: absolute;
    top: 25px;
    right: 28px;
    width: 12px;
    height: 2px;
    background: #555;
    z-index: 10;
    transform: rotate(-40deg);
    transition: 0.5s;
  }
  .input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 10px;
    padding: 12px 20px;
    font-size: 16px;
    background: #fff;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.01);
    outline: none;
    border: none;
  }
  .option{
    position: absolute;
    top: 70px;
    width: 100%;
    background: #fff;
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    div{
      padding: 12px 20px;
      cursor: pointer;
      &:hover{
        background: #62baea;
        color: #fff;
      }
    }
  }
}
</style>
