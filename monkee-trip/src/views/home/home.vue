<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box :hot-suggests="hotSuggests"/>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import homeNavBar from './components/home-nav-bar.vue';
import homeSearchBox from './components/home-search-box.vue';
import myRequest from '@/services/request/index';
import { ref } from 'vue';

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

</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>