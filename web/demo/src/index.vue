<script>
export default {
    data() {
            return {
                msg: 'hello vue'
            }
        }
}
</script>

<template>
    <div>
        <h1>Hello App!</h1>
        <!--路由链接-->
        <p>
            <router-link to="/demo">Go to Demo</router-link>
        </p>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

