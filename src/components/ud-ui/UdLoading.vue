<template>
  <transition name="loading">
    <div
      class="ud-loading"
      v-show="isShow"
      :class="{ 'theme-white': theme === 'white' }"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="ud-modal-wrapper">
        <div class="ud-modal-content">
          <div class="ud-modal-header">
            <div v-if="iconType === 'css'" class="icon-css"></div>
            <i v-else-if="iconType === 'font'" class="icon-font" :class="iconFont"></i>
            <img v-else class="icon-img" :src="iconImg" />
          </div>
          <div class="ud-modal-body">
            <p v-html="nl2br(displayMessage)"></p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { nl2br } from "@/utils/ud-utils";

export default {
  name: "UdLoading",
  props: {
    fixed: { type: Boolean, default: true }, // 是否固定body
    theme: { type: String, default: "" }, // 戴入主題 [white]
    iconType: { type: String, default: "css" }, // icon類型 [css:CSS, font:字型, img:圖片]
    iconFont: { type: String, default: "fas fa-spinner fa-pulse" }, // 字型icon的class
    iconImg: {
      type: String,
      default: "https://image.flaticon.com/icons/svg/553/553265.svg"
    }, // 圖片icon的路徑
    message: { type: String, default: "" }, // 載入訊息 (功能同msg，接受html語法)
    msg: { type: String, default: "" } // 載入訊息 (功能同message，接受html語法)
  },
  data() {
    return {
      isShow: false,
      _prevOverflowY: "",
      _locked: false
    };
  },
  computed: {
    displayMessage() {
      return this.message === "" ? this.msg : this.message;
    }
  },
  mounted() {
    this.isShow = true;
    if (this.fixed && typeof document !== "undefined") {
      this._prevOverflowY = document.body.style.overflowY || "";
      document.body.style.overflowY = "hidden";
      this._locked = true;
    }
  },
  unmounted() {
    if (this._locked && typeof document !== "undefined") {
      document.body.style.overflowY = this._prevOverflowY;
      this._locked = false;
    }
  },
  methods: {
    nl2br(val) {
      return nl2br(val);
    }
  }
};
</script>

<style lang="sass" scoped>
.ud-loading
  position: fixed
  z-index: 140
  left: 0
  top: 0
  width: 100%
  height: 100%
  overflow: auto
  background-color: rgba(0,0,0,0.5)
  &.theme-white
    background-color: rgba(255,255,255,0.5)
    .ud-modal-wrapper
      .ud-modal-content
        .ud-modal-header
          .icon-css
            border: 3px solid rgba(#000, 0.2)
            border-top: 3px solid #000
          i
            color: #666
        .ud-modal-body
          p
            color: #666
  .ud-modal-wrapper
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    .ud-modal-content
      .ud-modal-header
        text-align: center
        margin-bottom: 5px
        display: flex
        justify-content: center
        .icon-css
          border: 3px solid rgba(#fff, 0.2)
          border-top: 3px solid #fff
          border-radius: 50%
          width: 32px
          height: 32px
          animation: spin .5s linear infinite
          @keyframes spin
            0%
              transform: rotate(0deg)
            100%
              transform: rotate(360deg)
        .icon-font
          font-size: 24px
          color: #999
        .icon-img
          max-width: 32px
          margin-bottom: 5px
          animation: spin 2s linear infinite
          @keyframes spin
            0%
              transform: rotate(0deg)
            100%
              transform: rotate(360deg)
      .ud-modal-body
        p
          font-size: 16px
          color: #999
</style>
