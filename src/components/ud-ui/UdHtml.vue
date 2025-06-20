<template>
  <div class="ud-html" v-html="nl2br(text)"></div>
</template>

<script>
export default {
  name: 'UdHtml',
  props: {
    text: { default: "<h1>H1 用戶自定義訊息</h1><h2>H2 用戶自定義訊息</h2><h3>H3 用戶自定義訊息</h3><h4>H4 用戶自定義訊息</h4><h5>H5 用戶自定義訊息</h5><h6>H6 用戶自定義訊息</h6>\n<p>p 用戶自定義訊息</p><span>span 用戶自定義訊息</span>" } // 文字
  },
  methods: {
    nl2br(val = '', isXhtml = false) {
      if (typeof val !== 'string') return val;
      const breakTag = isXhtml ? '<br />' : '<br>';
      return val.replace(/(\r\n|\n\r|\r|\n)/g, breakTag);
    },
  }
}
</script>

<style lang="sass" scoped>
</style>
