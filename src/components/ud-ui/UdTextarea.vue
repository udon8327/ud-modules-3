<template>
  <div class="ud-textarea" :class="$attrs.class" :style="$attrs.style">
    <textarea
      ref="textarea"
      v-bind="filteredAttrs"
      :class="{ 'is-no-resize': noResize }"
      :value="modelValue"
      :rows="rows"
      :maxlength="maxlength"
      @input="onInput"
      @change="onChange"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    ></textarea>
    <div class="textarea-limit" v-if="showLimit" :class="{ 'limit-input': valueLength > 0 }">
      <span>{{ valueLength }}/{{ maxlength }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UdTextarea",
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: "" }, // 綁定值
    rows: { type: Number, default: 4 }, // 預設行數
    showLimit: { type: Boolean, default: false }, // 是否顯示字數限制
    limit: { type: Number, default: 0 }, // 字數限制
    maxlength: { type: [Number, String], default: null }, // 最大字數限制
    noResize: { type: Boolean, default: false }, // 禁止改變大小
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
    valueLength() {
      return String(this.value ?? "").length;
    }
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
      this.$refs.textarea?.focus();
    },
    blur() {
      this.$refs.textarea?.blur();
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
  },
};
</script>

<style lang="sass" scoped>
.ud-textarea
  position: relative
  textarea
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
    &.is-no-resize
      resize: none
    &::placeholder
      color: #aaa
    &:focus
      outline: 0
      border: 1px solid #000
    &:disabled
      background-color: #efefef
      cursor: not-allowed
  .textarea-limit
    position: absolute
    right: 0px
    bottom: -20px
    span
      color: #ccc
      letter-spacing: 1px
      font-size: 14px
    &.limit-input
      span
        color: #000
</style>
