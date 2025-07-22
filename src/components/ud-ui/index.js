/*
==================== ud-modules 常用組件 ====================
Form
  ud-button：按鈕 (ok TODO：防抖模式)
  ud-input：輸入框 (ok)
  ud-textarea：多行輸入框 (ok)
  ud-radio：單選框 (ok)
  ud-checkbox：多選框 (ok TODO：單一框時的disabled處理)
  ud-select：下拉框 (ok TODO：連動功能bug)
  ud-select-date：日期連動下拉框 (ok)
  ud-select-twzip：台灣行政區連動下拉框 (ok)
  ud-switch：開關 (ok)
  ud-form-item：表單驗證容器 (ok)
  ud-form：表單驗證 (ok)

Layout
  ud-arrow：CSS箭頭
  ud-collapse：摺疊容器
  ud-image：等比例自適應圖片

Notice
  ud-alert：警告彈窗
  ud-modal：通用彈窗
  ud-loading：載入中

Tools
  ud-html：用戶自定義訊息 (ok)
  ud-ellipsis：文字省略 (ok)
  ud-countdown：倒數計時 (ok)
*/

// import udAxios from '@/services/ud-axios'
import * as udUtils from '@/utils/ud-utils'

import UdAlert from "./UdAlert.vue"
import UdArrow from "./UdArrow.vue"
import UdButton from "./UdButton.vue"
import UdCheckbox from "./UdCheckbox.vue"
import UdCollapse from "./UdCollapse.vue"
import UdCountdown from "./UdCountdown.vue"
import UdEllipsis from "./UdEllipsis.vue"
import UdForm from "./UdForm.vue"
import UdFormItem from "./UdFormItem.vue"
import UdHtml from "./UdHtml.vue"
import UdImage from "./UdImage.vue"
import UdInput from "./UdInput.vue"
import UdLoading from "./UdLoading.vue"
import UdModal from "./UdModal.vue"
import UdRadio from "./UdRadio.vue"
import UdSelect from "./UdSelect.vue"
import UdSelectDate from "./UdSelectDate.vue"
import UdSelectTwzip from "./UdSelectTwzip.vue"
import UdSwitch from "./UdSwitch.vue"
import UdTextarea from "./UdTextarea.vue"

// 組件註冊列表
const udComponents = [
  UdAlert,
  UdArrow,
  UdButton,
  UdCheckbox,
  UdCollapse,
  UdCountdown,
  UdEllipsis,
  UdForm,
  UdFormItem,
  UdHtml,
  UdImage,
  UdInput,
  UdLoading,
  UdModal,
  UdRadio,
  UdSelect,
  UdSelectDate,
  UdSelectTwzip,
  UdSwitch,
  UdTextarea,
]

// 組件呼叫方法
// const udAlertExtend = Vue.extend(UdAlert);
// const udAlert = options => {
//   let instance = new udAlertExtend();
//   typeof options === 'string' ? instance.msg = options : Object.assign(instance, options);
//   document.body.appendChild(instance.$mount().$el);
//   return instance.show();
// };
// export { udAlert }

// const udLoadingExtend = Vue.extend(UdLoading);
// const udLoading = {
//   instance: null,
//   open: (options = {}) => {
//     udLoading.instance = new udLoadingExtend({
//       el: document.createElement("div"),
//       data() { return options }
//     })
//     if(udLoading.instance.fixed) document.body.style.overflowY = 'hidden';
//     document.body.appendChild(udLoading.instance.$el);
//   },
//   close: () => udLoading.instance.destroy()
// };
// export { udLoading }

// ud-ui插件註冊方法
const install = (app) => {
  Object.keys(udUtils).forEach(item => app.config.globalProperties[item] = udUtils[item]);
  udComponents.forEach(item => app.component(item.name, item));
  // app.config.globalProperties.udAxios = udAxios;
  // app.config.globalProperties.udAlert = udAlert;
  // app.config.globalProperties.udLoading = udLoading;
}

export default install;