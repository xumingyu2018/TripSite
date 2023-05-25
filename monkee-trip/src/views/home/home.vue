<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
  </div>
</template>

<script setup>
import homeNavBar from './components/home-nav-bar.vue';


</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>