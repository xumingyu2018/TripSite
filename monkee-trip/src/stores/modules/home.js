import { getHomeCategories, getHomeHotSuggests, getHomeHouseList } from "@/services/modules/home";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houseList: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHomeHouseList(this.currentPage)
      // 将数据追加到原有数据后面（加载更多）
      this.houseList.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore