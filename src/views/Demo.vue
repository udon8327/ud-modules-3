<template lang="pug">
#demo
  ud-modal(v-model="isModalShow" mask-close btn-close)
    h1 通用彈窗
    ud-image(src="img/02.jpg", alt="")
    br
    ud-button(@click="isModalShow = false" plain) 關閉

  .liff-area
    .liff-wrapper
      ud-image(:src="profile.pictureUrl", alt="")
      .profile-wrapper
        h6 {{ profile.displayName }}
        p {{ profile.userId }}
        p {{ profile.info }}

  .button-area
    .button-wrapper
      ud-button(@click="sendMessage" plain) 傳送訊息
      ud-button(@click="shareTargetPicker") 好友分享
    .button-wrapper
      ud-button(@click="getData" plain) GET
      ud-button(@click="postData") POST

  .form-area
    ud-form(:rules="rules" :model="formData" ref="form")
      ud-form-item(label="姓名" prop="name" flex)
        ud-input(v-model.trim="formData.name" placeholder="請輸入您的姓名" @keydown="onInput")
      ud-form-item(label="電話" prop="phone" flex)
        ud-input(v-model.trim="formData.phone" placeholder="請輸入您的手機號碼" inputmode="tel" maxlength="10")
      ud-form-item(label="Email" prop="email" flex)
        ud-input(v-model.trim="formData.email" placeholder="請輸入您的Email" inputmode="email")
      ud-form-item(label="年齡" prop="age" flex)
        ud-input(v-model.trim="formData.age" placeholder="請輸入您的年齡" inputmode="numeric")
      ud-form-item(label="備註" prop="note" flex)
        ud-textarea(v-model="formData.note" placeholder="請輸入您的備註" show-limit :limit="100" @keydown="onInput")
      ud-form-item(label="單選" prop="radio" flex)
        ud-radio(v-model="formData.radio" :options="options" flex @change="onInput")
      ud-form-item(label="多選" prop="checkbox" flex)
        ud-checkbox(v-model="formData.checkbox" :options="options" flex @change="onInput")
      ud-form-item(label="下拉" prop="select" flex)
        ud-select(v-model="formData.select" :options="options" flex center @change="onInput")
      ud-form-item(label="下拉連動" prop="selectGroup" flex)
        .d-flex
          ud-select(v-model="formData.selectGroup[0]" :options="storeOptions" :group="formData.selectGroup" :index="0" placeholder="縣市")
          ud-select(v-model="formData.selectGroup[1]" :options="storeOptions" :group="formData.selectGroup" :index="1" placeholder="櫃點")
          ud-select(v-model="formData.selectGroup[2]" :options="storeOptions" :group="formData.selectGroup" :index="2" placeholder="時段")
      ud-form-item(label="地址" prop="twzip" flex)
        ud-select-twzip(ref="zip" v-model="formData.twzip" flex)
      ud-form-item(label="預約日期" prop="date" flex)
        ud-select-date(v-model="formData.date" flex third roc)
          p 年
          template(v-slot:second)
            p 月
          template(v-slot:third)
            p 日
      ud-form-item(label="是否啟用" prop="isActive" flex)
        ud-switch(v-model="formData.isActive")
      ud-form-item(label="" prop="isAgree")
        ud-checkbox(v-model="formData.isAgree")
          p 我同意#[a(href="https://www.google.com.tw/") 使用者條款]

    .button-wrapper
      ud-button(@click="clearVerify" plain) 清除驗證
      ud-button(@click="submitVerify") 送出表單

    .module-area
      .button-wrapper
        ud-button(@click="alert()") Alert
        ud-button(@click="isModalShow = true") Model
      ud-button(@click="isCollapse = !isCollapse") 摺疊容器
        ud-arrow(color="#fff" :size="4" :width="2" :direction="isCollapse ? 'up' : 'down'")
      ud-collapse(v-model="isCollapse" :duration="0.4")
        ud-image(src="img/01.jpg" bg-size="contain")

      ud-html(text="<i>用戶</i>自定\n<h3>義訊息</h3>")
      br
      ud-ellipsis(:max-line="2") 文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略文字省略
      br
      ud-countdown(ref="countdown" :time="120" @timeup="timeup" type="minute")
</template>

<script>
import liff from "@line/liff";

export default {
  name: "Demo",
  components: {},
  data() {
    return {
      isModalShow: false,
      isCollapse: false,
      profile: {
        userId: "",
        displayName: "",
        pictureUrl: "",
        info: "",
      },
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
    this.liffLogin();
  },
  methods: {
    onInput(e) {
      console.log('e: ', e);
    },
    test() {
      console.log(getRandom());
    },
    openExternal() {
      location.href = "https://liff.line.me/1655285115-w926gzYP";
      // liff.openWindow(
      //   { url: "https://liff.line.me/1655285115-w926gzYP", external: true }
      // );
    },
    liffLogin() {
      liff
        .init({
          liffId: import.meta.env.VITE_APP_LINE_LIFF_ID,
        })
        .then(() => {
          // 檢查是否登入
          if (!liff.isLoggedIn()) {
            liff.login({ redirectUri: location.href });
            return;
          }
          // 檢查是否好友
          liff
            .getFriendship()
            .then((data) => {
              if (data.friendFlag) {
                liff.getProfile().then((res) => {
                  this.profile = res;
                  this.profile.info = 
                    liff.isInClient() + ", " + 
                    liff.getOS() + ", " + 
                    liff.getLineVersion() + ", " + 
                    liff.getLanguage();
                })
              } else {
                location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
                  LINE_LOGIN_CHANNEL_ID
                }&redirect_uri=${encodeURIComponent(
                  location.href
                )}&scope=profile%20openid%20phone%20email&bot_prompt=aggressive&prompt=consent&state=${Date.now()}`;
              }
            })
            .catch(() => {
              udAlert(`LIFF初始化失敗，請稍後再試`).then(() => {
                location.href = LINE_OA_URL;
              });
            });
        })
        .catch((err) => {
          udAlert(`[${err.code}] ${err.message}\nLIFF初始化失敗，請稍後再試`).then(() => {
            location.href = LINE_OA_URL
          });
        });
    },
    getData() {
      udAxios.get('test/400/失敗了')
        .then(res => {
          console.log('res: ', res);
        })
    },
    postData() {
      udAxios.post('test', {
        name: "UDON"
      })
        .then(res => {
          console.log('res: ', res);
        })
    },
    alert() {
      udAlert("警告\n彈窗");
    },
    timeup() {
      udAlert('時間到！');
    },
    countdown() {
      this.$refs.cd.countdown();
    },
    reset() {
      this.$refs.cd.reset();
    },
    submitVerify() {
      this.$refs.form.validate(() => {
        this.submit();
      });
    },
    submit() {
      this.udAlert({msg: "驗證成功!!"});
    },
    clearVerify() {
      this.$refs.form.clearValidate();
    },
    toUrl(url) {
      location.href = url;
    },
    sendMessage() {
      liff.sendMessages([
        {
          "type": "text",
          "text": "Hello, World!(sendMessages)"
        }
      ])
        .then(() => {
            console.log('Message sent successfully!');
        })
        .catch((err) => {
            console.error('Error sending message:', err);
        });
    },
    shareTargetPicker() {
      if (!liff.isApiAvailable('shareTargetPicker')) {
        this.udAlert(
          "您的設備不支援好友分享功能\n請更新手機系統或LINE版本"
        ).then(() => {
          location.href = LINE_OA_URL;
        });
        return;
      }
      // shareTargetPicker只能在LIFF或外部瀏覽器(除了LINE內建瀏覽器)使用
      if (!liff.isInClient() && liff.getLineVersion()) {
        this.udAlert(
          "請點擊活動LIFF連結進入頁面\n才可使用好友分享功能"
        ).then(() => {
          location.href = LINE_OA_URL;
        });
        return;
      }
      liff.shareTargetPicker([
        {
          "type": "text",
          "text": "Hello, World!(shareTargetPicker)"
        }
      ])
        .then((res) => {
          if (res) {
            this.udAlert("分享成功！").then(() => {
              liff.closeWindow();
            })
          } else {
            const [majorVer, minorVer] = (liff.getLineVersion() || "").split('.');
            if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) { // LINE 10.3.0 - 10.10.0
              this.udAlert(
                "您的 LINE 版本較舊，可能會造成無法分享成功。若分享失敗，請升級 LINE APP 後再嘗試。"
              );
              return;
            }
            this.udAlert("已取消分享"); // LINE 10.11.0 -
          }
        })
        .catch((error) => {
          this.udAlert({
            msg: `${error.code === 'EXCEPTION_IN_SUBWINDOW' ? '請在 LINE APP中 開啟活動\n以便使用好友分享功能' : '訊息分享失敗，請稍後再試'}\n[${error.code}] ${error.message}`,
          }).then(() => {
            location.href = LINE_OA_URL;
          })
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.liff-area
  margin-bottom: 15px
  .liff-wrapper
    display: flex
    align-items: center
    margin-bottom: 10px
    .ud-image
      flex: 0 0 15%
      border-radius: 50%
      overflow: hidden
    .profile-wrapper
      margin-left: 10px
      h6
        font-family: "DINCondensedBold", "LXGW WenKai TC"
      p
        color: #999
        font-size: 14px

.button-wrapper
  display: flex
  justify-content: space-between
  margin-bottom: 10px
  gap: 10px
  .ud-button
    flex: 1 1 0
</style>