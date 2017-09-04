import './style/index.css'
import App from './pages/app/app.vue'
import lbCom from './components/packages'
import stores from './stores'
import mixin from './mixins/mixin'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.mixin(mixin)
Vue.use(lbCom)

let store = new Vuex.Store(stores)

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})