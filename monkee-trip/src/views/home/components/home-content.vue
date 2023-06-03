<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <house-item-type1 
          v-if="item.discoveryContentType === 9" 
          :item-data="item.data"
          @click="itemClick(item.data)"/>
          <!-- 点击事件默认传递到子组件的根上，若有多个根需要使用$attr -->
          <!-- 非Prop（没有定义props）的attribute将自动添加到根节点的Attribute中（如class、style、id属性、点击事件）—attribute继承，通过$attrs来访问 -->
        <house-item-type2 
          v-else-if="item.discoveryContentType ===3"
          :item-data="item.data"
          @click="itemClick(item.data)"/>
      </template>
    </div>
    
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import houseItemType1 from '@/components/house-item-type1/house-item-type1.vue';
import houseItemType2 from '@/components/house-item-type2/house-item-type2.vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

const router = useRouter()
const itemClick = (item) => {
  router.push("/detail/" + item.houseId)
  console.log('itemClick', item.houseId)
}

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