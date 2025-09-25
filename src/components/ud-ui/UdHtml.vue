<template>
  <div class="ud-html" v-html="safeHtml"></div>
  <!-- 若要純文字換行，可改用：<div class="ud-html" v-text="text" /> -->
</template>

<script>
import { nl2br } from "@/utils/ud-utils";

export default {
  name: "UdHtml",
  props: {
    text: {
      type: String,
      default:
        "<h1>H1 用戶自定義訊息</h1><h2>H2 用戶自定義訊息</h2><h3>H3 用戶自定義訊息</h3><h4>H4 用戶自定義訊息</h4><h5>H5 用戶自定義訊息</h5><h6>H6 用戶自定義訊息</h6>\n<p>p 用戶自定義訊息</p><span>span 用戶自定義訊息</span>"
    } // 文字
  },
  computed: {
    safeHtml() {
      // 直接使用 ud-utils 中的 nl2br，已包含 XSS 防護
      return nl2br(this.text || "");
    }
  }
};
</script>

<style lang="sass" scoped></style>
