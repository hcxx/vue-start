<!-- 路由 -->
<!-- 在路由规则里面配置的组件就是路由组件，否则就是一般组件 -->
<!-- 路由组件一般放在views或者pages目录下，一般组件一般放在components目录下 -->
<!-- 路由切换后，组件会重新挂载，切换其他组件后，组件会被卸载 -->
<template>
  <div class="app">
    <h2 class="title">Vue路测试</h2>
    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink :to="{name:'xinwen'}" active-class="active">新闻</RouterLink>
      <RouterLink :to="{path:'/about'}" active-class="active">关于</RouterLink>
    </div>

    <!-- 内容区 -->
    <div class="main-content">
      <!-- 展示具体的组件 -->
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts" name="App">
import { RouterView, RouterLink } from 'vue-router';
</script>

<style>
/* App */
.title {
  text-align: center;
  word-spacing: 5px;
  margin: 30px 0;
  height: 70px;
  line-height: 70px;
  background-image: linear-gradient(45deg, gray, white);
  border-radius: 10px;
  box-shadow: 0 0 2px;
  font-size: 30px;
}

.navigate {
  display: flex;
  justify-content: space-around;
  margin: 0 100px;
}

.navigate a {
  display: block;
  text-align: center;
  width: 90px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: gray;
  text-decoration: none;
  color: white;
  font-size: 18px;
  letter-spacing: 5px;
}

.navigate a.active {
  background-color: #64967E;
  color: #ffc268;
  font-weight: 900;
  text-shadow: 0 0 1px black;
  font-family: 微软雅黑;
}

.main-content {
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
  width: 90%;
  height: 400px;
  border: 1px solid;
}
</style>