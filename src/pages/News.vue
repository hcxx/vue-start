<template>
    <div class="news">
        <ul>
            <li v-for="news in newsList" :key="news.id">
                <!-- 第一种params参数传递方式 -->
                <!-- <RouterLink :to="`/news/detail/${news.id}/${news.title}/${news.content}`">{{ news.title }}</RouterLink> -->
                <button @click="showNewsDetail(news)">查看新闻</button>
                <RouterLink :to="{
                    // params参数只能用name，parmas中也不敢用对象和数组
                    name:'xinwenDetail',
                    params:{
                        id:news.id,
                        title:news.title,
                        content:news.content
                    }
                }">
                    {{ news.title }}
                </RouterLink>
            </li>
        </ul>

        <div class="news-content">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts" name="News">
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';


const newsList = ref([
    {
        id: 1,
        title: "新闻001",
        content: "新闻001的内容"
    },
    {
        id: 2,
        title: "新闻002",
        content: "新闻002的内容"
    },
    {
        id: 3,
        title: "新闻003",
        content: "新闻003的内容"
    },
    {
        id: 4,
        title: "新闻004",
        content: "新闻004的内容"
    }
])

const router = useRouter();
// ts限定类型
interface NewsInterface {
    id:number,
    title:string,
    content:string
}
function showNewsDetail(news:NewsInterface) {
    router.push({
        name:'xinwenDetail',
        params:{
            id:news.id,
            title:news.title,
            content:news.content
        }
    })
}
</script>

<style scoped>
/* 新闻 */
.news {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 100%;
}

.news ul {
    margin-top: 30px;
    list-style: none;
    padding-left: 10px;
}

.news li>a {
    font-size: 18px;
    line-height: 40px;
    text-decoration: none;
    color: #64967E;
    text-shadow: 0 0 1px rgb(0, 84, 0);
}

.news-content {
    width: 70%;
    height: 90%;
    border: 1px solid;
    margin-top: 20px;
    border-radius: 10px;
}
</style>