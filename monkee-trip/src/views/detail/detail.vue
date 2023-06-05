<template>
  <div class="detail top-page" ref="detailRef">
    <!-- 这里的tabItemClick是由子组件定义好传过来的 -->
    <tab-control 
      v-if="showTabControl" 
      :titles="names" 
      @tabItemClick="tabClick" 
      class="tabs"
    />
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow  @click-left="onClickLeft"/>
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/>
      <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
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

// tabControl标签页的滚动事件
const detailRef = ref()
// 传入参数，监听Dom元素的滚动事件，而不是window
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

// tabControl标签页锚点定位效果（方法一）
// const sectionEls = []
// const getSectionRef = (value) => {
//   // 将每个组件的根dom元素存入数组
//   sectionEls.push(value.$el)
// }
// const tabClick = (index) => {
//   // 获取对应的dom元素距离顶部的距离(每一个dom元素都有一个距离顶部距离的api即offsetTop)
//   let instance = sectionEls[index].offsetTop
//   // 除了第一个tab，其他的都要减去44px的高度 
//   if(index !== 0) {
//     instance = instance - 44
//   }
//   // 滚动到对应的位置
//   detailRef.value.scrollTo({
//     top: instance,
//     behavior: 'smooth'
//   })
// }

// tabControl标签页锚点定位效果（方法二--name属性动态获取标签页）
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
// key: name属性的值，value: 对应的组件根dom元素
const getSectionRef = (value) => {
  // 卸载的时候，将对应的组件根dom元素从对象中删除，此时value为null,value.$el会报错
  if(!value) return
  const name = value.$el.getAttribute('name')
  sectionEls.value[name] = value.$el
}
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  
  let instance = el.offsetTop
  if(index !== 0) {
    instance = instance - 44
  }
  // 滚动到对应的位置
  detailRef.value.scrollTo({
    top: instance,
    behavior: 'smooth'
  })
}

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