<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box/>
    <home-categories/>
    <home-content/>
    <!-- <button @click="moreBtnClick">加载更多</button> -->
    <!-- <home-search-box :hot-suggests="hotSuggests"/> -->
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import homeNavBar from './components/home-nav-bar.vue';
import homeSearchBox from './components/home-search-box.vue';
import homeCategories from './components/home-categories.vue';
import homeContent from './components/home-content.vue';

import useScroll from '@/hooks/useScroll';
import myRequest from '@/services/request/index';
import { onMounted, onUnmounted, ref, watch } from 'vue';

// 热门建议
// const hotSuggests = ref([])
// 发送网络请求
// myRequest.get({
//   url: '/home/hotSuggests'
// }).then(res => {
//   hotSuggests.value = res.data
// })
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

// 默认加载更多按钮
// const moreBtnClick = () => {
//   // currentPage++;
//   homeStore.fetchHouseListData()
// }

const { isReachBottom } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
      homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})


</script>

<style lang="less" scoped>
.home {
  // height: 100vh;
  // overflow-y: auto;
  // box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}


</style>