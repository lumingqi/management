import * as types from '~/stores/modules/mutation-types'
import makeimage from '~/api/makeImage.js'
import base64 from '~/api/base64.js'
import menu from '~/stores/menu.js'

moment.updateLocale('en', {
    relativeTime: {
        future: '%s',
        past: '%s',
        s: '',
        m: 'a minute',
        mm: '%d分钟',
        h: 'an hour',
        hh: '%d小时',
        d: 'a day',
        dd: '%d天',
        M: 'a month',
        MM: '%d月',
        y: 'a year',
        yy: '%d岁'
    }
})

export default {
    created: function() {
        this.modalsType = types.APPEND_API
        this._id = ''
        this.lodash = _
        this.makeImage = makeimage
        this.base64 = base64
        this.types = types
        this.pagination = {}
        this.moment = moment
        this.pagination.currentPage = 1
        this.pagination.total = 0
        this.pagination.pagesize = 10
        this.pagination.pagesizes = [5, 10, 20, 50, 100, 500]
    },
    mounted: function() {
        this.handleGetTable()
    },
    computed: {
        getMenuOption() {
            let menuOption = []
            let to = this.$store.state.system.router
            for (var item of menu) {
                if (item.to == to) {
                    if (item.dropDownMenu) {
                        menuOption = item.dropDownMenu
                    }
                    break
                } else {
                    if (item.menu) {
                        for (var subitem of item.menu) {
                            if (subitem.to == to) {
                                if (subitem.dropDownMenu) {
                                    menuOption = subitem.dropDownMenu
                                }
                                break
                            } else {
                                if (subitem.submenu) {
                                    for (var value of subitem.submenu) {
                                        if (value.to == to) {
                                            if (value.dropDownMenu) {
                                                menuOption = value.dropDownMenu
                                            }
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return menuOption
        }
    },
    methods: {
        getTotalAmout(orders) {
            var totalamount = 0
            if (orders) {
                for (var item of orders) {
                    totalamount += Number(item.order_amount)
                }
            }
            return parseFloat(totalamount).toFixed(2)
        },
        getPayAmout(orders) {
            var payamount = 0
            var totalamount = 0
            if (orders) {
                for (var item of orders) {
                    totalamount += Number(item.order_amount)
                }
                for (var item of orders) {
                    payamount += Number(item.unpay_amount)
                }
            }
            return parseFloat(totalamount - payamount).toFixed(2)
        },
        handleRouter(event, item) {
            this.$store.state.envs.currStudent = item
            this.$store.commit('router', '/student/info')
            event.stopPropagation()
        },
        getRole(role) {
            if (this.$store.state.system.tel == 'luban') {
                return true
            }
            if (this.$store.state.system.roles) {
                for (var item of this.$store.state.system.roles) {
                    if (item.authority && item.authority.indexOf(role) > -1) {
                        return true
                    }
                }
            }
            return false
        },
        getActionOption(key) {
            if (key == undefined) {
                return false
            }
            return this.getRole(key + '_opt')
        },
        getToFixed(amount) {
            return parseFloat(amount).toFixed(2)
        },
        getDatetimeStartOf(value, end) {
            let datetime = moment().startOf(value)
            if (end) {
                datetime = moment().endOf(value)
            }
            return datetime.toDate().getTime()
        },
        getDatetimeStartEndOf(value, end) {
            let datetime = moment(value)
            if (datetime.isValid()) {
                if (end) {
                    datetime = datetime.endOf('month')
                } else {
                    datetime = datetime.startOf('month')
                }
            }
            return datetime.toDate().getTime()
        },
        getDatetimeEndOf(value) {
            let datetime = moment(value)
            if (datetime.isValid()) {
                datetime = datetime.endOf('day')
            }
            return datetime.toDate().getTime()
        },
        fromNow(datestring) {
            let dateTemp = moment(datestring)
            let fromNowStr = ''
            if (dateTemp.isValid()) {
                fromNowStr = dateTemp.fromNow()
            }
            return fromNowStr
        },
        getButtongroupText(obj, value) {
            let result = ''
            if (obj.length > 0) {
                let findobj = this.lodash.find(obj, { 'value': value })
                if (findobj) {
                    result = findobj.text
                }
            }
            return result
        },
        getDatetime(datestring) {
            let dateTemp = moment(datestring)
            let datetimestr = 0
            if (dateTemp.isValid()) {
                datetimestr = dateTemp.toDate().getTime()
            }
            return datetimestr
        },
        getDate2timeFormat(datestring, timestring) {
            let dateTemp = moment(datestring)
            let timeTemp = moment(timestring)
            let datetimestr = ''
            let timestr = ''
            if (dateTemp.isValid()) {
                datetimestr = dateTemp.format('YYYY-MM-DD')
            }
            if (timeTemp.isValid()) {
                timestr = timeTemp.format(' H:mm')
            }
            return datetimestr + timestr
        },
        getDatetimeFormat(datestring) {
            let dateTemp = moment(datestring)
            let datetimestr = ''
            if (dateTemp.isValid()) {
                datetimestr = dateTemp.format('YYYY-MM-DD H:mm')
            }
            return datetimestr
        },
        getDatetimeRanget(starttime, endtime) {
            let startTemp = moment(starttime)
            let endTemp = moment(endtime)
            let starttimestr = ''
            let endtimestr = ''
            if (startTemp.isValid()) {
                starttimestr = startTemp.format('H:mm')
            }
            if (endTemp.isValid()) {
                endtimestr = endTemp.format('H:mm')
            }
            return starttimestr + '--' + endtimestr
        },
        getDateNumFormat(datestring) {
            let dateTemp = moment(datestring)
            let datetimestr = 0
            if (dateTemp.isValid()) {
                datetimestr = dateTemp.format('MMDD')
            }
            return Number(datetimestr)
        },
        getDateFormat(datestring) {
            let dateTemp = moment(datestring)
            let datetimestr = ''
            if (dateTemp.isValid()) {
                datetimestr = dateTemp.format('YYYY-MM-DD')
            }
            return datetimestr
        },
        setEditModle(id) {
            this.modalsType = types.EDIT_API
            this._id = id
        },
        getStudentName() {
            return this.$store.state.envs.currStudent.student_name
        },
        getStudentId() {
            return this.$store.state.envs.currStudent._id
        },
        getSubText(item, prop, subprop) {
            let text = ''
            let obj = item
            if (item == 'vm') {
                obj = this
            }
            if (obj) {
                if (obj[prop]) {
                    if (typeof(obj[prop][subprop]) != 'undefined') {
                        text += obj[prop][subprop]
                    }
                }
            }
            return text
        },
        getDictDefvalue(type) {
            let value = ''
            let tablaData = []
            let tablaName = 'dictionary'
            tablaData = this.$store.state.models.models[tablaName].data
            for (var i = 0; i < tablaData.length; i++) {
                if (tablaData[i].type == type) {
                    if (tablaData[i].defvalue) {
                        value = tablaData[i]._id
                        break
                    }
                }
            }
            return value
        },
        getDictText(type, value) {
            let text = ''
            let tablaData = []
            let tablaName = 'dictionary'
            tablaData = this.$store.state.models.models[tablaName].data
            for (var i = 0; i < tablaData.length; i++) {
                if (tablaData[i].type == type) {
                    if (tablaData[i]._id == value) {
                        text = tablaData[i].text
                    }
                }
            }
            return text
        },
        getDictData(type) {
            let tablaData = []
            let tablaName = 'dictionary'
            tablaData = this.$store.state.models.models[tablaName].data
            let tablaDatas = []
            for (var i = 0; i < tablaData.length; i++) {
                if (tablaData[i].type == type) {
                    tablaDatas.push(tablaData[i])
                }
            }
            return tablaDatas
        },
        getTablesData() {
            let tablaData = []
            if (this.tables) {
                let tablaName = this.tables[0]
                if (this.alias) {
                    tablaName = this.alias
                }
                tablaData = this.$store.state.models.models[tablaName].data
                this.pagination.total = this.$store.state.models.models[tablaName].count
            }
            return tablaData
        },
        handleShowDialog(url, menuData) {
            this.$store.commit('pushdialog', { url, menuData })
        },
        lbShowdialog(event, url) {
            console.log(url)
            if (event) event.preventDefault()
            this.$store.commit('pushdialog', { url })
        },
        lbClosedialog() {
            this.$store.state.envs.currDialog = ''
            this.$store.state.envs.currDialogResult = null
            this.$store.commit('popdialog')
        },
        handlelookup() {
            let filterObj = []
            filterObj.push({
                'key': 'lookup',
                'value': this.localdata.lookup,
                'type': 'lookup'
            })

            let filterTxt = base64.encode(JSON.stringify(filterObj))
            this.handleGetFilterTable(filterTxt)
        },
        handleGetFilterTableTable(model, filter) {
            let vm = this
            return new Promise((resolve, reject) => {
                let table = {}
                table.model = model
                table.filter = filter
                table.alias = this.alias
                table.prepage = this.pagination.pagesize
                table.page = this.pagination.currentPage - 1
                vm.$store.dispatch(types.GET_Filter_API, table).then((response) => {
                    this.pagination.total = response.data.count
                    resolve(response)
                })
            })
        },
        handleGetFilterTable(filter) {
            let vm = this
            return new Promise((resolve, reject) => {
                if (vm.tables) {
                    let table = {}
                    table.model = vm.tables[0]
                    table.filter = filter
                    table.alias = this.alias
                    table.prepage = this.pagination.pagesize
                    table.page = this.pagination.currentPage - 1
                    vm.$store.dispatch(types.GET_Filter_API, table).then((response) => {
                        resolve(response)
                    })
                } else {
                    reject()
                }
            })
        },
        handleGetTableID(model, id) {
            let vm = this
            return new Promise((resolve) => {
                let table = {}
                table.model = model
                table.id = id
                vm.$store.dispatch(types.GET_ID_API, table).then((response) => {
                    resolve(response)
                })
            })
        },
        getTableApidata(table) {
            let vm = this
            return new Promise((resolve) => {
                if (table) {
                    vm.$store.dispatch(types.GET_API, table).then((response) => {
                        resolve(response)
                    })
                }
            })
        },
        handleGetTable() {
            let vm = this
            if (this.handleSearch) {
                this.handleSearch()
            } else {
                if (vm.tables) {
                    vm.$store.dispatch(types.GET_ARRAY_API, vm.tables).then(() => {
                        //this.getTablesData()
                    })
                }
            }
        },
        handleDelete(id) {
            let vm = this
            return new Promise((resolve, reject) => {
                if (vm.tables) {
                    let table = {}
                    table.model = vm.tables[0]
                    table.id = id

                    vm.$store.dispatch(types.DELETE_API, table).then(() => {
                        // console.log('handleDelete')
                        resolve()
                    }).catch((error) => {
                        reject()
                            //console.log(error, 'Promise error')
                    })

                } else {
                    reject()
                }
            })
        },
        updateTeble(table, id, data) {
            let vm = this
            return new Promise((resolve, reject) => {
                vm.$store.dispatch(types.EDIT_API, {
                    'model': table,
                    'id': id,
                    'form': data,
                }).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject()
                    console.log(error, 'Promise error')
                })
            })
        },
        mx_db_bulkwrite(model, modalform) {
            let vm = this
            return new Promise((resolve, reject) => {
                vm.$store.dispatch(types.BULK_API, {
                    'model': model,
                    'form': modalform,
                }).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject()
                    console.log(error, 'Promise error')
                })
            })
        },
        handleSave(form) {
            let vm = this
            let modalform = form ? form : vm.localdata.form
            return new Promise((resolve, reject) => {
                vm.changeFormDateTime(modalform)
                if (vm.localdata.validator && vm.localdata.validator.errorStatus) {
                    reject()
                    return
                }

                if (vm.modalsType == types.APPEND_API) {
                    let creattime = new Date()
                    modalform.creattime = creattime.getTime()

                    vm.$store.dispatch(types.APPEND_API, {
                        'model': vm.model,
                        'form': modalform
                    }).then((response) => {
                        resolve(response)
                    }).catch((error) => {
                        reject()
                        console.log(error, 'Promise error')
                    })
                } else {
                    vm.$store.dispatch(types.EDIT_API, {
                        'model': vm.model,
                        'id': vm._id,
                        'form': modalform,
                    }).then((response) => {
                        resolve(response)
                    }).catch((error) => {
                        reject()
                        console.log(error, 'Promise error')
                    })
                }
                //console.log(modalform, vm.modalsType)
            })
        },
        changeFormDateTime(modalform) {
            let vm = this
            let descriptor = vm.localdata.validator
            if (descriptor) {
                for (var item in descriptor.fields) {
                    if (descriptor.fields[item].type == 'date') {
                        let dateValue = modalform[item]
                        let dataTemp = new Date(dateValue)
                        modalform[item] = dataTemp.getTime()
                    }
                }
            }
        },
        handleValidateErrors(errors, filed) {
            let vm = this
            if (filed) {
                if (errors[filed]) {
                    vm.localdata.validator.fields[filed].errorStatus = true
                }
            } else {
                for (var err in errors) {
                    vm.localdata.validator.fields[err].errorStatus = true
                }
            }
        },
        validate(filed) {
            let vm = this
            let modalform = vm.localdata.form
            let descriptor = vm.localdata.validator

            if (descriptor) {
                vm.localdata.validator.errorStatus = false
                if (filed) {
                    descriptor.fields[filed].errorStatus = false
                } else {
                    for (var item in descriptor.fields) {
                        descriptor.fields[item].errorStatus = false
                    }
                }
                let validator = new schema(descriptor)
                schema.plugin(schemaall)
                validator.validate(modalform, (errors, fields) => {
                    if (fields && fields.errors && fields.errors.length > 0) {
                        vm.localdata.validator.errorStatus = true
                        return vm.handleValidateErrors(fields.fields, filed)
                    }
                })
            }

        },
        getLookUp(obj, key) {
            let result = null
            if (obj && obj.length > 0) {
                if (key) {
                    result = obj[0][key]
                } else {
                    result = obj[0]
                }
            }
            return result
        },
        handleSizeChange(value) {
            this.pagination.pagesize = value
            this.handleGetTable()
        },
        handleCurrentChange(value) {
            this.pagination.currentPage = value
            this.handleGetTable()
        }
    }
}