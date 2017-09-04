import LbDropdown from './dropdown.vue'
import LbDropdownButton from './dropdownbutton.vue'

LbDropdown.install = function(Vue) {
    Vue.component(LbDropdown.name, LbDropdown)
}

export default { LbDropdown, LbDropdownButton }
