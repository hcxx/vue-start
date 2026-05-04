<template>
    <div class="count">
        <h2>当前求和为：{{ countStore.sum }}, 放大2倍后：{{ bigSum }}</h2>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add">增加</button>
        <button @click="minus">减少</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useCountStore} from '@/store/count'
import { storeToRefs } from 'pinia'

const n = ref(0)
const countStore = useCountStore()

// pinia 的storeToRefs，只将state中的数据转换为响应式数据，vue中toRefs会将数据+方法都转换为响应式数据
const {sum, schaool, address, bigSum, upperSchool} = storeToRefs(countStore)
console.log('storeToRefs', storeToRefs(countStore))
// 以下两种方法都可以拿到state中的数据
// console.log(countStore.sum)
// console.log(countStore.$state.sum)

// 方法
function add() {
    // 第一种修改方式
    // countStore.sum += n.value

    // 第二种修改方式批量修改,对所有元素同时修改，见点击后下面的加的countStore.sum实际值
    // countStore.$patch({
    //     sum: countStore.sum + n.value,
    //     schaool: '家里蹲大学' + countStore.sum,
    //     address: '中国' + countStore.sum
    // })

    // 第三种修改方法，action
    countStore.increment(n.value)
}

function minus() {
    countStore.sum -= n.value
}
</script>

<style scoped>
    .count {
        background-color: skyblue;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 0 10px;
    }

    select,button {
        margin: 0 5px;
        height: 30px;
    }
</style>