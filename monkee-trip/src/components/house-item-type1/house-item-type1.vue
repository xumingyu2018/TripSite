<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <van-rate :model-value="itemScore" color="#fff" :size="15" readonly allow-half/>
          <div class="new">¥ {{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"


const props = defineProps({
  itemData: {
    type: Object,
    default: () => {}
  }
})

const itemScore = computed(() => {
  return Number(props.itemData.commentScore)
})

</script>

<style lang="less" scoped>
.house-item {
  // 整个宽度各占一半
  width: 50%;

  .item-inner {
    // 相对定位微调
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    // 把图片超出宽度50%的部分隐藏
    overflow: hidden;

    .cover {
      img {
        // 上面overflow后将图片恢复比例
        width: 100%;
      }
    }

    .info {
      // 绝对定位后将文字信息放在图片底部
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;

      .summary {
        font-size: 12px;
      }
      .name {
        margin: 5px 0;
        // 以下4行表示使文字显示2行
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
}
</style>