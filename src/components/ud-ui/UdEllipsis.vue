<template>
  <p class="ud-ellipsis" :style="inlineStyle">
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
        WebkitLineClamp: clamp
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
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
</style>
