<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"
import { onMounted, ref } from "vue";

const props = defineProps({
  position: {
    type: Object,
    default: () => {}
  }
})

const mapRef = ref()
// 要确保在setup挂载时渲染
onMounted(() => {
  // 挂载地图实例
  const map = new BMapGL.Map(mapRef.value);
  // 动态设置中心点坐标
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude);
  // 地图初始化，同时设置地图展示级别
  map.centerAndZoom(point, 15); 
  const marker = new BMapGL.Marker(point); // 创建标注   
  map.addOverlay(marker); // 将标注添加到地图中
  map.enableScrollWheelZoom(true);   //开启鼠标滚轮缩放
})



</script>

<style lang="less" scoped>
.baidu {
  height: 250px;
}
</style>