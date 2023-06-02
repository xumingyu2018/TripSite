import { onMounted, onUnmounted, ref } from 'vue';

export default function useScroll(){
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandle = () => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight

    if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log("滚动到底部了");
      isReachBottom.value = true
    }
  }
  
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandle, false)
  })
  
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandle, false)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
