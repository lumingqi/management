const state = {
    wallpaper: 'wood.jpg',
    id: '',
    name: '',
    tel: '',
    face: '',
    birth: '',
    login: false,
    roles: [],
    theme: 'rgba(208, 150, 21, 0.8)',
    routerback: '',
    router: '',
    currStudentID: '',
    isModlues: true,

}
const getters = {}
const actions = {}

const mutations = {
    wallpaper: (state, obj) => {
        state.wallpaper = obj
        window.localStorage.setItem('system', JSON.stringify(state))
    },
    theme: (state, obj) => {
        state.theme = obj
        window.localStorage.setItem('system', JSON.stringify(state))
    },
    class: (state, obj) => {
        state.currClassID = obj
        window.localStorage.setItem('system', JSON.stringify(state))
    },
    student: (state, obj) => {
        state.currStudentID = obj
        window.localStorage.setItem('system', JSON.stringify(state))
    },
    router: (state, obj) => {
        console.log(obj)
        state.routerback = state.router
        state.router = obj
        window.localStorage.setItem('system', JSON.stringify(state))
    },
    user: (state, obj) => {
        state.name = obj.name
        state.id = obj._id
        state.tel = obj.tel
        state.birth = obj.birth
        state.roles = obj.roles
        window.localStorage.setItem('system', JSON.stringify(state))
    },
    system: (state, obj) => {
        state.routerback = obj.routerback
        state.currStudentID = obj.currStudentID
        state.currClassID = obj.currClassID
        state.router = obj.router
        state.wallpaper = obj.wallpaper
        state.theme = obj.theme
        state.name = obj.name
        state.id = obj.id
        state.tel = obj.tel
        state.birth = obj.birth
        state.roles = obj.roles
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}