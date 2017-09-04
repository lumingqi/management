import LbSidebar from './src/sidebar.vue'

/* istanbul ignore next */
LbSidebar.install = function(Vue) {
    Vue.component(LbSidebar.name, LbSidebar)
}

export default LbSidebar