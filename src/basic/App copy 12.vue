<!-- VUE3组件 -->
<script setup lang="ts">
import ButtonCounter from './components/ButtonCounter.vue'
import BlogPost from './components/BlogPost.vue'
import { ref } from 'vue'
import AlertBox from './components/AlertBox.vue'

const posts = ref([
  { id: 1, title: 'Vue 3 组件1' },
  { id: 2, title: 'Vue 3 组件2' },
])

const postFontSize = ref(1)
</script>

<template>
  <h1>这里有一个子组件</h1>
  <ButtonCounter />
  <ButtonCounter />
  <br>
  <!-- title被注册到BlogPost组件props后，可以直接以attribute的形式访问，例如这里的:title -->
  <div :style="{ fontSize: postFontSize + 'em' }">
    <!-- 监听子组件抛出来的enlarge事件，点击放大文本 -->
    <BlogPost v-for="post in posts" :key="post.id" :title="post.title" @enlarge="postFontSize += 0.5"></BlogPost>
  </div>

  <AlertBox>
    <!-- 这里的内容通过插槽插入到子组件 -->
    Something bad happened.
  </AlertBox>
</template>
