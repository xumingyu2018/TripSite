<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control v-if="showTabControl" :titles="['aaa', 'bbb', 'ccc', 'ddd' ]" class="tabs"/>
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
import TabControl from "@/components/tab-control/tab-control.vue";

import { getDetailInfos } from '@/services';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from "vue";
import useScroll from "@/hooks/useScroll";

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

// tabControll标签页的相关操作
const detailRef = ref()
// 传入参数，监听Dom元素的滚动事件，而不是window
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

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