<script setup lang="ts">
import { ref } from 'vue';

const rawHtml = ref(0);
const dynamicId = ref('dynamicId2');
const buttonDisabled = ref(false);
const showP = ref(true);
</script>

<template>
<p v-bind:id="dynamicId">Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="'<a>www.example.com</a>'"></span></p>
<button :disabled="buttonDisabled">按钮是否禁用</button>
<!-- v-on 的缩写是@，v-on:click = @click -->
<p v-if="showP">v-if控制显示</p> <button @click="showP = !showP">v-if切换显示</button>
</template>