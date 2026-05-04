<template>
  <!-- 事件处理，v-on简写为@ -->
  <!-- `greet` 是上面定义过的方法名 -->
  <button @click="greet">Greet</button>

  <br>
  <button @click="say('hello')">Say hello</button>
  <button @click="say('bye')">Say bye</button>

  <br>
  <button @click="warn('未提交', $event)">submit</button>
  <button @click="(event) => warn('未提交', event)">submit</button>

  <hr>
  <!-- 事件修饰符 -->
   <!-- once,只执行一次 -->
  <p @click.once="count++">点击次数：{{ count }}</p>

  <hr>
  <!-- prevent,阻止默认事件，表单不回刷新，链接不会跳转 -->
  <a href="https://www.baidu.com" @click.prevent="count++">点击我（阻止a标签默认跳转）</a>

  <hr>
  <!-- stop,用于子标签，阻止事件向上冒泡 -->
  <!-- 点击子标题，改变字体颜色，同时改变父标题的背景颜色，点击父标题，只改变背景颜色，这是事件冒泡的结果 -->
  <!-- 解决方法是对子标题添加stop修饰符，阻止事件冒泡 -->
  <div :style="backColor" @click="backColor = 'background:green'">
    父标题-改变背景颜色
    <div :style="fontColor" @click.stop="fontColor = 'color:blue'">
      子标题
    </div>
  </div>

  <!-- self,只触发当前元素的事件，不触发子元素的事件，用于防止事件冒泡 -->
  <!-- self与stop的区别是，self是用于当前（父标签）元素，当子标签传递事件时，self不触发事件，
   stop是用于子元素，子标签不会向上冒泡，传递给父标签 -->
</template>

<script setup lang="ts">
import { ref } from 'vue';


const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    // 点击事件的对象的tag
    alert(event.target.tagName)
  }
}

function say(message) {
  alert(message)
}

function warn(msg, event) {
  alert(msg)
  if (event) {
    alert(event.target.tagName)
  }
}

const backColor = ref()
const fontColor = ref()
const count = ref(0)
</script>