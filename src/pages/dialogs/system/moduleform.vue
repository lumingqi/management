<template>
    <el-form :model="localdata.form" :rules="getRules" label-width="100px" ref="ruleForm">
        <template v-for="item in module.formField">
            <template v-if="item.type=='input'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-input v-model="localdata.form[item.field]"></el-input>
                </el-form-item>
            </template>
            <template v-if="item.type=='constant'">
                <el-form-item :label="item.label" :prop="item.prop">
                    {{item.field}}
                </el-form-item>
            </template>
            <template v-if="item.type=='getorderPay'">
                <el-form-item :label="item.label" :prop="item.prop">
                    {{getorderPay}}{{item.text}}
                </el-form-item>
            </template>
            <template v-if="item.type=='getorder'">
                <el-form-item :label="item.label" :prop="item.prop">
                    {{getorder}}{{item.text}}
                </el-form-item>
            </template>
            <template v-if="item.type=='text'">
                <el-form-item :label="item.label" :prop="item.prop">
                    {{localdata.form[item.field]}}{{item.text}}
                </el-form-item>
            </template>
            <template v-if="item.type=='datetimetext'">
                <el-form-item :label="item.label" :prop="item.prop">
                    {{getDateFormat(localdata.form[item.field])}}
                </el-form-item>
            </template>
            <template v-if="item.type=='vmsubtext'">
                <el-form-item :label="item.label">
                    {{getSubText('vm',item.prop,item.subprop)}}{{item.text}}
                </el-form-item>
            </template>
            <template v-if="item.type=='orderpaystudent'">
                <template v-if="currStudent.amount > 0 && order.order_type != 2">
                    <el-form-item :label="item.label">
                        {{currStudent.amount}}元
                        <el-switch v-model="localdata.form[item.fieldActive]" on-text="" off-text="" :field="item.fieldActive" @change="numberChange">
                        </el-switch>
                    </el-form-item>
                    <el-form-item v-if="localdata.form[item.fieldActive]">
                        <lb-numberinput v-model="localdata.form[item.field]" :text="item.text" :field="item.field" @change="numberChange"></lb-numberinput>
                    </el-form-item>
                </template>
            </template>
            <template v-if="item.type=='getDatetimeFormat'">
                <el-form-item :label="item.label" :prop="item.prop">
                    {{getDatetimeFormat(localdata.form[item.field])}}
                </el-form-item>
            </template>
            <template v-if="item.type=='phoneInput'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <template v-for="tag in formdata">
                        <el-tag :key="tag" :closable="true" type="success" @close="handleCloseTag(tag)">
                            {{tag.name}}
                        </el-tag>
                    </template>
                    <el-button size="small" @click="changetelshow">{{ module.telshow + '/' + pagination.total}}
                        <template v-if="module.telshow < pagination.total">点击加载更多</template>
                    </el-button>
                </el-form-item>
            </template>
            <template v-if="item.type=='addphone'">
                <el-form-item :label="item.switchlabel">
                    <el-switch v-model="localdata.form[item.fieldActive]" on-text="" off-text="">
                    </el-switch>
                </el-form-item>
                <template v-if="localdata.form[item.fieldActive]">
                    <el-form-item label="名字" :prop="item.prop1">
                        <el-input v-model="localdata.form.new_name"></el-input>
                    </el-form-item>
                    <el-form-item label="号码" :prop="item.prop2">
                        <el-input v-model="localdata.form.new_tel"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">添加</el-button>
                    </el-form-item>
                </template>
            </template>
            <template v-if="item.type=='subduction'">
                <el-form-item :label="item.label" :prop="item.prop">
                    {{localdata.form[item.field1]-localdata.form[item.field2]}}{{item.text}}
                </el-form-item>
            </template>
            <template v-if="item.type=='addition'">
                <el-form-item :label="item.label" :prop="item.prop">
                    {{Number(localdata.form[item.field1])+Number(localdata.form[item.field2])}}
                </el-form-item>
            </template>
            <template v-if="item.type=='textTag'">
                <el-form-item :label="item.label">
                    <el-tag :type="item.color">{{localdata.form[item.field]}}{{item.text}}</el-tag>
                </el-form-item>
            </template>
            <template v-if="item.type=='numberinput'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <lb-numberinput v-model="localdata.form[item.field]" :text="item.text" :field="item.field" @change="numberChange" :disabled="item.disabled"></lb-numberinput>
                </el-form-item>
            </template>
            <template v-if="item.type=='datetime'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-date-picker :type="item.datetype" placeholder="选择日期" v-model="localdata.form[item.field]" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </template>
            <template v-if="item.type=='textarea'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-input type="textarea" v-model="localdata.form[item.field]" style="width: 100%;"></el-input>
                </el-form-item>
            </template>
            <template v-if="item.type=='radiogroup'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-radio-group v-model="localdata.form[item.field]">
                        <template v-for="(value,index) in item.labels">
                            <el-radio-button :label="index">{{value.label}}</el-radio-button>
                        </template>
                    </el-radio-group>
                </el-form-item>
            </template>
            <template v-if="item.type=='inputselect'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-input placeholder="请输入内容" v-model="localdata.form[item.field]">
                        <el-select v-model="localdata.form[item.field]" slot="prepend" placeholder="请选择">
                            <template v-for="dataitem in getSelectData(item)">
                                <el-option :label="dataitem.text" :value="dataitem.text">{{dataitem.text}}</el-option>
                            </template>
                        </el-select>
                    </el-input>
                </el-form-item>
            </template>
            <template v-if="item.type=='option'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-select v-model="localdata.form[item.field]" multiple placeholder="请选择" style="width: 100%;">
                        <el-option v-for="value in getroleData" :key="value._id" :label="value.name" :value="value._id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-if="item.type=='switchdiscount'">
                <el-form-item :label="item.switchlabel1">
                    <el-switch v-model="localdata.form[item.fieldActive1]" on-text="" off-text="" :field="item.fieldActive1" @change="numberChange">
                    </el-switch>
                </el-form-item>
                <template v-if="localdata.form[item.fieldActive1]">
                    <el-form-item :label="item.switchlabel2">
                        <lb-numberinput v-model="localdata.form[item.field2]" :text="item.text2" :field="item.field2" @change="numberChange"></lb-numberinput>
                    </el-form-item>
                    <el-form-item>
                        <lb-numberinput v-model="localdata.form[item.field1]" :text="item.text1" :field="item.field1" @change="numberChange"></lb-numberinput>
                    </el-form-item>
                </template>
            </template>
            <template v-if="item.type=='switchdatetime'">
                <el-form-item :label="item.label">
                    <el-switch v-model="localdata.form[item.fieldActive]" on-text="" off-text="">
                    </el-switch>
                </el-form-item>
                <el-form-item v-if="localdata.form[item.fieldActive]">
                    <el-date-picker type="datetime" v-model="localdata.form[item.field]"></el-date-picker>
                </el-form-item>
            </template>
            <template v-if="item.type=='switchnumber'">
                <el-form-item :label="item.label">
                    <el-switch v-model="localdata.form[item.fieldActive]" on-text="" off-text="" :field="item.fieldActive" @change="numberChange">
                    </el-switch>
                </el-form-item>
                <el-form-item v-if="localdata.form[item.fieldActive]">
                    <lb-numberinput v-model="localdata.form[item.field]" :text="item.text" :field="item.field" @change="numberChange"></lb-numberinput>
                </el-form-item>
            </template>
            <template v-if="item.type=='timetype'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-time-picker v-model="localdata.form[item.field]" placeholder="选择时间" is-range style="width: 100%;" minTime="00:00">
                    </el-time-picker>
                </el-form-item>
            </template>
            <template v-if="item.type=='selectSearch'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <lb-selectesearch v-model="localdata.form[item.field]" :field="item.field" @change="selectChange" :table="item.table" selected="" :default="item.text" :showdialog="item.showdialog" :searchfield="item.search"></lb-selectesearch>
                </el-form-item>
            </template>
            <template v-if="item.type=='select'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-select v-model="localdata.form[item.field]" placeholder="请选择" style="width: 100%;">
                        <el-option v-for="value in getDictData(getDistNum(item))" :key="value._id" :label="value.text" :value="value._id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-if="item.type=='switch'">
                <el-form-item :label="item.label" :prop="item.prop">
                    <el-switch v-model="localdata.form[item.field]" on-text="" off-text="">
                    </el-switch>
                </el-form-item>
            </template>
            <template v-if="item.type=='switchweek'">
                <el-form-item :label="item.label">
                    <el-switch v-model="localdata.form[item.fieldActive]" on-text="" off-text="">
                    </el-switch>
                </el-form-item>
                <el-form-item label="结束日期" :prop="item.prop" :required="true" v-if="localdata.form[item.fieldActive]">
                    <el-date-picker :type="item.datetype" placeholder="选择日期" v-model="localdata.form[item.field]" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item v-if="localdata.form[item.fieldActive]">
                    <el-col :span="15">
                        <label>
                            <input type="checkbox" v-model="localdata.form.day_1" @click="daychange">
                            <span>星期一</span>
                        </label>
                        <label>
                            <input type="checkbox" v-model="localdata.form.day_2" @click="daychange">
                            <span>星期二</span>
                        </label>
                        <label>
                            <input type="checkbox" v-model="localdata.form.day_3" @click="daychange">
                            <span>星期三</span>
                        </label>
                        <label>
                            <input type="checkbox" v-model="localdata.form.day_4" @click="daychange">
                            <span>星期四</span>
                        </label>
                        <label>
                            <input type="checkbox" v-model="localdata.form.day_5" @click="daychange">
                            <span>星期五</span>
                        </label>
                        <label>
                            <input type="checkbox" @click="daychange" v-model="localdata.form.day_6">
                            <span>星期六</span>
                        </label>
                        <label>
                            <input type="checkbox" @click="daychange" v-model="localdata.form.day_0">
                            <span>星期日</span>
                        </label>
                    </el-col>
                    <el-col :span="3">
                        <label>
                            <input type="checkbox" @click="workchange" v-model="workday">
                            <span>工作日</span>
                        </label>
                        <label>
                            <input type="checkbox" @click="workchange" v-model="weekday">
                            <span>周末</span>
                        </label>
                    </el-col>
                </el-form-item>
            </template>
        </template>
    </el-form>
</template>
<script>
import moduleform from '~/stores/moduleform.js'
export default {
    name: 'moduleform',
    props: ['module', 'form'],
    data() {
        var validateNumberinput = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(rule.message))
            } else if (value <= 0) {
                callback(new Error('请输入大于零的数'))
            } else {
                callback()
            }
        }
        var validateTel = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'))
            } else if (!(/^1\d{10}$/.test(value))) {
                callback(new Error('手机号码必须为数字1开头并为11位!已输入' + value.length + '位。'))
            } else {
                callback()
            }
        }
        var validateDatatime = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(rule.message))
            } else {
                if (value.length != 2) {
                    callback(new Error(rule.message))
                } else {
                    callback()
                }
            }
        }
        var validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(rule.message))
            } else if (!(/^1\d{10}$/.test(value))) {
                callback(new Error('手机号码必须为数字1开头并为11位!已输入' + value.length + '位。'))
            } else {
                let telArr = []
                for (let item of this.localdata.form.tel) {
                    telArr.push(item.tel)
                }
                if (telArr.indexOf(value) != '-1') {
                    callback(new Error('号码已存在发送列表中，请核对或者更换新号码'))
                } else {
                    callback()
                }
            }
        }
        var validateDate = (rule, value, callback) => {
            if (value === '') {
                if (this.localdata.form.dayloop) {
                    callback(new Error('请选择日期'))
                } else {
                    callback()
                }
            } else {
                if (this.localdata.form.dayloop) {
                    if (this.getDatetime(this.localdata.form.daterange1) > this.getDatetime(this.localdata.form.daterange2)) {
                        callback(new Error('结束日期要大于开始日期'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
        }
        return {
            moduledata: '',
            currentRow: null,
            validateTel,
            validateDate,
            validateDatatime,
            validatePhone,
            validateNumberinput,
            formdata: [],
            localdata: this.getform(),
            order: {},
            expand: false,
            workday: false,
            weekday: false,
            model: this.module.pageTable,
        }
    },
    created() {
        if (this.module.created) {
            this.module.created(this)
        }
    },
    mounted() {
        if (this.module.mounted) {
            this.module.mounted(this)
        }
        /*
        let vm = this
        if (vm.$store.state.dialogs.dailogdata) {
            vm.order = vm.$store.state.dialogs.dailogdata
            vm.localdata.form.order_id = vm.order._id
            vm.localdata.form.student_id = vm.order.student_id
            vm.localdata.form.classes_id = vm.order.classes_id
            vm.localdata.form.money_pay_amount = vm.order.unpay_amount
            vm.localdata.form.balance_pay_amount = 0
            vm.handleGetTableID('student', vm.order.student_id).then((obj) => {
                if (obj.data && obj.data.length > 0) {
                    vm.currStudent = obj.data[0]
                    if (this.order.order_type != 2) {
                        vm.localdata.form.balance_pay_amount = Number(vm.currStudent.amount)
                        if (vm.localdata.form.balance_pay_amount > vm.localdata.form.money_pay_amount) {
                            vm.localdata.form.balance_pay_amount = vm.localdata.form.money_pay_amount
                            vm.localdata.form.money_pay_amount = 0
                        }
                    }
                }
            })
        }*/
    },
    computed: {
        getorder() {
            let vm = this
            let getorderTurn = parseInt(vm.currentRow.money_pay_amount) - (parseInt(vm.order.c_unit_price) * 2) - parseInt(vm.order.back_amount)
            return getorderTurn
        },
        getorderPay() {
            let vm = this
            let tiem = parseInt(vm.order.c_unit_price) * 2
            console.log(tiem)
            return tiem
        },
        getRules() {
            let rules = null
            if (this.module.rulesData) {
                rules = this.module.rulesData(this)
            } else {
                rules = this.module.rules
            }
            return rules
        },
        getroleData() {
            let role = this.$store.state.models.models.role.data
            if (this.title == '添加') {
                for (var item of role) {
                    if (item.defrole) {
                        if (this.localdata.form.roles_id.indexOf(item._id) == -1) {
                            this.localdata.form.roles_id.push(item._id)
                        }
                    }
                }
            }
            return role
        }
    },
    methods: {
        selectChange(obj) {
            this.$refs['ruleForm'].validateField(obj.field)
            if (this.module.selectChange) {
                this.module.selectChange(this, obj)
            }
        },
        numberChange(obj) {
            if (this.module.numberChange) {
                this.module.numberChange(this, obj)
            }
        },
        handleAdd() {
            this.$refs['ruleForm'].validateField('new_name', (valid) => {
                if (valid == '') {
                    this.$refs['ruleForm'].validateField('new_tel', (validtel) => {
                        if (validtel == '') {
                            let newdata = {}
                            newdata.tel = this.localdata.form.new_tel
                            newdata.name = this.localdata.form.new_name
                            newdata.student_id = 0
                            this.localdata.form.tel.unshift(newdata)
                            this.changetel(this.module.telshow)
                            this.localdata.form.new_tel = ''
                            this.localdata.form.new_name = ''
                        }
                    })
                }
            })
        },
        changetel(telshow) {
            this.pagination.total = this.localdata.form.tel.length
            if (telshow > this.pagination.total) {
                this.module.telshow = this.pagination.total
            } else {
                this.module.telshow = telshow
            }
            if (this.localdata.form.tel) {
                this.formdata = this.localdata.form.tel.slice(0, this.module.telshow)
            }
        },
        changetelshow() {
            this.changetel(this.module.telshow + 10)
        },
        handleCloseTag(tag) {
            this.localdata.form.tel.splice(this.localdata.form.tel.indexOf(tag), 1)
            this.changetel(this.module.telshow)
            // this.changetelshow()
        },
        workchange() {
            this.localdata.form.day_1 = this.workday
            this.localdata.form.day_2 = this.workday
            this.localdata.form.day_3 = this.workday
            this.localdata.form.day_4 = this.workday
            this.localdata.form.day_5 = this.workday
            this.localdata.form.day_6 = this.weekday
            this.localdata.form.day_0 = this.weekday
        },
        daychange() {
            let form = this.localdata.form
            this.workday = form.day_1 && form.day_2 && form.day_3 && form.day_4 && form.day_5
            this.weekday = form.day_6 && form.day_0
        },
        getDistNum(item) {
            return item.dict(this)
        },
        getSelectData(item) {
            let data = null
            if (item.data) {
                data = item.data(this)
            }
            return data
        },
        getform() {
            let localdata = {}
            if (this.form) {
                localdata.form = JSON.parse(JSON.stringify(this.form))
                for (var index in this.module.formField) {
                    let item = this.module.formField[index]
                    if (item.type == "timetype") {
                        localdata.form[item.field][0] = new Date(localdata.form[item.field][0])
                        localdata.form[item.field][1] = new Date(localdata.form[item.field][1])
                    }
                    if (item.type == "datetime") {
                        localdata.form[item.field] = new Date(localdata.form[item.field])
                    }
                }
            } else if (this.module.form) {
                localdata.form = JSON.parse(JSON.stringify(this.module.form))
                for (var index in this.module.formField) {
                    let item = this.module.formField[index]
                    if (item.type == "timetype") {
                        localdata.form[item.field][0] = new Date(localdata.form[item.field][0])
                        let endtime = localdata.form[item.field][1]
                        localdata.form[item.field][1] = moment(endtime).add(1, 'h').toDate()
                    }
                }
            }
            if (this.module.student) {
                localdata.form.student_id = this.getStudentId()
            }
            localdata.form.op_id = this.$store.state.system.id
            localdata.form.op_name = this.$store.state.system.name
            return localdata
        },
        savearrage(item) {
            let vm = this
            let eve = []
            let evnitem = {}
            if (item._id) {
                evnitem._id = item._id
            }
            evnitem.dayloop = item.dayloop
            evnitem.sclasses_id = item.sclasses_id
            evnitem.classes_id = item.classes_id
            evnitem.teacher_id = item.teacher_id
            evnitem.daterange1 = vm.getDatetime(vm.localdata.form.daterange1)
            evnitem.daterange2 = vm.getDatetime(vm.localdata.form.daterange2)
            evnitem.timerange = []
            evnitem.timerange[0] = vm.getDatetime(vm.localdata.form.timerange[0])
            evnitem.timerange[1] = vm.getDatetime(vm.localdata.form.timerange[1])
            evnitem.dayloop = false

            if (item.dayloop) {
                let loopdatastart = evnitem.daterange1
                let loopdataend = evnitem.daterange2
                let loopcount = 0
                while (loopdatastart <= loopdataend) {
                    if (loopcount > 1000) {
                        break
                    }
                    let days = vm.moment(loopdatastart).days()
                    if (item['day_' + days]) {
                        evnitem.start = vm.getDate2timeFormat(loopdatastart, evnitem.timerange[0])
                        evnitem.end = vm.getDate2timeFormat(loopdatastart, evnitem.timerange[1])
                        evnitem.start = this.moment(evnitem.start).toDate()
                        evnitem.end = this.moment(evnitem.end).toDate()
                        let evncpitem = {}
                        evncpitem.days = days
                        Object.assign(evncpitem, evnitem)
                        eve.push(evncpitem)
                    }
                    loopdatastart = vm.moment(loopdatastart).add(1, 'days').toDate().getTime()
                    loopcount++
                }
            } else {
                evnitem.start = vm.getDate2timeFormat(evnitem.daterange1, evnitem.timerange[0])
                evnitem.end = vm.getDate2timeFormat(evnitem.daterange1, evnitem.timerange[1])
                evnitem.start = this.moment(evnitem.start).toDate()
                evnitem.end = this.moment(evnitem.end).toDate()
                let days = vm.moment(evnitem.start).days()
                evnitem.days = days
                eve.push(evnitem)
            }
            if (eve.length > 0) {
                this.mx_db_bulkwrite('coursescheduling', eve).then(response => {
                    vm.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                    vm.lbClosedialog()
                    this.$store.state.dialogs.dailogdata = null
                    this.$store.state.envs.currDialog = 'moduleform'
                })
            } else {
                this.$message({
                    message: '没有选择星期',
                    type: 'success'
                })
            }
        },
        appendarrage() {
            let vm = this
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.savearrage(vm.localdata.form)
                }
            })
        },
        append(id) {
            return new Promise(resolve => {
                if (id) {
                    this.setEditModle(id)
                }
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let vm = this
                        for (var index in this.module.formField) {
                            let item = this.module.formField[index]
                            if (item.type == "datetime") {
                                vm.localdata.form[item.field] = vm.getDatetime(vm.localdata.form[item.field])
                            }
                        }
                        if (this.module.beforeSave) {
                            this.module.beforeSave(this)
                        }
                        // = vm.getDateNumFormat(vm.localdata.form.birth)
                        vm.handleSave().then((response) => {
                            if (this.module.afterSave) {
                                this.module.afterSave(this,response).then((obj)=>{
                                    resolve(obj)
                                })
                            }else{
                                 resolve(response)
                            }
                        }, (e) => {
                        })
                    }
                })
            })
        }
    }
}
</script>
