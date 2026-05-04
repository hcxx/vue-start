<!-- 模板引用，用于在dom加载后访问dom，直接操作dom -->
<template>
  <input ref="my-input"/>
  <br>

  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
  <br>

  <!-- 函数模板引用 -->
  <input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
</template>


<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';

// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')

onMounted(() => {
  // 初次渲染时input是null，因为这个元素还不存在
  if (input.value) {
    input.value.focus()
    console.log('获得焦点')
  } else {
    console.log('input is null')
  }
})

// 使用了 <script setup> 的组件是默认私有的：一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露：

// v-for 中的模板引用
const list = ref([
  /* ... */
])
const itemRefs = useTemplateRef('items')
onMounted(() => console.log(itemRefs.value))
</script>