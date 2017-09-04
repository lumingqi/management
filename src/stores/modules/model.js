import restfulapi from '~/api/restfulapi'
import * as types from './mutation-types'

const state = {
    models: {
        student: {
            data: []
        },
        inquiry: {
            data: []
        },
        employee: {
            data: []
        },
        role: {
            data: []
        },
        classes: {
            data: []
        },
        dictionary: {
            data: []
        },
        course: {
            data: []
        },
        cate: {
            data: []
        },
        sclasses: {
            data: []
        },
        flow: {
            data: []
        },
        campus: {
            data: []
        },
        trash: {
            data: []
        },
        selstudent: {
            data: []
        },
        order: {
            data: []
        },
        recording: {
            data: []
        },
        pay: {
            data: []
        },
        announcement: {
            data: []
        },
        refund: {
            data: []
        },
        arrange: {
            data: []
        },
        org: {
            data: []
        },
        suspend: {
            data: []
        },
        leaves: {
            data: []
        },
        attendance: {
            data: []
        },
        charge: {
            data: []
        },
        cart: {
            data: []
        },
        oder: {
            data: []
        },
        money: {
            data: []
        },
        sms: {
            data: []
        }
    },
    currentModel: {},
    login: true
}

// getters
const getters = {
    getCurrentModel: state => {
        return state.currentModel
    }
}

// actions
const actions = {
        [types.GET_API]({ commit }, tableName) {
            return new Promise(resolve => {
                restfulapi.httpGetApi(tableName)
                    .then(response => {
                        commit(types.GET_API, { tableName, response })
                        resolve(response)
                    })
                    .catch(function(response) {
                        if (response.status == 401) {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },
        [types.GET_Filter_API]({ commit }, obj) {
            return new Promise(resolve => {
                restfulapi.httpGetFilterApi(obj)
                    .then(response => {
                        commit(types.GET_API, { 'tableAlias': obj.alias, 'tableName': obj.model, response })
                        resolve(response)
                    })
                    .catch(function(response) {
                        if (response.status == 401) {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },
        [types.GET_ARRAY_API]({ commit }, tableName) {
            let tableArray = []
            tableName.forEach(function(item) {
                tableArray.push(restfulapi.httpGetApi(item))
            })

            return new Promise(resolve => {
                Promise.all(tableArray)
                    .then(response => {
                        response.forEach(item => {
                            commit(types.GET_API, { 'tableName': item.data.name, 'response': item })
                        })
                        resolve()
                    })
                    .catch(function(response) {
                        if (response.status == 401) {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },
        [types.GET_ID_API]({ commit }, obj) {
            let id = obj.id
            return new Promise(resolve => {
                restfulapi.httpGetIdApi(obj)
                    .then(response => {
                        commit(types.GET_API, { id, response })
                        resolve(response)
                    })
                    .catch(function(response) {
                        if (response.status == 401) {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },
        [types.LOGIN_API]({ commit }, obj) {
            return new Promise(resolve => {
                restfulapi.httpLoginApi(obj)
                    .then((response) => {
                        if (response.status == 200 && response.data && response.data.code == 0) {
                            commit(types.LOGIN_API, { login: true, data: response.data.token, nowtime: response.data.nowtime })
                        } else {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                        resolve(response.data)
                    })
                    .catch(function(response) {

                    })
            })
        },
        [types.BULK_API]({ commit }, obj) {
            return new Promise(resolve => {
                restfulapi.httpBulkApi(obj)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch(function(response) {
                        if (response.status == 401) {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },

        [types.APPEND_API]({ commit }, obj) {
            return new Promise(resolve => {
                restfulapi.httpAppendApi(obj)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch(function(response) {
                        if (response.status == 401) {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },

        [types.EDIT_API]({ commit }, obj) {
            return new Promise(resolve => {
                restfulapi.httpEditApi(obj)
                    .then((response) => {
                        //commit(types.APPEND_API, { tableName, response })
                        resolve(response.data)
                    })
                    .catch(function(response) {
                        if (response.status == 401) {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },
        [types.DELETE_API]({ commit }, obj) {
            return new Promise(resolve => {
                restfulapi.httpDeleteApi(obj)
                    .then(() => {
                        //commit(types.APPEND_API, { tableName, response })
                        resolve()
                    })
                    .catch(function(response) {
                        if (response.status == 401) {
                            commit(types.LOGIN_API, { login: false, data: '' })
                        }
                    })
            })
        },
    }
    // mutations
const mutations = {
    [types.GET_API](state, { tableAlias, tableName, response }) {
        if (response.data.nowtime) {
            window.localStorage.setItem('tokentime', response.data.nowtime)
        }
        if (tableAlias) {
            state.models[tableAlias] = response.data
        } else {
            state.models[tableName] = response.data
        }

    },
    [types.LOGIN_API](state, obj) {
        state.login = obj.login
        window.localStorage.setItem('tokentime', obj.nowtime)
        window.localStorage.setItem('token', obj.data)
    },
    [types.GET_CURRENT_API](state, tableName) {
        state.currentModel[tableName] = state.models[tableName]
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}