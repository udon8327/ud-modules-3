<template>
  <p 
    class="ud-ellipsis" 
    :class="{ 'multi-line': maxLine > 1 }"
    :style="inlineStyle"
  >
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: "UdEllipsis",
  props: {
    maxLine: { type: Number, default: 1 } // 指定省略行數
  },
  computed: {
    inlineStyle() {
      const clamp = Number.isFinite(this.maxLine) && this.maxLine > 0 ? this.maxLine : 1;
      return {
        WebkitLineClamp: clamp,
        webkitLineClamp: clamp, // 添加小寫版本以確保兼容性
        lineClamp: clamp // 標準屬性（未來瀏覽器支援）
      };
    }
  }
};
</script>

<style lang="sass" scoped>
.ud-ellipsis
  display: -webkit-box
  overflow: hidden
  text-overflow: ellipsis
  -webkit-box-orient: vertical
  // 移除硬編碼的 -webkit-line-clamp，由 inlineStyle 動態控制
  word-break: break-word
  white-space: nowrap
  &.multi-line
    white-space: normal
</style>
