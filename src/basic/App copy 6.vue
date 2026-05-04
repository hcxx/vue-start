<script setup lang="ts">
import { ref } from 'vue';

const booleanButton = ref(true)
</script>

<!-- v-if 也可以直接作用于template标签 -->
<template>
<button @click="booleanButton = !booleanButton">按钮控制是否显示</button>
<br>
<!-- v-if 若为false则不回被dom渲染 -->
<h1 v-if="booleanButton">vue is awsome</h1>
<h1 v-else>oh no😢</h1>
<br>
<br>

<!-- v-show 只作用于display属性, 无论值为true或false，都会被dom渲染，只是显示或隐藏 -->
<!-- 总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，
  则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。 -->
 <h1 v-show="booleanButton">v-show控制显示</h1>
</template>