<template>
  <div class="ud-select-date" :class="{ 'is-flex': flex }">
    <ud-select
      :modelValue="value[0]"
      @update:modelValue="onPartChange(0, $event)"
      :options="firstArr"
      :placeholder="placeholder[0]"
      combine
      @validate="validate"
    ></ud-select>
    <slot></slot>
    <ud-select
      :modelValue="value[1]"
      @update:modelValue="onPartChange(1, $event)"
      :options="secondArr"
      :placeholder="placeholder[1]"
      combine
      @validate="validate"
    ></ud-select>
    <slot name="second"></slot>
    <ud-select
      :modelValue="value[2]"
      @update:modelValue="onPartChange(2, $event)"
      :options="thirdArr"
      :placeholder="placeholder[2]"
      combine
      v-if="third"
      @validate="validate"
    ></ud-select>
    <slot name="third"></slot>
  </div>
</template>

<script>
export default {
  name: "UdSelectDate",
  props: {
    modelValue: { default: null }, // 綁定值
    placeholder: {
      // placeholder值
      type: Array,
      default: () => ["年", "月", "日"]
    },
    third: { type: Boolean, default: false }, // 是否有第三項
    flex: { type: Boolean, default: false }, // 是否並排
    roc: { type: Boolean, default: false } // 是否為民國年
  },
  computed: {
    value() {
      if (Array.isArray(this.modelValue)) {
        const arr = this.modelValue.slice(0, 3);
        while (arr.length < 3) arr.push("");
        return arr;
      }
      return ["", "", ""];
    },
    firstValue() {
      return this.value[0];
    },
    secondValue() {
      return this.value[1];
    },
    thirdValue() {
      return this.value[2];
    },
    firstArr() {
      let temp = [];
      let time = new Date();
      let year = time.getFullYear();
      if (this.roc) year = year - 1911;
      let yearAfter = year - 120;
      if (this.roc && yearAfter <= 0) yearAfter = 1;
      for (let i = year; i >= yearAfter; i--) {
        temp.push({ value: i });
      }
      return temp;
    },
    secondArr() {
      let temp = [];
      if (this.firstValue !== "" && this.firstValue !== null && this.firstValue !== undefined) {
        for (let i = 1; i <= 12; i++) {
          temp.push({ value: i });
        }
      }
      return temp;
    },
    thirdArr() {
      let temp = [];
      if (this.firstValue && this.secondValue) {
        let year = parseInt(this.firstValue, 10);
        if (this.roc) year = year + 1911;
        const month = parseInt(this.secondValue, 10);
        if (!isNaN(year) && !isNaN(month)) {
          let date = new Date(year, month, 0).getDate();
          for (let i = 1; i <= date; i++) {
            temp.push({ value: i });
          }
        }
      }
      return temp;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    onPartChange(index, val) {
      const next = this.value.slice(0, 3);
      next[index] = val;
      if (index === 0) {
        next[1] = "";
        next[2] = "";
      } else if (index === 1 && this.third) {
        next[2] = "";
      }
      this.$emit("update:modelValue", next);
      this.validate();
    },
    validate() {
      this.$nextTick(() => {
        this.$mitt && this.$mitt.emit && this.$mitt.emit("validate"); // 通知FormItem校驗
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.ud-select-date
  margin-bottom: 0
  &.is-flex
    display: flex
    justify-content: center
    align-items: center
    ::v-deep(.ud-select)
      flex: 1 1 0
      margin: 0 5px 0 0
      &:last-of-type
        margin: 0
        + span,+ p
          margin: 0 5px
      + span,+ p
        margin: 0 5px 0 0
  .ud-select
    margin-bottom: 5px
</style>
