<template>
  <transition name="fade">
    <div class="ud-alert" v-if="isShow" @click.self="maskHandler">
      <div class="ud-modal-wrapper">
        <div class="ud-modal-close" v-if="btnClose" @click="destroy">
          <i class="icon-close"></i>
        </div>
        <div class="ud-modal-header" v-if="title">
          <p v-html="nl2br(title)"></p>
        </div>
        <div class="ud-modal-body">
          <p v-html="nl2br(displayMessage)"></p>
        </div>
        <div class="ud-modal-footer">
          <ud-button @click="cancelHandler" plain v-if="confirm">{{ cancelText }}</ud-button>
          <ud-button @click="confirmHandler">{{ confirmText }}</ud-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { nl2br } from '@/utils/ud-utils'
import UdButton from './UdButton.vue'
import { render, createVNode } from 'vue'

export default {
  name: 'UdAlert',
  components: { UdButton },
  props: {
    confirm: { type: Boolean, default: false }, // 是否有確認+取消鈕
    maskClose: { type: Boolean, default: false }, // 點擊遮罩關閉
    btnClose: { type: Boolean, default: false }, // 右上關閉按鈕
    scrollLock: { type: Boolean, default: true }, // 是否鎖定背景頁面捲動
    title: { type: String, default: "" }, // 標題文字
    message: { type: String, default: "" }, // 訊息文字 (功能同msg，接受html語法)
    msg: { type: String, default: "" }, // 訊息文字 (功能同message，接受html語法)
    cancelText: { type: String, default: "取消" }, // 取消鈕文字
    onCancel: { type: Function, default: () => {} }, // 取消鈕callback
    confirmText: { type: String, default: "確定" }, // 確認鈕文字
    onConfirm: { type: Function, default: () => {} }, // 確認鈕callback
  },
  data() {
    return {
      isShow: false, // 是否顯示
      resolve: null, // 保存resolve
      reject: null, // 保存reject
    }
  },
  computed: {
    displayMessage() {
      return this.message === "" ? this.msg : this.message;
    }
  },
  mounted() {
    if(this.scrollLock) document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
  },
  methods: {
    show() {
      this.isShow = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      })
    },
    nl2br(val) {
      return nl2br(val);
    },
    confirmHandler() {
      this.onConfirm();
      this.resolve('confirm');
      this.destroy();
    },
    cancelHandler() {
      this.onCancel();
      this.reject('cancel');
      this.destroy();
    },
    maskHandler() {
      if (this.maskClose) this.destroy();
    },
    destroy() {
      this.isShow = false;
      if (this.scrollLock) document.body.style.overflowY = 'auto';
      // 卸載 vnode
      if (this.$el && this.$el.parentNode) {
        render(null, this.$el.parentNode);
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-alert
  position: fixed
  z-index: 120
  left: 0
  top: 0
  right: 0
  bottom: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center
  overflow-x: hidden
  .ud-modal-wrapper
    position: relative
    padding: 15px
    width: 90%
    max-width: 400px
    max-height: 88%
    background-color: #fff
    box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.3)
    text-align: center
    display: flex
    flex-direction: column
    p
      font-size: 16px
      margin-bottom: 0
      color: #333
    .modal-close
      position: absolute
      width: 26px
      height: 26px
      right: 4px
      top: -32px
      cursor: pointer
      &:hover
        .icon-close
          opacity: 1
      .icon-close
        opacity: 0.75
        transition: all 0.2s ease
        &:before, &:after
          position: absolute
          left: 13px
          content: ''
          height: 26px
          width: 2px
          background-color: #fff
        &:before
          transform: rotate(45deg)
        &:after
          transform: rotate(-45deg)
    .ud-modal-header
      flex: 0 0 auto
      padding: 0 0 15px 0
      p
        font-size: 18px
        font-weight: bold
    .ud-modal-body
      flex: 1 1 auto
      padding: 5px 15px
      margin: 0 -15px
      overflow-y: auto
    .ud-modal-footer
      flex: 0 0 auto
      padding: 15px 0 0 0
      display: flex
      justify-content: center
      align-items: center
      .ud-button
        flex: 1 1 50%
        max-width: 50%
      >.ud-button + .ud-button
        margin-left: 15px
</style>
