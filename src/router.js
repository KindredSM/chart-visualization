// router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Insights from "./views/Insights.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
  {
    path: "/Insights",
    component: Insights,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
