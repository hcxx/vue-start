<template>
    <div class="news">
        <ul>
            <li v-for="news in newsList" :key="news.id">
                <!-- 第一种query参数传递方式 -->
                <!-- <RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">{{ news.title }}</RouterLink> -->
                
                <!-- 第二种query参数传递方式 -->
                <RouterLink :to="{
                    // path也可以用name，name是路由的名称
                    path:'/news/detail',
                    query:{
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
import { RouterLink, RouterView } from 'vue-router';


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