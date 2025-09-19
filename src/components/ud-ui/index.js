/*
==================== ud-modules 常用組件 ====================
Form
  ud-button：按鈕 (ok AI)
  ud-input：輸入框 (ok AI)
  ud-textarea：多行輸入框 (ok AI)
  ud-radio：單選框 (ok AI)
  ud-checkbox：多選框 (ok AI)
  ud-select：下拉框 (ok AI)
  ud-select-date：日期連動下拉框 (ok AI)
  ud-select-twzip：台灣行政區連動下拉框 (ok AI)
  ud-switch：開關 (ok AI)
  ud-form-item：表單驗證容器 (ok AI)
  ud-form：表單驗證 (ok AI)

Layout
  ud-arrow：CSS箭頭 (ok AI)
  ud-collapse：摺疊容器 (ok)
  ud-image：等比例自適應圖片 (ok)

Notice
  ud-alert：警告彈窗 (ok)
  ud-modal：通用彈窗 (ok)
  ud-loading：載入中 (ok)

Tools
  ud-html：用戶自定義訊息 (ok)
  ud-ellipsis：文字省略 (ok)
  ud-countdown：倒數計時 (ok)
*/

import { createVNode, render } from "vue";
import udAxios from "@/services/ud-axios";
import * as udUtils from "@/utils/ud-utils";

import UdAlert from "./UdAlert.vue";
import UdArrow from "./UdArrow.vue";
import UdButton from "./UdButton.vue";
import UdCheckbox from "./UdCheckbox.vue";
import UdCollapse from "./UdCollapse.vue";
import UdCountdown from "./UdCountdown.vue";
import UdEllipsis from "./UdEllipsis.vue";
import UdForm from "./UdForm.vue";
import UdFormItem from "./UdFormItem.vue";
import UdHtml from "./UdHtml.vue";
import UdImage from "./UdImage.vue";
import UdInput from "./UdInput.vue";
import UdLoading from "./UdLoading.vue";
import UdModal from "./UdModal.vue";
import UdRadio from "./UdRadio.vue";
import UdSelect from "./UdSelect.vue";
import UdSelectDate from "./UdSelectDate.vue";
import UdSelectTwzip from "./UdSelectTwzip.vue";
import UdSwitch from "./UdSwitch.vue";
import UdTextarea from "./UdTextarea.vue";

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
  UdTextarea
];

// 組件呼叫方法
// udAlert
const udAlert = options => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const props = typeof options === "string" ? { message: options } : options;
  const vnode = createVNode(UdAlert, props);

  render(vnode, container);
  const instance = vnode.component?.proxy;

  if (!instance) return;

  const originalDestroy = instance.destroy;
  instance.destroy = (...args) => {
    originalDestroy?.(...args);
    render(null, container);
    container.parentNode?.removeChild(container);
  };

  return instance.show?.();
};
export { udAlert };

// udLoading
const udLoading = {
  instance: null,
  container: null,
  open(options = {}) {
    // 如果已經有實例就先關掉，避免重複掛載
    if (this.instance) {
      this.close();
    }
    this.container = document.createElement("div");
    document.body.appendChild(this.container);

    const vnode = createVNode(UdLoading, options);
    render(vnode, this.container);

    this.instance = vnode.component?.proxy;
  },
  close() {
    if (this.container) {
      render(null, this.container);
      document.body.removeChild(this.container);
      this.container = null;
      this.instance = null;
    }
  }
};
export { udLoading };

// ud-ui插件註冊方法
const install = app => {
  Object.keys(udUtils).forEach(item => (app.config.globalProperties[item] = udUtils[item]));
  udComponents.forEach(item => app.component(item.name, item));
  app.config.globalProperties.udAxios = udAxios;
  app.config.globalProperties.udAlert = udAlert;
  app.config.globalProperties.udLoading = udLoading;
};

export default install;
