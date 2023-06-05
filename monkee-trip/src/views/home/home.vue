<template>
  <div class="home" ref="homeRef">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box/>
    <home-categories/>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar/>
    </div>
    <home-content/>
    <!-- <button @click="moreBtnClick">加载更多</button> -->
    <!-- <home-search-box :hot-suggests="hotSuggests"/> -->
  </div>
</template>

<script>
  // vue2语法使keep-alive绑定name属性 
  export default { name: 'home'}
</script>
<script setup>
import useHomeStore from '@/stores/modules/home';
import homeNavBar from './components/home-nav-bar.vue';
import homeSearchBox from './components/home-search-box.vue';
import homeCategories from './components/home-categories.vue';
import homeContent from './components/home-content.vue';
import searchBar from '@/components/search-bar/search-bar.vue';

import useScroll from '@/hooks/useScroll';
import myRequest from '@/services/request/index';
import { computed, onActivated, ref, watch } from 'vue';

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

// 监听是否到底部，若到底部加载更多
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
// 监听变化后执行js逻辑用watch
watch(isReachBottom, (newValue) => {
  if (newValue) {
      homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
// 使用计算属性更好，computed可以缓存计算结果，只有依赖的响应式数据发生变化才会重新计算
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})

// 跳转回home时, 保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>