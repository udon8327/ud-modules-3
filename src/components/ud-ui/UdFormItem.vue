<template>
  <div class="ud-form-item" :class="{'is-error': errorMessage, 'is-flex': flex}">
    <div class="ud-form-item-left" :v-if="label" :style="{ 'flex-basis': labelWidth }"
      :class="{ 'label-align-left': labelAlign === 'left', 'label-align-center': labelAlign === 'center', 'label-align-right': labelAlign === 'right' }"
    >
      <img :src="icon" v-if="icon">
      <label v-if="label" :style="{ 'text-align': labelAlign }"><span v-if="required">*</span>{{ label }}</label>
    </div>
    <div class="ud-form-item-right">
      <slot></slot>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UdFormItem',
  data() {
    return {
      errorMessage: '',
      lock: false,
    }
  },
  inject: ['registerFormItem', 'unregisterFormItem', 'form'],
  props: {
    required: { // 必填提示
      type: Boolean,
    },
    icon: { // icon路徑
      type: String
    },
    label: { // 標籤內容
      type: String,
    },
    prop: { // 驗證名稱
      type: String
    },
    flex: { // 是否並排
      type: Boolean
    },
    labelWidth: { // 標籤寬度
      type: String,
      default: "30%",
    },
    labelAlign: { // 標籤對齊
      type: String,
      default: 'left',
    },
  },
  mounted() {
    this.registerFormItem(this);
    this.validateHandler = () => {
      if (!this.prop) return;
      this.validate(false);
    };
    this.$mitt.on("validate", this.validateHandler);
  },
  beforeUnmount() {
    this.unregisterFormItem(this);
    this.$mitt.off("validate", this.validateHandler);
  },
  methods: {
    validate(submit) {
      if (this.form.submitLock) return;
      const rules = this.form.rules[this.prop]; // 獲取校驗規則
      const value = this.form.model[this.prop]; // 獲取數據

      if (!rules) return;
      this.errorMessage = '';
      for (let rule of rules) {
        console.log('rule: ', rule);
        switch (rule.type) {
          case "required": // 必填驗證
            if (Array.isArray(value) && value.length != 0) {
              if (value.some(i => i.length === 0)) this.errorMessage = rule.message || "此欄位為必填項目";
            } else if (value === null) {
              this.errorMessage = rule.message || "此欄位為必填項目";
            } else {
              if (value.length === 0 || value === false) this.errorMessage = rule.message || "此欄位為必填項目";
            }
            break;
          case "name": // 姓名驗證
            if(value && !/^[\p{sc=Han}a-zA-Z·\s]+$/u.test(value)) this.errorMessage = rule.message || "姓名格式有誤，不接受特殊符號";
            break;
          case "phone": // 電話驗證
            let valueAfter = this.typeOf(value) === 'array' ? value.join("") : value;
            if(valueAfter && !/^09[0-9]{8}$/.test(valueAfter)) this.errorMessage = rule.message || "電話格式有誤，例: 0929123456";
            break;
          case "email": // 電子郵件驗證
            if(value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) this.errorMessage = rule.message || "Email格式有誤，需包含'@'符號";
            break;
          case "uniform": // 統一編號驗證
            if(value && !/^[0-9]{8}$/.test(value)) this.errorMessage = rule.message || "統一編號格式有誤，例: 12345678";
            break;
          case "idcard": // 身分證字號驗證
            if(value && !/^[A-Z](1|2)[0-9]{8}$/.test(value)) this.errorMessage = rule.message || "身分證字號格式有誤，例: A123456789";
            break;
          case "date": // 日期驗證
            if(value && !/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(value)) this.errorMessage = rule.message || "日期格式有誤或不存在，例: 2020-03-04";
            break;
          case "number": // 數字驗證
            if(value && !/^[0-9]+$/.test(value)) this.errorMessage = rule.message || "格式有誤，只接受數字";
            break;
          case "url": // 網址驗證
            if(value && !/^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([/?#][^\s]*)?$/i.test(value)) this.errorMessage = rule.message || "網址格式有誤，例: https://www.google.com";
            break;
          case "ip": // IP地址驗證
            if(value && !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) this.errorMessage = rule.message || "IP地址格式有誤，例: 115.28.47.26";
            break;
          case "hex": // Hex色碼驗證
            if(value && !/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value)) this.errorMessage = rule.message || "Hex色碼格式有誤，例: #ff0000";
            break;
          case "equal": // 相等驗證
            if(rule.caseIgnore){ // 不區分大小寫
              if(value && value.toLowerCase() !== this.form.model[rule.equalTo].toLowerCase()) this.errorMessage = rule.message || "驗證碼錯誤";
            }else{ // 區分大小寫
              if(value && value !== this.form.model[rule.equalTo]) this.errorMessage = rule.message || "驗證碼錯誤";
            }
            break;
          case "schema": // 自定義驗證條件(將rules寫成computed回傳動態驗證函式)
            if (!rule.schema) this.errorMessage = rule.message || "驗證條件不符合";
            break;
          case "regex": // 自訂正則驗證
            if(!new RegExp(rule.regex).test(value)) this.errorMessage = rule.message || "格式有誤，請重新輸入";
            break;
          default:
            console.error("預期外的驗證類型: " + rule.type);
            break;
        }
        if (this.errorMessage) break;
      }

      if (!submit) return;
      return new Promise((resolve, reject) => {
        this.errorMessage ? reject() : resolve();
      });
    },
    clearValidate() {
      this.errorMessage = '';
    },
    typeOf(val) {
      return val === undefined ? 'undefined' : val === null ? 'null' : val.constructor.name.toLowerCase();
    },
  }
}
</script>

<style lang="sass" scoped>
.ud-form-item
  margin-bottom: 18px
  &.is-flex
    display: flex
    .ud-form-item-left
      flex: 0 0 30%
      padding: 0 3px
      text-align: left
      display: flex
      align-items: center
      &.label-align-left
        justify-content: flex-start
      &.label-align-center
        justify-content: center
      &.label-align-right
        justify-content: flex-end
      img
        width: 26px
        margin-right: 2px
      label
        font-size: 16px
        position: relative
        margin-right: 5px
        span
          color: $red
          font-size: 20px
          position: absolute
          left: -10px
          top: 64%
          transform: translate(0% ,-50%)
    .ud-form-item-right
      flex: 1 1 0
  &.is-error
    .ud-form-item-right
      position: relative
      ::v-deep(>div)
        input,textarea,select
          border: 1px solid $red
          &:focus
            border: 1px solid $red
      >p.error-message
        color: $red
        font-size: 12px
        position: absolute
        left: 5px
        white-space: nowrap
</style>
