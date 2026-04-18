<!-- 子组件使用 大驼峰 的标签名 -->
<template>
    <br>
    <h1>child component</h1>
    <button @click="count++">click me</button>
    <p>count: {{ count }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>