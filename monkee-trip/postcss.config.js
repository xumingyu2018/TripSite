// vue cli/vite
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 规定设计稿宽度
      viewportWidth: 375,
      // 排除不需要转换的文件
      selectorBlackList: ["favor"]
    }
  }
};
