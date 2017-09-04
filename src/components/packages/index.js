import dropdown from './dropdown/'
import buttongroup from './buttongroup/'
import listtree from './listtree/'
import numberinput from './numberinput/'
import lessonhours from './lessonhours/'
import lessonprice from './lessonprice/'
import lessontype from './lessontype/'
import studentrouter from './studentrouter/'
import studenttracksadd from './studenttracksadd/'
import lasttrack from './lasttrack/'
import checkstatus from './checkstatus/'
import checkweek from './checkweek/'
import selectesearch from './selectesearch/'
import Sidebar from './sidebar/'

const components = [
    dropdown.LbDropdown,
    dropdown.LbDropdownButton,
    buttongroup,
    listtree,
    numberinput,
    lessonhours,
    lessonprice,
    lessontype,
    studentrouter,
    studenttracksadd,
    lasttrack,
    checkstatus,
    checkweek,
    selectesearch,
    Sidebar
]
const install = function(Vue) {
    if (install.installed) return

    components.map(component => {
        Vue.component(component.name, component)
    })
}
export default {
    version: '1.0.1',
    install,
    dropdown,
    buttongroup,
    listtree,
    numberinput,
    lessonhours,
    lessonprice,
    lessontype,
    studentrouter,
    studenttracksadd,
    lasttrack,
    checkstatus,
    checkweek,
    selectesearch,
    Sidebar
}