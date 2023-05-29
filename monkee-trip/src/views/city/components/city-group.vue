<template>
  <div class="city-group">
    <template v-for="(group, index) in groupData?.cities" :key="index">
      <div class="group-item">
        <h2 class="title">分组：{{ group.group }}</h2>
        <div class="list">
          <template v-for="(city, indey) in group.cities" :key="indey">
            <div class="city">{{ city.cityName }}</div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="less" scoped>

</style>