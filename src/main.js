import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

import mavonEditor from "mavon-editor"; //markdown编辑器
import "mavon-editor/dist/css/index.css";
//全局引入typo.css
import "@/assets/css/typo.css";
//引入动画 animate.css
import animate from "animate.css";
import highlight from "./assets/js/highlight";

Vue.use(animate);
Vue.use(highlight);
Vue.use(mavonEditor);
Vue.use(ElementUI);
//关闭生产提示
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
