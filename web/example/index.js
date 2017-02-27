import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './src/index.vue'
import routes from './routes'

// 组件引用
import va from 'c/validate/va'

Vue.use(VueRouter)
Vue.use(va)

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

new Vue({
    el: '#App',
    components: { App },
    router
})
