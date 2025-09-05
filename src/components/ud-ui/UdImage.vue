<template>
  <div class="ud-image">
    <div class="ud-image-bg" :style="{
      backgroundImage: `url(${currentSrc})`,
      paddingBottom: height + '%',
      borderRadius: radius,
      backgroundSize: bgSize
    }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import avatarDefault from '@/assets/images/picture/default.jpg'

export default {
  name: 'UdImage',
  props: {
    src: { type: String, default: avatarDefault }, // 背景圖片
    height: { type: Number, default: 100 }, // 高度比例
    radius: { type: String, default: "0px" }, // 圓角
    bgSize: { type: String, default: "cover" }, // 背景尺寸 [cover, contain, 100%...等]
  },
  data() {
    return {
      avatarDefault,
      currentSrc: avatarDefault
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(val) {
        this.loadImage(val)
      }
    }
  },
  methods: {
    loadImage(src) {
      if (!src) {
        this.currentSrc = this.avatarDefault;
        return;
      }
      // 處理 "@/assets/..." 開頭路徑
      let resolved = src.startsWith('@/assets')
        ? (() => {
            try {
              return new URL(src.replace('@/', '/src/'), import.meta.url).href;
            } catch {
              return this.avatarDefault;
            }
          })()
        : src

      const img = new Image();
      img.src = resolved;
      img.onload = () => { this.currentSrc = resolved };
      img.onerror = () => { this.currentSrc = this.avatarDefault };
    }
  }
}
</script>

<style lang="sass" scoped>
.ud-image
  .ud-image-bg
    overflow: hidden
    width: 100%
    padding-bottom: 100%
    height: 0
    background: url('') no-repeat center center
    background-size: cover
    background-color: #e3e3e3
</style>
