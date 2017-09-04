<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="btn-group dropdown" dropdown="">
                    <a class="btn btn-default" @click="handleBack">返回</a>
                </div>
                <i class="fa fa-user"></i> 学员信息
            </div>
            <div class="panel-body">
                <div class="bg-white row no-gutter">
                    <div class="col-xs-12 col-md-4">
                        <div class="text-center clear">
                            <div class="face" style="width:120px;margin:0 auto">
                                <div class="avatar-wrapper adres-css" style="border-radius:0; display:block; overflow:hidden;border-radius: 120px; width:120px; height:120px;">
                                    <img :src="makeImage(student.student_name,80)" style="vertical-align:top;" width="100%" height="">
                                </div>
                            </div>
                        </div>
                        <p class="text-center">
                            <lb-dropdown :drop-menu-data="getMenuOption" :menu-data="getStudentInfo">
                                <lb-dropdown-button slot="buttonslot" button-class="btn btn-default m-b-xs" button-tooltip="操作">
                                    <i class="fa fa-cog"></i>
                                    <span> {{ student.student_name }}</span>
                                    <span class="caret"></span>
                                </lb-dropdown-button>
                            </lb-dropdown>
                            <span>
                                <i class="fa" :class="{'fa-female ':student.sex=='2','fa-male':student.sex=='1','mans':student.sex=='1','woman':student.sex=='2'}"></i>
                            </span>
                        </p>
                        <ul class="list-unstyled">
                            <li>
                                <label class="field">昵称/英文名:</label>
                                <span>{{ student.nickname }}</span>
                            </li>
                            <li class="m-t-xs">
                                <label class="field">学员归属:</label>
                                <span class="label bg-info">{{getEmployeeName}}</span>
                            </li>
                        </ul>
                        <div>
                            <el-button @click="deleteStudent" style="color:red;" type="text">封存档案</el-button>
                        </div>
                        <div>
                            <el-popover ref="popover" placement="right" trigger="click">
                                <img :src="qrcodeimg">
                            </el-popover>
                            <el-button @click="handleQrcode()" type='text' v-popover:popover>我的二维码</el-button>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-8">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <i class="icon-info"></i> 基础信息</div>
                            <div class="panel-body">
                                <div class="row no-gutter">
                                    <div class="col-xs-12 col-md-6">
                                        <label class="inline w-xs text-right">住址:</label>
                                        <span>{{ student.home_address }}</span>
                                    </div>
                                    <div class="col-xs-12 col-md-6">
                                        <label class="inline w-xs text-right">备注:</label>
                                        <span>{{ student.note }}</span>
                                    </div>
                                    <div class="col-xs-12 col-md-6">
                                        <label class="inline w-xs text-right">学校:</label>
                                        <span>{{ student.school }}</span>
                                    </div>
                                    <div class="col-xs-12 col-md-6">
                                        <label class="inline w-xs text-right">年级:</label>
                                        <span>{{ student.grade }}</span>
                                    </div>
                                    <div class="col-xs-12 col-md-6">
                                        <label class="inline w-xs text-right">班级:</label>
                                        <span>{{ student.class }}</span>
                                    </div>
                                    <div class="col-xs-12 col-md-6">
                                        <label class="inline w-xs text-right">建档日期:</label>
                                        <span>{{ getDateFormat(student.creattime) }}</span>
                                    </div>
                                    <div class="col-xs-12 col-md-6">
                                        <label class="inline w-xs text-right">生日:</label>
                                        <span class="text-info">{{ getDateFormat(student.birth) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-table :data="relation" stripe>
                            <el-table-column prop="tel" label="电话">
                            </el-table-column>
                            <el-table-column prop="rel" width="100" label="关系">
                            </el-table-column>
                            <el-table-column prop="name" label="名字">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper" tab-nav-link="student.list">
            <el-tabs type="border-card" @tab-click="showTab">
                <template v-for="(item,index) in moduledata">
                    <el-tab-pane :label="item.pageLable">
                        <template v-if="index==tabIndex">
                            <lb-systemmodule :module="item" :info="true" :search-value="$store.state.envs.currStudent._id" ></lb-systemmodule>
                        </template>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </div>
    </div>
</template>
<style>
.el-table__body-wrapper {
    overflow: hidden;
}
</style>

<script>
import systemmodule from '~/pages/views/system/module.vue'
import pagesmodule from '~/stores/modulestudentinfo.js'
import getUrl from '~/api/restfulapi.js'
export default {
    name: 'footer',
    data() {
        let localdata = {
            'form': {
                'student_id': '',
                'relations': [],
                'first_rel_rel': '',
                'first_tel': '',
                'first_rel_name': '',
            },
            'lookup': {
                'localField': 'region_oe_id',
                'from': 'employee',
                'foreignField': '_id',
                'as': 'employee'
            },
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
        return {
            moduledata: pagesmodule,
            localdata,
            activeName: '1',
            student: {},
            relation: [],
            tabIndex: '',
            tables: ['student'],
            uid: '',
            qrcodeimg: '',
            options: [{
                value: '0',
                label: '本人'
            }, {
                value: '1',
                label: '爸爸'
            }, {
                value: '2',
                label: '妈妈'
            }],
            rules: {
                first_tel: [
                    { validator: validateTel, required: true, trigger: 'blur' }
                ],
            }
        }
    },
    components: {
        'lb-systemmodule': systemmodule
    },
    mounted() {
        let currStudent = this.$store.state.envs.currStudent
        if (currStudent && currStudent._id && currStudent._id.length > 0) {
            this.uid = currStudent._id
            this.$store.commit('student', this.uid)
            this.handleSearch()
        } else {
            this.uid = this.$store.state.system.currStudentID
            if (this.uid) {
                this.handleSearch()
            }
        }
    },
    computed: {
        getEmployeeName() {
            let name = '未设定'
            if (this.student.employee && this.student.employee.length > 0) {
                name = this.getLookUp(this.student.employee, 'name')
            }
            if (this.$store.state.envs.currDialog == 'lb-editstudentinfo') {
                this.handleSearch()
                this.$store.state.envs.currDialog = ''
            }
            return name
        },
        getStudentInfo() {
            return this.student
        },
    },
    watch: {},
    methods: {
        showTab(tab, event) {
            this.tabIndex = tab.index
        },
        handleQrcode() {
            console.log(this.uid)
            getUrl.httpGetUrlQccode(this.uid).then(obj => {
                console.log(obj)
                console.log(obj.data.ticket)
                this.qrcodeimg = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + obj.data.ticket
            })
            /*     Vue.http.get('http://app.bullstech.cn:8888/wxqrcode/'+this.uid).then(obj=>{
                     console.log(obj)
                 })  */
        },
        handleBack() {
            this.$store.commit('router', this.$store.state.system.routerback)
        },
        deleteStudent() {
            let vm = this
            this.$confirm('确定要封存该学员档案吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                vm.updateTeble('student', vm.student._id, {
                    'isdel': true
                }).then(() => {
                    vm.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                    this.$store.commit('router', this.$store.state.system.routerback)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        handleSearch() {
            if (this.uid && this.uid.length > 0) {
                let filterObj = []
                let student_id = this.uid
                if (student_id.length > 0) {
                    filterObj.push({
                        'key': '_id',
                        'value': student_id,
                        'type': ''
                    })
                }
                filterObj.push({
                    'key': 'lookup',
                    'value': this.localdata.lookup,
                    'type': 'lookup'
                })
                let filterTxt = this.base64.encode(JSON.stringify(filterObj))
                this.handleGetFilterTable(filterTxt).then(() => {
                    this.student = this.$store.state.models.models.student.data[0]
                    this.localdata.form = this.lodash.assign(this.localdata.form, this.student)
                    let obj = {}
                    this.relation = []
                    obj.tel = this.student.first_tel
                    obj.rel = this.getDictText('1', this.student.first_rel_rel)
                    obj.name = this.student.first_rel_name
                    this.relation.push(obj)
                    this.student.relations.forEach(relobj => {
                        let objitem = {}
                        objitem.tel = relobj.tel
                        objitem.rel = this.getDictText('1', relobj.relation)
                        objitem.name = relobj.name
                        this.relation.push(objitem)
                    })
                    console.log(this.student, this.relation)
                })
            }
        },
        rest_save() {
            let student_id = this.uid
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.updateTeble('student', student_id, {
                        'first_rel_rel': this.localdata.form.first_rel_rel,
                        'first_tel': this.localdata.form.first_tel,
                        'first_rel_name': this.localdata.form.first_rel_name,
                        'relations': this.localdata.form.relations
                    }).then(() => {
                        this.lbClosedialog()
                        this.$store.state.envs.currDialog = 'lb-paynow'
                        this.dopay = true
                    })
                }
            })
        },
    }
}
</script>


