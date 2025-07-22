<template lang="pug">
#demo
  .button-area.mb-3
    .button-wrapper
      ud-button(@click="test") TEST
      ud-button(@click="isNameShow = !isNameShow") toggleName

  ud-form(:rules="rules" :model="formData" ref="form")
    ud-form-item(label="姓名" prop="name" flex v-if="isNameShow")
      ud-input(placeholder="請輸入您的姓名" v-model="formData.name" @keydown="onInput" maxlength="10")
    ud-form-item(label="電話" prop="phone" flex)
      ud-input(v-model.trim="formData.phone" placeholder="請輸入您的手機號碼" inputmode="tel" maxlength="10")
    ud-form-item(label="Email" prop="email" flex)
      ud-input(v-model.trim="formData.email" placeholder="請輸入您的Email" inputmode="email")
    ud-form-item(label="年齡" prop="age" flex) 
      ud-input(placeholder="請輸入您的年齡" v-model.number="formData.age" type="tel")
    ud-form-item(label="備註" prop="note" flex)
      ud-textarea(placeholder="請輸入您的備註" v-model="formData.note" show-limit :limit="10" no-resize)
    ud-form-item(label="單選" prop="radio" flex)
      ud-radio(v-model="formData.radio" :options="options" flex @change="onChange" @blur="onBlur" @focus="onFocus")
    ud-form-item(label="多選" prop="checkbox" flex)
      ud-checkbox(v-model="formData.checkbox" :options="options" flex @change="onChange" @blur="onBlur" @focus="onFocus")
    ud-form-item(label="下拉" prop="select" flex)
      ud-select(v-model="formData.select" :options="options" flex)
    ud-form-item(label="下拉連動" prop="selectGroup" flex)
      .d-flex
        ud-select(v-model="formData.selectGroup[0]" :options="storeOptions" :group="formData.selectGroup" :index="0" placeholder="請選擇縣市")
        ud-select(v-model="formData.selectGroup[1]" :options="storeOptions" :group="formData.selectGroup" :index="1" placeholder="請選擇店點")
        ud-select(v-model="formData.selectGroup[2]" :options="storeOptions" :group="formData.selectGroup" :index="2" placeholder="請選擇日期")
    ud-form-item(label="地址" prop="twzip" flex)
      ud-select-twzip(ref="zip" v-model="formData.twzip" flex)
    ud-form-item(label="預約日期" prop="date" flex)
      ud-select-date(v-model="formData.date" flex third roc)
        p 年
        p(slot="second") 月
        p(slot="third") 日
    ud-form-item(label="是否啟用" prop="isActive" flex)
      ud-switch(v-model="formData.isActive")
    ud-form-item(label="" prop="isAgree")
      ud-checkbox(v-model="formData.isAgree")
        p 我同意#[a(href="https://www.google.com.tw/") 使用者條款]

    .button-wrapper
      ud-button.mb-5(@click="clearVerify" plain) 清除驗證
      ud-button.mb-2(@click="formSubmit") 送出表單
    .button-wrapper
      ud-button.mb-2(@click="alert()") Alert
      ud-button.mb-2(@click="isModalShow = true") Model
    ud-button.mb-2(@click="isCollapse = !isCollapse") 摺疊容器&nbsp
      ud-arrow(color="#fff" :size="4" :width="2" :direction="isCollapse ? 'up' : 'down'")
    ud-collapse.mb-2(v-model="isCollapse" :duration="0.4")
      ud-image(src="img/01.jpg" bg-size="contain")

    ud-html
    br
    ud-ellipsis(:max-line="2") 文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略
    br
    ud-countdown(ref="countdown" :time="120" @timeup="timeup()" delay)
    .button-wrapper
      ud-button(@click="$refs.countdown.reset()" plain) 重置倒數
      ud-button(@click="$refs.countdown.countdown()") 開始倒數
</template>

<script>

export default {
  name: "Demo",
  components: {},
  data() {
    return {
      isModalShow: false,
      isCollapse: false,
      isNameShow: true,
      formData: {
        name: "",
        phone: "",
        email: "",
        age: "",
        note: "",
        radio: "",
        checkbox: [],
        select: "",
        selectGroup: ["", "", ""],
        twzip: ["", ""],
        date: ["", "", ""],
        isActive: false,
        isAgree: false,
      },
      rules: {
        name: [{type: "required"}, {type: "name"}],
        phone: [{type: "required"}, {type: "phone"}],
        email: [{type: "required"}, {type: "email"}],
        age: [{type: "required"}, {type: "number"}],
        radio: [{type: "required"}],
        checkbox: [{type: "required"}],
        select: [{type: "required"}],
        selectGroup: [{type: "required"}],
        twzip: [{type: "required"}],
        date: [{type: "required"}],
        isAgree: [{type: "required", message: "請先同意相關使用條款"},],
      },
      options: [
        {label: "甲", value: "a"},
        {label: "乙", value: "b"},
        {label: "丙", value: "c", disabled: true},
      ],
      storeOptions: [
        {label: "台北市", value: "taipei", children: [
          {label: "中正區", value: "100", children: [
            {label: "2023-12-01", value: "1" },
            {label: "2023-12-02", value: "2", disabled: "true" }
          ]},
          {label: "大安區", value: "106", disabled: true, children: [
            {label: "2023-12-03", value: "3" },
            {label: "2023-12-04", value: "4" },
          ]},
          {label: "信義區", value: "110", children: [
            {label: "2023-12-05", value: "5" },
            {label: "2023-12-06", value: "6" },
          ]},
        ]},
        {label: "新北市", value: "newTaipei", children: [
          {label: "板橋區", value: "220", children: [
            {label: "2023-12-07", value: "7" },
            {label: "2023-12-08", value: "8" },
          ]},
          {label: "永和區", value: "234", children: [
            {label: "2023-12-09", value: "9" },
            {label: "2023-12-10", value: "10", disabled: true },
          ]},
          {label: "新店區", value: "231", children: [
            {label: "2023-12-11", value: "11", disabled: true },
            {label: "2023-12-12", value: "12", disabled: true },
          ]},
        ]},
      ],
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    test(e) {
      // console.log('e: ', e);
      console.log(this.getRandom());
    },
    formSubmit() {
      this.$refs.form.validate(() => {
        this.udAlert("驗證成功!!");
      });
    },
    clearVerify() {
      this.$refs.form.clearValidate();
    },
    alert() {
      this.udAlert("Alert！");
    },
    timeup() {
      console.log('timeup');
    },
    onInput(e) {
      console.log('onInput', e);
    },
    onChange(e) {
      console.log("onChange", e); 
    },
    onBlur(e) {
      console.log("onBlur", e); 
    },
    onFocus(e) {
      console.log("onFocus", e); 
    },
  },
};
</script>

<style lang="sass" scoped>
.button-wrapper
  display: flex
  justify-content: space-between
  margin-bottom: 10px
  gap: 5px
  .ud-button
    flex: 1 1 0
</style>