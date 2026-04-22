<!-- 深入组件-注册 -->
<script setup lang="ts">
import { createApp } from 'vue';

const app = createApp({})

// 全局注册组件
app.component(
  // 组件的名字
  'LifecycleChild',
  // 组件的实现
  {

  }
)

// 局部注册,在使用了setup的情况下，直接import即可
import ComponentA from './components/LifecycleChild.vue'

// 组件使用大驼峰命名，但是在模板中使用时，需要使用短横线命名
</script>

<template>

</template>
