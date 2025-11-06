<template>
  <div class="ud-input" :class="$attrs.class" :style="$attrs.style">
    <input
      ref="input"
      v-bind="filteredAttrs"
      :class="{ 'is-center': center }"
      :value="modelValue"
      @input="onInput"
      @change="onChange"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UdInput",
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: "" }, // 綁定值
    center: { type: Boolean, default: false }, // 是否置中
    modelModifiers: { type: Object, default: () => ({}) } // v-model修飾子
  },
  data() {
    return {
      isComposing: false // 中文輸入法狀態追蹤
    };
  },
  computed: {
    filteredAttrs() {
      const { class: classAttr, style, ...attrs } = this.$attrs;
      return attrs;
    },
  },
  mounted() {},
  emits: ["update:modelValue", "input", "change"],
  methods: {
    onInput(e) {
      if (this.isComposing) return; // 避免中途 IME 組字觸發
      if (this.modelModifiers.lazy) return; // lazy 模式只在 change 時觸發
      this.$emit("input", e);
      this.$emit("update:modelValue", this.formatValue(e.target.value));
      this.$mitt.emit("validate"); // 通知FormItem校驗
    },
    onChange(e) {
      this.$emit("change", e);
      this.$emit("update:modelValue", this.formatValue(e.target.value));
      this.$mitt.emit("validate"); // 通知FormItem校驗
    },
    onCompositionStart() {
      this.isComposing = true;
    },
    onCompositionEnd(e) {
      this.isComposing = false;
      this.$emit("input", e);
      this.$emit("update:modelValue", this.formatValue(e.target.value));
      this.$mitt.emit("validate"); // 通知FormItem校驗
    },
    focus() {
      this.$refs.input?.focus();
    },
    blur() {
      this.$refs.input?.blur();
    },
    formatValue(value) {
      const mods = this.modelModifiers;
      // .trim
      if (mods.trim) value = value.trim();
      // .number
      if (mods.number) {
        const parsed = parseFloat(value);
        value = isNaN(parsed) ? value : parsed;
      }
      return value;
    },
  }
};
</script>

<style lang="sass" scoped>
.ud-input
  input
    appearance: none
    width: 100%
    padding: 5px 10px
    min-height: 40px
    font-size: 14px
    color: #000
    border: 1px solid #ccc
    border-radius: 4px
    background-color: #fff
    transition: all 0.2s ease
    &.is-center
      text-align: center
    &::placeholder
      color: #aaa
    &:focus
      outline: 0
      border: 1px solid #000
    &:disabled
      background-color: #efefef
      cursor: not-allowed
</style>
