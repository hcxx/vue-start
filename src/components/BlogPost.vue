<!-- 博客文章组件 -->
<script setup lang="ts"> 
// 定义组件的属性返回值包含了所有props （接收父组件传递过来的属性）
const pros = defineProps(['title'])
console.log(pros)
// 定义需要抛出的事件 （传递给父组件的事件，达到改变父组件值的目的，一般用于用户交互）
// 插槽不同，适用于被动接收父组件传递过来的内容，而事件适用于主动触发父组件的事件
defineEmits(['enlarge'])
</script>

<template>
    <h4>{{ title }}</h4>
    <!-- 点击时抛出enlarge事件，父组件可以监听该事件 -->
    <button @click="$emit('enlarge')">放大文本</button>
 </template>
