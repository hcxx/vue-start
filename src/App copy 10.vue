<!-- 帧听器 -->
<template>
    <p>
        Ask a yes/no question:
        <input v-model="question" :disabled="loading" />
    </p>
    <p>{{ answer }}</p>
</template>

<script setup lang="ts">
import { onWatcherCleanup, ref, watch, watchEffect, watchPostEffect } from 'vue';

const question = ref('')
const answer = ref('Questions usally contain a question mark.')
const loading = ref(false)

// 侦听一个ref
watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.endsWith('?')) {
        loading.value = true
        answer.value = 'Thinking...'
        try {
            const res = await fetch('https://yesno.wtf/api')
            answer.value = (await res.json()).answer
        } catch (error) {
            answer.value = 'Error! Could not reach the API. ' + error
        } finally {
            loading.value = false
        }
    }
})

const x = ref(0)
const y = ref(0)
// 侦听getter函数，相当于只侦听该属性
watch(() => x.value + y.value, (sum) => {
    console.log(`sum of x + y is: ${sum}`)
})
// 侦听多个来源组成的数组
watch([x, () => y.value], ([nexX, newY]) => {
    console.log(`x is: ${nexX}, y is: ${newY}`)
})
// 注意，侦听内部属性时，需要侦听getter方法，否则侦听的就是具体的数字或值而不是变量
// 提供一个 getter 函数
const obj = ref({ count: 0 })
watch(() => obj.value.count, (count) => {
    console.log(`Count is: ${count}`)
}
)

// 深层侦听器，reactive时默认开深度监视，但是ref须有手动指定deep
watch(obj, (newObj, oldObj) => {
    // 在嵌套的属性变更时触发
    // 注意：`newValue` 此处和 `oldValue` ,因为对象的引用没有改变。所以是同一个对象，访问内部属性的时候都是改变后的值
    // 因为它们是同一个对象！
})

// 即时回调的侦听器，watch是懒加载，在初始化时不回触发，仅当数据源变化时才会触发。
// 但是某些时候希望初始化时就触发一次，后续数据源变化时再次触发，可以使用 immediate 选项符
watch(obj, (newObj, oldObj) => {
    // 立即执行一次，且当obj变化时也会触发
}, { immediate: true })

// 一次性侦听器，只执行一次
watch(obj, (newObj, oldObj) => {
    // 只执行一次
}, { once: true })


const todoId = ref(1)
const data = ref(null)
// watchEffect，不需要指定侦听对象，会自动侦听依赖的响应式数据。且会立即执行一次，相当有immediate = true
watchEffect(async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
    data.value = await response.json()
})
// 这相当于watch
watch(todoId, async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
    data.value = await response.json()
}, { immediate: true })
// watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。
// watchEffect 只追踪第一个 await 之前访问的依赖

// 副作用清理，例如异步请求，如果在请求完成前id发生了变化，则请求使用的过时的id，在id变化时取消过时请求
const id = ref(1)
watch(id, (newId) => {
    const controller = new AbortController()
    fetch(`/api/${newId}`, {signal: controller.signal}).then(() => {
        // 回调逻辑
    })

    // 能在异步函数的 await 语句之后调用它
    onWatcherCleanup(() => {
        // 终止过期请求
        controller.abort()
    })
})

// 更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调
// 默认情况下，侦听器回调会在父组件更新 (如有) 之后、所属组件的 DOM 更新之前被调用
// 意味着如果你尝试在侦听器回调中访问所属组件的 DOM，那么 DOM 将处于更新前的状态
// 如果想访问所属组件更新之后的DOM，需要在侦听器回调中使用 flush: 'post' 选项符
watch(source, callback, {
  flush: 'post'
})
watchEffect(callback, {
  flush: 'post'
})
// 后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()：
watchPostEffect(callback, {
})

// 同步侦听器，在vue进行任何更新前触发
watch(source, callback, {
  flush: 'sync'
})
watchEffect(callback, {
  flush: 'sync'
})
//同步触发的 watchEffect() 有个更方便的别名 watchSyncEffect()：
// 使用它来监视简单的布尔值变化
import { watchSyncEffect } from 'vue'
watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
})

// 异步创建侦听器，必须手动停止，否则内存泄漏
const unwatch = watchEffect(() => {})
// 通过返回函数...当该侦听器不再需要时
unwatch()

// 如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：
// 需要异步请求得到的数据
const data2 = ref(null)
watchEffect(() => {
  if (data2.value) {
    // 数据加载后执行某些操作...
  }
})
</script>