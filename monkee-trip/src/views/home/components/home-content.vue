<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <house-item-type1 
          v-if="item.discoveryContentType === 9" 
          :item-data="item.data"/>
        <house-item-type2 
          v-else-if="item.discoveryContentType ===3"
          :item-data="item.data"/>
      </template>
    </div>
    
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import houseItemType1 from '@/components/house-item-type1/house-item-type1.vue';
import houseItemType2 from '@/components/house-item-type2/house-item-type2.vue';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    // 换行
    flex-wrap: wrap;
  }
}
</style>