<template>
  <div class="ud-switch">
    <label :class="{ 'is-disabled': disabled }">
      <input
        type="checkbox"
        :checked="value"
        v-bind="$attrs"
        :disabled="disabled"
        role="switch"
        :aria-checked="value"
        :aria-disabled="disabled"
        @change="onChange"
      />
      <div class="switch-decorator">
        <div class="circle"></div>
      </div>
      <p><slot>開關</slot></p>
    </label>
  </div>
</template>

<script>
export default {
  name: "UdSwitch",
  inheritAttrs: false,
  props: {
    modelValue: { default: null }, // 綁定值（可為任意型別，透過 activeValue/inactiveValue 映射）
    disabled: { type: Boolean, default: false },
    activeValue: { default: true },
    inactiveValue: { default: false }
  },
  computed: {
    value: {
      get() {
        return this.modelValue === this.activeValue;
      },
      set(val) {
        const next = val ? this.activeValue : this.inactiveValue;
        this.$emit("update:modelValue", next);
      }
    }
  },
  methods: {
    onChange(evt) {
      this.$mitt && this.$mitt.emit && this.$mitt.emit("validate"); // 通知FormItem校驗
      const checked = evt && evt.target ? !!evt.target.checked : this.value;
      const out = checked ? this.activeValue : this.inactiveValue;
      this.$emit("update:modelValue", out);
      this.$emit("change", out);
    }
  }
};
</script>

<style lang="sass" scoped>
.ud-switch
  label
    cursor: pointer
    display: flex
    align-items: center
    &.is-disabled
      cursor: not-allowed
      p
        color: #ccc
      .switch-decorator
        background: #eee
        border: 1px solid #e3e3e3
    input
      position: absolute
      left: -999px
      opacity: 0
      pointer-events: none
      &:checked + .switch-decorator
        background: #000
        .circle
          margin-left: 20px
    .switch-decorator
      width: 40px
      height: 20px
      border-radius: 20px
      background: #ccc
      transition: all .2s ease
      padding-left: 2px
      margin-right: 6px
      display: flex
      align-items: center
      .circle
        width: 16px
        height: 16px
        border-radius: 50%
        background: #f7f7f7
        transition: all .2s ease
</style>
