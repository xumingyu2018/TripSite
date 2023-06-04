import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'

export default function useScroll(elRef){
  // 默认不传参监听的是window的窗口滚动
  let el = window

  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandle = throttle(() => {
    if(el === window){
      // window窗口的滚动
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      // Dom元素上的滚动（加了over-flow）
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }

    if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log("滚动到底部了");
      isReachBottom.value = true
    }
  }, 100)
  
  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandle, false)
  })
  
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandle, false)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
