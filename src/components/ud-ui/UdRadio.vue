<template>
  <div class="ud-radio" :class="{ 'is-flex': flex }" role="radiogroup">
    <label v-for="option in options" :key="option[valueBy]" :class="{ 'is-disabled': option.disabled }">
      <input
        ref="radio"
        type="radio"
        v-model="value"
        v-bind="$attrs"
        :name="groupName"
        :value="normalizeValue(option[valueBy])"
        :disabled="option.disabled"
        @change="onChange"
        :aria-checked="value === normalizeValue(option[valueBy])"
        role="radio"
      />
      <div class="radio-decorator" :style="{ 'border-radius': radius }"></div>
      <p>{{ option[labelBy] }}</p>
    </label>
  </div>
</template>

<script>
export default {
  name: "UdRadio",
  inheritAttrs: false,
  props: {
    modelValue: { default: null }, // 綁定值
    options: { type: Array, default: () => [] }, // 選項[object]
    flex: { type: Boolean, default: false }, // 是否並排
    radius: { type: String, default: "50px" }, // 圓角
    labelBy: { type: String, default: "label" }, // label替代值
    valueBy: { type: String, default: "value" }, // value替代值
    // 將 option 的值轉型，避免嚴格等於造成比對失敗
    // 可為 'string' | 'number' | (val:any)=>any
    valueType: { type: [String, Function], default: null }
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      }
    },
    groupName() {
      // 若外部未提供 name，為本組 radio 生成唯一名稱，避免與其它組衝突
      return this.$attrs.name || this._uidName;
    }
  },
  data() {
    return {
      _uidName: `ud-radio-${Math.random().toString(36).slice(2, 8)}`
    };
  },
  methods: {
    normalizeValue(val) {
      if (this.valueType === "number") return typeof val === "number" ? val : Number(val);
      if (this.valueType === "string") return val != null ? String(val) : "";
      if (typeof this.valueType === "function") return this.valueType(val);
      return val;
    },
    onChange(evt) {
      this.$mitt && this.$mitt.emit && this.$mitt.emit("validate"); // 通知FormItem校驗
      const current = evt && evt.target ? evt.target.value : this.modelValue;
      this.$emit("change", this.normalizeValue(current));
    }
  }
};
</script>

<style lang="sass" scoped>
.ud-radio
  &.is-flex
    display: flex
    flex-wrap: wrap
    align-items: center
    label
      margin: 0 12px 0 0
  label
    margin-bottom: 5px
    cursor: pointer
    display: flex
    align-items: center
    &.is-disabled
      p
        color: #ccc
      .radio-decorator
        border: 1px solid #e3e3e3
        background-color: #f3f3f3
    p
      font-size: 15px
      line-height: 20px
    input
      position: absolute
      left: -999px
      opacity: 0
      pointer-events: none
      &:checked + .radio-decorator
        border-color: #000
        &:before
          background-color: #000
    .radio-decorator
      margin-right: 6px
      flex: 0 0 18px
      width: 18px
      height: 18px
      border-radius: 3px
      border: 1px solid #ccc
      position: relative
      cursor: pointer
      background-color: #fff
      &::before
        content: ""
        display: block
        border-radius: 1em
        background-size: contain
        background-position: 100%
        width: 50%
        height: 50%
        box-sizing: border-box
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%,-50%)
</style>
