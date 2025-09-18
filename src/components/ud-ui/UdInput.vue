<template>
  <div class="ud-input">
    <input
      ref="input"
      v-model="value"
      v-bind="$attrs"
      :class="{ 'is-center': center }"
      @input="onInput"
      @change="onChange"
      @keydown.enter="onEnter"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UdInput",
  inheritAttrs: false,
  props: {
    modelValue: { default: null }, // 綁定值
    center: { type: Boolean, default: false }, // 是否置中
    // 支援 v-model 修飾子：v-model.trim / v-model.number / v-model.lazy
    modelModifiers: { type: Object, default: () => ({}) }
  },
  computed: {
    value: {
      get() {
        // 避免 input 綁定 null/undefined 造成告警，轉為空字串
        return this.modelValue === null || this.modelValue === undefined ? "" : this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      }
    }
  },
  mounted() {},
  methods: {
    normalize(val) {
      let output = val;
      const mods = this.modelModifiers || {};
      if (typeof output === "string" && mods.trim) {
        output = output.trim();
      }
      if (mods.number) {
        if (typeof output === "string") {
          if (output === "") return null; // 對齊 Vue 對空字串的處理
          const n = Number(output);
          output = Number.isNaN(n) ? output : n;
        }
      }
      return output;
    },
    onInput(evt) {
      this.$mitt && this.$mitt.emit && this.$mitt.emit("validate"); // 通知FormItem校驗（若存在）
      const mods = this.modelModifiers || {};
      if (mods.lazy) return; // lazy 僅在 change 觸發更新
      const raw = evt && evt.target ? evt.target.value : this.$refs.input.value;
      this.$emit("update:modelValue", this.normalize(raw));
    },
    onChange(evt) {
      const raw = evt && evt.target ? evt.target.value : this.$refs.input.value;
      const val = this.normalize(raw);
      this.$emit("update:modelValue", val);
      this.$emit("change", val);
    },
    onEnter(evt) {
      const raw = evt && evt.target ? evt.target.value : this.$refs.input.value;
      const val = this.normalize(raw);
      this.$emit("enter", val);
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    }
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
