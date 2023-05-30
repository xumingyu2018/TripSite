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
import homeNavBar from './components/home-nav-bar.vue';
import homeSearchBox from './components/home-search-box.vue';
import myRequest from '@/services/request/index';
import { ref } from 'vue';

const hotSuggests = ref([])
myRequest.get({
  url: '/home/hotSuggests'
}).then(res => {
  hotSuggests.value = res.data
})

</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>