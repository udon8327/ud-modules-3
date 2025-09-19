<template>
  <div class="ud-form" :class="{ 'is-no-error-msg': noErrorMsg }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UdForm",
  inheritAttrs: false,
  provide() {
    return {
      registerFormItem: this.registerFormItem,
      unregisterFormItem: this.unregisterFormItem,
      form: this // 傳遞Form實例给後代，比如FormItem用來校驗
    };
  },
  data() {
    return {
      submitLock: true,
      formItems: [] // 管理子元件實例
    };
  },
  props: {
    model: { type: Object, default: () => ({}) }, // 驗證資料
    rules: { type: Object, default: () => ({}) }, // 驗證規則
    noErrorMsg: { type: Boolean, default: false }, // 有無錯誤提示
    noErrorScroll: { type: Boolean, default: false } // 驗證時不滾動至錯誤項目
  },
  methods: {
    registerFormItem(item) {
      if (item && !this.formItems.includes(item)) {
        this.formItems.push(item);
      }
    },
    unregisterFormItem(item) {
      this.formItems = this.formItems.filter(i => i !== item);
    },
    validate(
      successCb = () => {
        console.log("驗證成功");
      },
      failedCb = () => {
        console.log("驗證失敗");
      }
    ) {
      this.submitLock = false;
      const tasks = this.formItems.filter(item => item && item.prop).map(item => item.validate(true));
      return Promise.all(tasks)
        .then(() => {
          try {
            successCb();
          } finally {
            this.submitLock = true;
          }
          return true;
        })
        .catch(error => {
          try {
            if (error) console.error("發生錯誤：", error);
            if (!this.noErrorScroll) {
              this.$nextTick(() => {
                const firstError = document.querySelector(".is-error");
                if (firstError) {
                  this.scrollTo(firstError, 5, -10);
                }
              });
            }
            failedCb();
          } finally {
            this.submitLock = true;
          }
          return false;
        });
    },
    clearValidate() {
      this.formItems.forEach(item => {
        if (typeof item.clearValidate === "function") {
          item.clearValidate();
        }
      });
    },
    scrollTo(el = "top", speed = 5, offset = 0, callback = () => {}) {
      const scroller = document.scrollingElement || document.documentElement || document.body;
      let current = scroller.scrollTop;
      let target = 0;

      if (typeof el === "number") {
        target = el + offset;
      } else if (typeof el === "string") {
        if (el === "top") {
          target = 0 + offset;
        } else if (el === "bottom") {
          target = scroller.scrollHeight - window.innerHeight + offset;
        } else {
          const found = document.querySelector(el);
          if (found) {
            const rect = found.getBoundingClientRect();
            target = current + rect.top + offset;
          }
        }
      } else if (el instanceof HTMLElement) {
        const rect = el.getBoundingClientRect();
        target = current + rect.top + offset;
      }

      target = Math.max(0, Math.min(target, scroller.scrollHeight - window.innerHeight));

      const step = () => {
        current += (target - current) / speed;
        if (Math.abs(current - target) <= 1) {
          scroller.scrollTop = target;
          callback && callback();
          return;
        }
        scroller.scrollTop = current;
        requestAnimationFrame(step);
      };
      step();
    }
  }
};
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
