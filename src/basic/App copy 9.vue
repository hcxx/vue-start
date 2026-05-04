<!-- 表单输入绑定 -->
<template>
    <p>Msg is {{ msg }}</p>
    <input v-model="msg" placeholder="填入信息">
    <hr>

    <!-- 多行文本 -->
    <span>多行文本：</span>
    <p style="white-space: pre-line;">{{ multiLineMsg }}</p>
    <textarea v-model="multiLineMsg" placeholder="多行文本输入"></textarea>
    <hr>

    <!-- 单一复选框绑定布尔值（省略）。多个复选框绑定数组。 -->
    <div>复选框选中：{{ multiCheckNames }}</div>
    <input type="checkbox" id="jack" value="Jack" v-model="multiCheckNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="multiCheckNames" />
    <label for="john">john</label>
    <input type="checkbox" id="jane" value="Jane" v-model="multiCheckNames" />
    <label for="jane">jane</label>
    <hr>

    <!-- 单选按钮 -->
    <div>单选框选中：{{ singleCheckNames }}</div>
    <input type="radio" id="one" value="One" v-model="singleCheckNames" />
    <label for="one">One</label>
    <input type="radio" id="two" value="Two" v-model="singleCheckNames" />
    <label for="two">Two</label>
    <hr>

    <!-- 下拉单选器 -->
    <div>单选器选中：{{ singleSelectName }}</div>
    <select v-model="singleSelectName">
        <option disabled value="">请选择一个</option>
        <option>A</option>
        <option>B</option>
    </select>

    <!-- v-for渲染选择器 -->
    <div>v-for 下拉选择选中:{{ selected }}</div>
    <!-- v-model绑定的是value，所以最终{{ selected }}是A、B、C -->
    <select v-model="selected">
        <!-- 下拉框的值是{{ option.text }}，即one、two、three -->
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
    <hr>

    <!-- 修饰符 -->
    <!-- lazy，在输入框失去焦点、回车时才更新绑定的变量 -->
    <div>lazyMsg: {{ lazyMsg }}</div>
    <input v-model.lazy="lazyMsg" />
    <!-- 将输入值转换为数字类型接收，否则绑定到vue是字符串类型 -->
    <div>numberMsg: {{ numberMsg }}</div>
    <input type="number" v-model.number="numberMsg" />
    <!-- trim，自动去掉输入框首尾的空格符 -->
    <div>trimMsg: {{ trimMsg }}</div>
    <input type="text" v-model.trim="trimMsg" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const msg = ref()
const multiLineMsg = ref()

const multiCheckNames = ref([])
const singleCheckNames = ref('')

const singleSelectName = ref('')

const selected = ref('A')
const options = ref([
    { text: 'One', value: 'A' },
    { text: 'Two', value: 'B' },
    { text: 'Three', value: 'C' }
])

const lazyMsg = ref('')
const numberMsg = ref()
const trimMsg = ref('')
</script>