import { defineStore } from "pinia";

// 大部分组件都需要共享的状态
const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)

export const useMainStore = defineStore("main", {
  state: () => ({
    token: "",

    startDate: startDate,
    endDate: endDate,

    isLoading: false
  })
})