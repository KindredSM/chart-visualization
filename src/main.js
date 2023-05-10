// main.js
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import draggable from "vuedraggable";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VTooltip from "v-tooltip";
import "animate.css";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(VTooltip)
  .use(VueAxios, axios)
  .use(router)
  .directive("draggable", draggable)
  .mount("#app");
