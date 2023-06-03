<template>
  <div class="detail">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow  @click-left="onClickLeft"/>
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
    </div>
  </div>
</template>

<script setup>
import DetailSwipe from "./components/detail-swipe.vue"
import { getDetailInfos } from '@/services';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from "vue";

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

// 发送网络请求获取数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

// 监听返回按钮点击
const onClickLeft = () => {
  router.back()
}
</script>

<style lang="less" scoped>

</style>