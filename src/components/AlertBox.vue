<template>
    <div class="alert-box">
        <strong>异常错误</strong>
        <!-- 使用slot作为一个占位符，将父组件传递过来的内容渲染到子组件中的这里 -->
        <slot />
    </div>
</template>

<style scoped>
.alert-box {
    color: red;
}
</style>