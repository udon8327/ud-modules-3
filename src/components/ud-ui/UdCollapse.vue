<template>
  <div class="ud-collapse" :style="{height: height, transitionDuration: durationSecond}">
    <div class="ud-collapse-wrapper" ref="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UdCollapse',
  props: {
    modelValue: { type: Boolean, default: false },
    duration: { type: Number, default: 0.2 }
  },
  data() {
    return {
      isShow: this.modelValue,
      height: '0px'
    }
  },
  computed: {
    durationSecond() {
      return `${this.duration}s`
    }
  },
  watch: {
    modelValue(newVal) {
      this.isShow = newVal;
    },
    isShow() {
      this.$nextTick(() => {
        this.collapse();
        this.$emit('update:modelValue', this.isShow);
        this.$emit('switch', this.isShow);
      })
    }
  },
  mounted() {
    if (this.isShow) {
      this.height = this.$refs.wrapper.clientHeight + 'px';
    }
  },
  methods: {
    open() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    collapse() {
      if (this.isShow) {
        this.height = this.$refs.wrapper.clientHeight + 'px';
      } else {
        this.height = '0px';
      }
    }
  }
}
</script>

<style scoped lang="sass">
.ud-collapse
  overflow: hidden
  will-change: auto
</style>