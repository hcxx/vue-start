<!-- 生命周期钩子,见LifecycleChild组件 -->
<!-- 创建（创建没有前了）、挂载、更新、卸载 -->
 <!-- vue3生命周期 -->
<!-- 挂载阶段：父 setup（创建） → 父 onBeforeMount → 子 setup（创建） → 子 onBeforeMount → 子 onMounted → 父 onMounted -->
<!-- 更新阶段：父 onBeforeUpdate → 子 onBeforeUpdate → 子 onUpdated → 父 onUpdated -->
<!-- 卸载阶段：父 onBeforeUnmount → 子 onBeforeUnmount → 子 onUnmounted → 父 onUnmounted -->
<script setup lang="ts">
import { ref } from 'vue';
import LifecycleChild from './components/LifecycleChild.vue'

const isShow = ref(true)
</script>

<template>
  <!-- v-if指令控制组件是否卸载 -->
   <!-- 先执行子组件的生命周期，再执行父组件的生命周期 -->
  <LifecycleChild v-if="isShow"></LifecycleChild>
  <button @click="isShow = !isShow">点击{{isShow ? '隐藏': '展示'}}展示子组件</button>
</template>
