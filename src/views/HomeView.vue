<!-- src/views/HomeView.vue -->
<template>
    <div class="home-view">
      <home-header></home-header>
      <home-main></home-main>
      <home-footer></home-footer>
    </div>
  </template>
  
  <script>
    import Header from '@/components/home/Header.vue';
    import Main from '@/components/home/Main.vue';
    import Footer from '@/components/home/Footer.vue';

    export default {
      name: 'HomeView',
      components: {
        'home-header': Header,
        'home-main': Main,
        'home-footer': Footer,
      },
    };

  </script>
  
  <style scoped>

  </style>