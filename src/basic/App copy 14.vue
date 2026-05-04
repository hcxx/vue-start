<!-- 组合式函数 -->
<script setup lang="ts">
import { ref } from 'vue';
import { useMouse } from '../components/Logicreuse3/Mouse.js'
import { useFetch } from '../components/Logicreuse3/fetch.js'

// 鼠标跟踪器示例
const {x, y} = useMouse()

// 异步状态示例，接收一个参数的组合式函数示例
const {data, error} = useFetch('...')
</script>

<template>
    <div>Mouse position is at: {{ x }} {{ y }}</div>
    <br>

    <div v-if="error">Oops! ERROR encountered: {{ error.message }}</div>
    <div v-else-if="data">
        Data loaded:
        <pre>{{ data }}</pre>
    </div>
    <div v-else>Loading...</div>
</template>
