<template>
  <div class="ud-form" :class="{'is-no-error-msg': noErrorMsg}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UdForm',
  inheritAttrs: false,
  provide() {
    return {
      registerFormItem: this.registerFormItem,
      unregisterFormItem: this.unregisterFormItem,
      form: this, // 傳遞Form實例给後代，比如FormItem用來校驗
    }
  },
  data() {
    return {
      submitLock: true,
      formItems: [], // 管理子元件實例
    }
  },
  props: {
    model: { // 驗證資料
      type: Object,
      required: true
    },
    rules: { // 驗證規則
      type: Object
    },
    noErrorMsg: { // 有無錯誤提示
      type: Boolean
    },
    noErrorScroll: { // 驗證時不滾動至錯誤項目
      type: Boolean
    },
  },
  methods: {
    registerFormItem(item) {
      this.formItems.push(item);
    },
    unregisterFormItem(item) {
      this.formItems = this.formItems.filter(i => i !== item);
    },
    validate(successCb = () => {console.log('驗證成功')}, failedCb = () => {console.log('驗證失敗')}) {
      this.submitLock = false;
      const tasks = this.formItems.filter(item => item.prop).map(item => item.validate(true));
      // console.log('tasks: ', tasks);
      Promise.all(tasks)
        .then(() => successCb())
        .catch(() => {
          if (!this.noErrorScroll) {
            this.$nextTick(() => this.scrollTo(".is-error", 5, -10));
          }
          failedCb();
        });
    },
    clearValidate() {
      this.formItems.forEach(item => {
        if (typeof item.clearValidate === 'function') {
          item.clearValidate();
        }
      });
    },
    scrollTo(el = "top", speed = 5, offset = 0, callback = () => {}) {
      let scrollTop = document.scrollingElement.scrollTop;
      let top = 0;
      if(typeof el === 'number') {
        top = el + offset;
      } else {
        if(el === 'top') {
          top = 0 + offset;
        } else if(el === 'bottom') {
          top = document.body.scrollHeight - document.body.clientHeight + offset;
        } else {
          top = document.querySelector(el) && document.querySelector(el).offsetTop + offset;
        }
      }
      const scroll = () => {
        scrollTop = scrollTop + (top - scrollTop) / speed;
        if (Math.abs(scrollTop - top) <= 1) {
          document.scrollingElement.scrollTop = top;
          callback && callback();
          return;
        }
        document.scrollingElement.scrollTop = scrollTop;
        requestAnimationFrame(scroll);
      };
      scroll();
    },
  }
}
</script>

<style lang="sass" scoped>
.ud-form
  &.is-no-error-msg
    ::v-deep(.ud-form-item)
      &.is-error
        .ud-form-item-right
          >div
            input,textarea,select
              border: 1px solid #cecece
              &:focus
                border: 1px solid #cecece
          >p.error-message
            display: none
</style>
