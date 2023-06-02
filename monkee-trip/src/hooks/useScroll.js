import { onDeactivated, onMounted, onUnmounted, ref } from 'vue';


// export default function useScroll(reachBottomCB) {
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     console.log("-------")
//     if (clientHeight + scrollTop >= scrollHeight) {
//       console.log("滚动到底部了")
//       if (reachBottomCB) reachBottomCB()
//     }
//   }
  
//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler)
//   })
  
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
//   })
// }
export default function useScroll(){
  const isReachBottom = ref(false)

  const scrollListenerHandle = () => {
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight

    if(clientHeight + scrollTop >= scrollHeight) {
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

  return { isReachBottom }
}
