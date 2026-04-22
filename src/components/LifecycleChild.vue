<!-- vue3生命周期 -->
<!-- 挂载阶段：父 setup（创建） → 父 onBeforeMount → 子 setup（创建） → 子 onBeforeMount → 子 onMounted → 父 onMounted -->
<!-- 更新阶段：父 onBeforeUpdate → 子 onBeforeUpdate → 子 onUpdated → 父 onUpdated -->
<!-- 卸载阶段：父 onBeforeUnmount → 子 onBeforeUnmount → 子 onUnmounted → 父 onUnmounted -->
<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue'

const sum = ref(0)
// created，没有方法了，setup,这里面直接写就是创建
console.log('组件创建完成')

onBeforeMount(() => {
  console.log('组件挂载前')
})

// 组件完成初始渲染并创建DOM节点后运行
onMounted(() => {
  console.log('组件挂载完成')
})

onBeforeUpdate(() => {
  console.log('组件更新前')
})

onUpdated(() => {
  console.log('组件更新完成')
})

onBeforeUnmount(() => {
  console.log('组件卸载前')
})

onUnmounted(() => {
  console.log('组件卸载完成')
})
</script>

<template>
  <div>{{ sum }}</div>
  <button @click="sum++">点击加1</button>
</template>