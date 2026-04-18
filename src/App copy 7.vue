<template>
  <!-- 这里会抛出错误，v-if的优先级比v-for高，导致v-if获取不到user对象 -->
  <!-- 解决方法是对v-for包装一层template -->
  <!-- <ul>
    <li v-for="user in users" v-if="user.isActive" :key="user.id">
      {{ user.name }} - {{ user.isActive }}
    </li>
  </ul> -->
  <template v-for="user in users">
    <ul>
      <li v-if="user.isActive" :key="user.id">
        {{ user.name }} - {{ user.isActive }}
      </li>
    </ul>
  </template>

  <!-- vue能够侦听数组变化，从而自动更新页面，涉及到数组的方法有push、pop、shift、unshift、splice、sort、reverse等 -->
  <!-- 有些方法能返回一个新数组，比如filter、map、reduce、concat、slice等，这些方法不会改变原数组 -->
   <!-- 在计算属性中使用 reverse() 和 sort() 的时候务必小心！这两个方法将变更原始数组，计算函数中不应该这么做。请在调用这些方法之前创建一个原数组的副本 -->
  <br>
  <ul>
    <li v-for="n in evenNumbers">{{ n }}</li>
  </ul>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const users = ref([
  { id: 1, name: '张三', isActive: true },
  { id: 2, name: '李四', isActive: false },
  { id: 3, name: '王五', isActive: true }
])

const numbers = ref([1, 2, 3, 4, 5])
const evenNumbers = computed(() => numbers.value.filter(num => num % 2 === 0))

</script>