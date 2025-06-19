import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router"
import UdUi from "./components/ud-ui"
import emitter from "mitt"

import App from "./App.vue"
import "./style/all.sass"

const app = createApp(App)

app.config.globalProperties.$mitt = emitter

app
  .use(createPinia())
  .use(router)
  .use(UdUi)
  .mount("#app")