<!-- 自定义底部导航栏组件 -->
<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item,index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <!-- 具名插槽 -->
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div> 
</template>

<script setup>

import tabbarData from '@/assets/data/tabbar.js'
import { getAssetURL } from '@/utils/load_assets.js';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// 监听路由改变时，找到对应路由的索引，设置currentIndex
const currentIndex = ref(0);
const route = useRoute();
watch(route, (newRoute) => {
  const index = tabbarData.findIndex((item) => item.path === newRoute.path);
  if(index === -1) return;
  currentIndex.value = index;
});


</script>

<style lang="less" scoped>
.tab-bar {
  img {
    height: 28px;
  }
}

</style>