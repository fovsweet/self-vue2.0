import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './src/index'
import routes from './routes'
import '../../config/api'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

new Vue({
    el: '#App',
    components:{App},
    router
})