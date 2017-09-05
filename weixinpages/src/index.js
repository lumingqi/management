import './style/index.css'
import App from './pages/app.vue'
import lbCom from './components/packages'
import stores from './stores'
import mixin from './mixins/mixin'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.mixin(mixin)
Vue.use(lbCom)
let routes
let store = new Vuex.Store(stores)
let req = require.context('~/pages', true, /^\.\/*\/.*\.vue$/)
routes.push({
    path: '/student/info/:id',
    component: req('./student/info.vue')
})
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    hashbang: false,
    history: true,
    routes
})
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})