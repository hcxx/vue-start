<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const author = ref({
  name: '张三',
  books: [
    'VUE2',
    "VUE3",
    "VUE4"
  ]
})

// 模板中可以直接使用{{publishBookMessage}}调用计算属性。也可以使用{{pbmsg()}}。返回的结果是一样的
// 区别是计算属性是缓存的，会记住上一次计算的结果直接返回，只有当依赖的响应式数据发生变化时才会重新计算值，
// 而函数是每次调用都重新计算的
const publishBookMessage = computed(() => {
  return author.value.books.length > 0 ? 'YES' : 'NO'
})

const pbmsg = function() {
  return author.value.books.length > 0 ? 'YES' : 'NO'
}



const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})

// 计算属性中获取上一次计算的值，如下大于3后永远返回3
const num = ref(0)
const numCount = computed((prev) => {
  if (num.value <= 3) {
    return num.value
  }
  return prev
})
</script>

<template>
<P>拥有的书籍</P>
<br>
<span>{{ publishBookMessage}}</span>
<br>
<span>{{ pbmsg()}}</span>
<br>

<span>{{ fullName}}</span>
<br>
<span>{{ numCount}}</span>
<button @click="num++">增加</button>
</template>