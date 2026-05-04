<script setup lang="ts">
import { reactive, ref } from 'vue';

const count = ref(0)

function add() {
  count.value++
  console.log(count.value)
  console.log(count)
}
</script>

<template>
  <div>{{ count }}</div>
  <button @click="add">增加</button>
</template>