// 创建一个路由器并暴露
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";
import Detail from "@/pages/Detail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "zhuye",
      path: "/home",
      component: Home,
    }, 
    {
      name: "xinwen",
      path: "/news",
      component: News,
      children: [
        {
          name: "xinwenDetail",
          path: "detail/:id/:title/:content?",
          component: Detail,

          // 第一种写法，将路由的所有params参数作为props传给路由组件
          // props:true

          // 第二种写法，通过函数将自己选定的参数作为props传给路由组件
          props(route) {
            return route.params;
          },

          // 第三种写法，通过对象将自己选定的参数作为props传给路由组件
          // props: (route) => ({
          //   id: route.params.id,
          //   title: route.params.title,
          //   content: route.params.content,
          // }),
        },
      ],
    },
    {
      name: "guanyu",
      path: "/about",
      component: About,
    },
    {
      path:'/',
      // 重定向到/home
      redirect:'/home'
    }
  ],
});

// 暴露路由
export default router;
