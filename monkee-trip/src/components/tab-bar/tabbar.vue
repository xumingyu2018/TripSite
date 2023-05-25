<!-- 自定义底部导航栏组件 -->
<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const currentIndex = ref(0);

</script>

<style lang="less" scoped>
.tab-bar {
  img {
    height: 28px;
  }
}

</style>