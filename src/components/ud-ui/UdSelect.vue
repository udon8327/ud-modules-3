<template>
  <div class="ud-select">
    <select
      ref="select"
      v-model="value"
      v-bind="$attrs"
      :data-placeholder-selected="isEmpty"
      :class="{ hasValue: !isEmpty }"
      @change="onChange"
    >
      <option v-if="!isMultiple" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in optionsArr" :value="option[valueBy]" :key="option[valueBy]" :disabled="option.disabled">
        {{ combine ? option[valueBy] : option[labelBy] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "UdSelect",
  inheritAttrs: false,
  props: {
    modelValue: { default: null }, // 綁定值
    options: {
      // 選項
      type: Array,
      default: () => [{ label: "", value: "", disabled: true }]
    },
    placeholder: { type: String, default: "請選擇一項" }, // 取代文字
    combine: { type: Boolean, default: false }, // 使用value做為label
    center: { type: Boolean, default: false }, // 是否置中
    group: { type: [String, Number, Array], default: "" }, // 是否群組
    index: { type: Number, default: 0 }, // 群組索引
    labelBy: { type: String, default: "label" }, // label替代值
    valueBy: { type: String, default: "value" }, // value替代值
    childrenBy: { type: String, default: "children" } // children替代值
  },
  data() {
    return {
      groupWatch: []
    };
  },
  computed: {
    isMultiple() {
      return Boolean(this.$attrs && this.$attrs.multiple !== undefined);
    },
    isEmpty() {
      const val = this.modelValue;
      if (val === null || val === undefined) return true;
      if (Array.isArray(val)) return val.length === 0;
      return String(val) === "";
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      }
    },
    optionsArr() {
      const groupArr = Array.isArray(this.group)
        ? this.group
        : this.group === null || this.group === undefined || this.group === ""
          ? []
          : [this.group];
      this.groupWatch = [...groupArr];
      let temp = this.options;
      if (this.index === 0) return temp;
      if (groupArr[this.index - 1]) {
        for (let i = 0; i < this.index; i++) {
          const currentValue = groupArr[i];
          const node = Array.isArray(temp) ? temp.find(option => option[this.valueBy] === currentValue) : undefined;
          if (!node || !node[this.childrenBy]) return [];
          temp = node[this.childrenBy];
        }
        return temp;
      }
      return [];
    }
  },
  watch: {
    groupWatch(newVal, oldVal) {
      let target;
      for (let i = 0; i < this.group.length; i++) {
        if (newVal[i] !== oldVal[i]) target = i;
      }
      if (target !== undefined && this.index > target) {
        this.$emit("update:modelValue", this.isMultiple ? [] : "");
      }
    }
  },
  mounted() {
    if (this.center) this.centerSelect();
    if (this.center) window.addEventListener("resize", this.centerSelect);
  },
  unmounted() {
    if (this.center) window.removeEventListener("resize", this.centerSelect);
  },
  methods: {
    onChange() {
      if (this.center) this.centerSelect();
      this.$mitt.emit("validate"); // 通知FormItem校驗
      this.$emit("change", this.$refs.select.value);
    },
    getTextWidth(text, target) {
      let el = document.createElement("span");
      let fontSize = window.getComputedStyle(target).fontSize || "14px";
      el.textContent = text;
      el.style.display = "inline-block";
      el.style.fontSize = fontSize;
      document.body.appendChild(el);
      let elmWidth = el.offsetWidth;
      el.remove();
      return elmWidth;
    },
    centerSelect() {
      let el = this.$refs.select;
      let text = "";
      if (el.value) {
        const match = Array.isArray(this.options) ? this.options.find(item => item[this.valueBy] == el.value) : null;
        if (match) {
          text = this.combine ? match[this.valueBy] : match[this.labelBy];
        } else {
          text = this.placeholder;
        }
      } else {
        text = this.placeholder;
      }
      let emptySpace = el.offsetWidth - this.getTextWidth(text, el);
      el.style.textIndent = `${emptySpace / 2 - 10}px`;
    }
  }
};
</script>

<style lang="sass" scoped>
.ud-select
  position: relative
  flex: 1 1 0
  &:before
    content: ""
    width: 0
    height: 0
    border-color: #ccc transparent transparent
    border-style: solid
    border-width: 4px 4px 0
    top: 50%
    margin-top: -2px
    right: 8px
    position: absolute
    z-index: 1
    pointer-events: none
  select
    appearance: none
    width: 100%
    padding: 5px 10px
    min-height: 40px
    font-size: 14px
    border: 1px solid #ccc
    border-radius: 4px
    background-color: #fff
    transition: all 0.2s ease
    transition-property: border
    cursor: pointer
    &.hasValue
      &[data-placeholder-selected]
        color: #000
    option
      color: #000
    &:focus
      outline: 0
      border: 1px solid #000
    &[data-placeholder-selected]
      color: #aaa
    &[multiple]
      option:nth-of-type(1)
        color: #aaa
</style>
