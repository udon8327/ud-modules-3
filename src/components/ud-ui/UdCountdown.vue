<template>
  <span class="ud-countdown" ref="count">{{ formatCountTime }}</span>
</template>

<script>
export default {
  name: "UdCountdown",
  props: {
    time: { type: Number, default: 60 }, // 倒數秒數
    delay: { type: Boolean, default: false }, // 是否不要立刻開始倒數
    type: { type: String, default: "second" } // 時間格式 [second|minute]
  },
  data() {
    return {
      countInterval: null,
      countTime: this.time
    };
  },
  computed: {
    formatCountTime() {
      if (this.type === "second") {
        return this.countTime;
      } else if (this.type === "minute") {
        let min = Math.floor(this.countTime / 60);
        let sec = this.countTime - min * 60;
        return `${min}:${this.padStart(sec)}`;
      }
      return this.countTime;
    }
  },
  mounted() {
    if (!this.delay) this.countdown();
  },
  beforeUnmount() {
    if (this.countInterval) clearInterval(this.countInterval);
  },
  methods: {
    countdown() {
      if (this.countInterval) clearInterval(this.countInterval);
      this.countInterval = setInterval(() => {
        this.countTime -= 1;
        if (this.countTime <= 0) {
          this.$emit("timeup");
          clearInterval(this.countInterval);
          this.countInterval = null;
        }
      }, 1000);
    },
    reset() {
      if (this.countInterval) clearInterval(this.countInterval);
      this.countTime = this.time;
      this.countdown();
    },
    padStart(val, length = 2, fillChar = "0") {
      if (val == null) return "";
      return val.toString().padStart(length, fillChar.toString());
    }
  }
};
</script>

<style lang="sass" scoped></style>
