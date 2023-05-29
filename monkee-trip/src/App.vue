<template>
  <div class="app">
    <router-view/>

    <tab-bar></tab-bar>
    <!-- 方法一：隐藏底部导航栏 -->
    <!-- <tab-bar v-if="!route.meta.hideTabBar"></tab-bar> -->
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tabbar.vue'
// import { useRoute } from 'vue-router'

// const route = useRoute()
</script>

<style scoped>

</style>
