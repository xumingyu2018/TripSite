<template>
  <div class="app">
    <!-- 绑定组件的name属性 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <!-- <tab-bar/> -->
    <!-- 方法一：隐藏底部导航栏 -->
    <tab-bar v-show="!route.meta.hideTabBar"></tab-bar>
    <loading/>

  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tabbar.vue'
import { useRoute } from 'vue-router'
import loading from '@/components/loading/loading.vue'

const route = useRoute()
</script>

<style scoped>

</style>
