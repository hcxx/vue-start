// 创建一个路由器并暴露
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: Home
    },
    {
      path: "/news",
      component: News
    },
    {
      path: "/about",
      component: About
    }
  ]
});

// 暴露路由
export default router;
