// vite获取本地图片路径
export const getAssetURL = (image) => {
  return new URL(`../assets/img/${image}`, import.meta.url).href
}