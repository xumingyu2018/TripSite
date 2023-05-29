<template>
  <div class="city top-page">
    <div class="top">
      <!-- 1.搜索框 -->
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="城市/区域/位置" 
        show-action
        @cancel="onCancel"
      />
      <!-- 2.tab的切换 -->
      <!-- tabActive默认索引,加上name属性即可作为标签的索引值 -->      
      <van-tabs v-model:active="tabActive" color="#fff9854">
        <!-- <van-tab title="国内港澳台"></van-tab> -->
        <!-- <van-tab :title="allCity?.cityGroupOverSea?.title"></van-tab> -->
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <!-- group-data父传子 -->
      <!-- 使用v-show优化渲染 -->
      <template v-for="(value, key, index) in allCities" :key="key">
        <city-group v-show="tabActive === key" :group-data="value"/>      
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
import CityGroup from "./components/city-group.vue";
// import axios from "axios";
// 从默认的index.js中导入
// import { getCityAll } from "@/services";

const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const onCancel = () => {
  // 返回上一级
  router.back()
}

// tab切换
const tabActive = ref(0)

// 发送网络请求获取城市数据
/**
 * 这个位置发送网络请求有两个缺点:
 *   1.如果网络请求太多, 那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
 *   2.如果页面封装了很多的子组件, 子组件需要这些数据, 我们必须一步步将数据传递过去(props)
 */
// const allCity = ref({})
// getCityAll().then(res => {
//   allCity.value = res.data
// })
// 使用axios
// axios.get("http://123.207.32.32:1888/api/city/all").then(res => {
//   console.log(res);
// })

// 从pinia的Store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 目的: 获取选中标签后的数据
// 1.获取正确的key: 将tabs中绑定的tabAction正确绑定
// 2.根据key从allCities获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>
.city {
  // 使用top固定定位实现
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  // .content {
  //   margin-top: 98px;
  // }

  // 局部滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>