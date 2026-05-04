<template>
    <div class="talk">
        <button @click="getTalk">获取一句话</button>
        <ul>
            <li v-for="talk in talkList" :key="talk.id">{{ talk.title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="Talk">
import { ref } from 'vue';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useTalkStore } from '@/store/talk'
import { storeToRefs } from 'pinia';

const {talkList} = storeToRefs(useTalkStore())
const talkStore = useTalkStore()
talkStore.$subscribe((mutate, state) => {
    console.log('talkStore里的数据发生了变化', mutate, state)
    // 监听talkList变化，保存到本地存储
    localStorage.setItem('talkList', JSON.stringify(state.talkList))
})

// async function getTalk() {
//     const result = await axios.get('https://api.apiopen.top/api/articles?page=1&size=10');
//     const randomNum = Math.floor(Math.random() * 10)
//     const obj = {
//         id: nanoid(),
//         title: result.data.data[randomNum].summary
//     }
//     talkList.value.push(obj);
// }

function getTalk() {
    talkStore.getTalk()
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