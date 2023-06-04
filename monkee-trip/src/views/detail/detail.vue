<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow  @click-left="onClickLeft"/>
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-infos :top-infos="mainPart.topModule"/>
      <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-landlord :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
      <detail-comment :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-map :position="mainPart.dynamicModule.positionModule"/>
      <detail-intro :priceIntro="mainPart.introductionModule"/>
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">Nevermore毓提供技术支持</div>
    </div>
  </div>
</template>

<script setup>
import DetailSwipe from "./components/detail_01-swipe.vue"
import DetailInfos from "./components/detail_02-infos.vue";
import DetailFacility from "./components/detail_03-facility.vue";
import DetailLandlord from "./components/detail_04-landlord.vue";
import DetailComment from "./components/detail_05-comment.vue";
import DetailNotice from "./components/detail_06-notice.vue";
import DetailMap from "./components/detail_07-map.vue";
import DetailIntro from "./components/detail_08-intro.vue";

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

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }
  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>