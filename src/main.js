import Vue from "vue";
import App from "./App.vue";
import AgoraRtcVue from "agora-rtc-vue";
import "agora-rtc-vue/lib/agora-rtc-vue.css";

Vue.use(AgoraRtcVue, {
  appid: "6a4b4379828e4f85bb7f41b8b3aee304",
  token:
    "007eJxTYOgufbG8T9b7zYmP19ec3szevmq2xcWbkgoO4Yu1At8+VpJUYDBLNEkyMTa3tDCySDVJszBNSjJPMzFMskgyTkxNNTYwWaQckNwQyMhwTHEuIyMDBIL4TAyGhgwMAHhWHuw=",
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
