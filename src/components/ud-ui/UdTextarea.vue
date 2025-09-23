<template>
  <div class="ud-textarea">
    <textarea
      ref="textarea"
      v-model="value"
      v-bind="$attrs"
      :rows="rows"
      :class="{ 'is-no-resize': noResize }"
      @input="onInput"
      @change="onChange"
      @keydown.enter="onEnter"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    ></textarea>
    <div class="textarea-limit" v-if="showLimit" :class="{ 'limit-input': valueLength > 0 }">
      <span>{{ valueLength }}/{{ limit }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UdTextarea",
  inheritAttrs: false,
  props: {
    modelValue: { default: null }, // 綁定值
    rows: { type: Number, default: 4 }, // 行數
    showLimit: { type: Boolean, default: false }, // 是否顯示字數限制
    limit: { type: Number, default: 0 }, // 字數限制提示(需限字數請自行加上maxlength屬性)
    noResize: { type: Boolean, default: false }, // 禁止改變大小
    // 支援 v-model 修飾子：trim / number / lazy
    modelModifiers: { type: Object, default: () => ({}) }
  },
  computed: {
    value: {
      get() {
        return this.modelValue === null || this.modelValue === undefined ? "" : String(this.modelValue);
      },
      set(val) {
        this.$emit("update:modelValue", val);
      }
    },
    valueLength() {
      return String(this.value ?? "").length;
    }
  },
  watch: {},
  data() {
    return {
      _isComposing: false
    };
  },
  methods: {
    normalize(val) {
      let output = val;
      const mods = this.modelModifiers || {};
      if (typeof output === "string" && mods.trim) {
        output = output.trim();
      }
      if (mods.number) {
        if (typeof output === "string") {
          if (output === "") return null;
          const n = Number(output);
          output = Number.isNaN(n) ? output : n;
        }
      }
      return output;
    },
    onInput(evt) {
      this.$mitt && this.$mitt.emit && this.$mitt.emit("validate"); // 通知FormItem校驗
      const mods = this.modelModifiers || {};
      if (this._isComposing) return; // 中文輸入組字中不更新
      if (mods.lazy) return; // lazy 僅在 change 同步
      const raw = evt && evt.target ? evt.target.value : this.$refs.textarea?.value;
      this.$emit("update:modelValue", this.normalize(raw));
    },
    onCompositionStart() {
      this._isComposing = true;
    },
    onCompositionEnd(evt) {
      this._isComposing = false;
      // 組字結束後補一次 input 同步
      const raw = evt && evt.target ? evt.target.value : this.$refs.textarea?.value;
      const mods = this.modelModifiers || {};
      if (!mods.lazy) {
        this.$emit("update:modelValue", this.normalize(raw));
      }
    },
    onChange(evt) {
      const raw = evt && evt.target ? evt.target.value : this.$refs.textarea?.value;
      const val = this.normalize(raw);
      const mods = this.modelModifiers || {};
      // lazy 模式下，change 事件觸發 update:modelValue
      if (mods.lazy) {
        this.$emit("update:modelValue", val);
      }
      this.$emit("change", val);
    },
    onEnter(evt) {
      const raw = evt && evt.target ? evt.target.value : this.$refs.textarea?.value;
      const val = this.normalize(raw);
      this.$emit("enter", val);
    },
    focus() {
      this.$refs.textarea?.focus();
    },
    blur() {
      this.$refs.textarea?.blur();
    }
  },
  mounted() {}
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
