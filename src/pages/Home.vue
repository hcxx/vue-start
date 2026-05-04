<template>
<div>home</div>
</template>

<script setup lang="ts" name = "Home">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// onMounted(() => {
//     setTimeout(() => {
//         // 编程式路由，解决无法在script中使用RouterLink组件的问题。需要判断的情况下使用编程式路由导航
//         router.push('/news');
//     }, 3000);
// })


</script>