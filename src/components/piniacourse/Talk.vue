<template>
    <div class="talk">
        <button @click="getTalk">获取一句话</button>
        <ul>
            <li v-for="talk in talkStore.talkList" :key="talk.id">{{ talk.title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="Talk">
import { ref } from 'vue';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useTalkStore } from '@/store/talk'

const talkStore = useTalkStore()

const talkList = ref([
    {
        id: "1",
        title: '你好，我是张三'
    },
    {
        id: "2",
        title: '你好，我是李四'
    },
    {
        id: "3",
        title: '你好，我是王五'
    }
])

async function getTalk() {
    const result = await axios.get('https://api.apiopen.top/api/articles?page=1&size=10');
    const randomNum = Math.floor(Math.random() * 10)
    const obj = {
        id: nanoid(),
        title: result.data.data[randomNum].summary
    }
    talkList.value.push(obj);
}
</script>

<style scoped>
.talk {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
}

select,
button {
    margin: 0 10px;
    height: 30px;
}
</style>