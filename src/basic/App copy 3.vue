<template>
  <div>
    <h3>动态事件绑定演示</h3>
    
    <!-- 切换事件类型 -->
    <select v-model="eventName">
      <option value="click">点击事件</option>
      <option value="mouseenter">鼠标移入事件</option>
      <option value="mouseleave">鼠标移出事件</option>
    </select>
    
    <p>当前绑定事件: <strong>{{ eventName }}</strong></p>
    
    <!-- 动态事件绑定 -->
    <button @[eventName]="handleEvent">
      触发 {{ eventName }} 事件
    </button>
    
    <p>触发次数: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const eventName = ref('click')
const count = ref(0)

function handleEvent() {
  count.value++
  console.log(`触发了 ${eventName.value} 事件，当前次数: ${count.value}`)
}
</script>