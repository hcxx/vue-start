<template>
  <div>
    <h3>动态参数示例</h3>
    
    <!-- 控制面板 -->
    <div class="controls">
      <button @click="attributeName1 = 'href'">切换为 href</button>
      <button @click="attributeName1 = 'src'">切换为 src</button>
      <button @click="attributeName1 = 'alt'">切换为 alt</button>
    </div>
    
    <p>当前绑定的属性: <strong>{{ attributeName1 }}</strong></p>
    
    <!-- 动态参数绑定 -->
    <a :[attributeName1]="url">
      {{ attributeName1 === 'href' ? '点击访问链接' : attributeName1 === 'src' ? '图片链接' : '替代文本' }}
    </a>
    
    <hr>
    
    <!-- 另一个例子：动态事件绑定 -->
    <div class="event-demo">
      <h4>动态事件绑定</h4>
      <button @click="eventName = 'click'">使用 click 事件</button>
      <button @click="eventName = 'mouseenter'">使用 mouseenter 事件</button>
      
      <p>当前事件: <strong>{{ eventName }}</strong></p>
      <button @[eventName]="handleEvent">触发 {{ eventName }} 事件</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const attributeName1 = ref('href')
const url = ref('https://vuejs.org')
const eventName = ref('click')

function handleEvent() {
  alert(`触发了 ${eventName.value} 事件！`)
}
</script>

<style scoped>
.controls {
  margin: 20px 0;
}

.controls button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.event-demo {
  margin-top: 30px;
}

.event-demo button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>