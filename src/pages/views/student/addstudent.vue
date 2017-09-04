<template>
    <el-form :model="localdata.form" :rules="rules" label-width="100px" ref="ruleForm">
        <el-form-item label="姓名" prop="student_name">
            <el-input v-model="localdata.form.student_name" style="width:120px;" placeholder="请输入学员姓名"></el-input>
            <el-radio-group v-model="localdata.form.sex">
                <template v-for="sex in localdata.sex">
                    <el-radio-button :label="sex.value" class="normalfont">{{sex.text}}</el-radio-button>
                </template>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" prop="first_tel">
            <el-input v-model="localdata.form.first_tel" style="width:120px;" placeholder="请输入手机号"></el-input>
            <el-select v-model="localdata.form.first_rel_rel" placeholder="关系" style="width:100px;">
                <el-option v-for="item in getDictData('1')" :key="item._id" :label="item.text" :value="item._id">
                </el-option>
            </el-select>
            <el-input v-model="localdata.form.first_rel_name" style="width:100px;" v-if="localdata.form.first_rel_rel!='0'"></el-input>
        </el-form-item>
        <el-form-item v-for="(item, index) in localdata.form.relations" :key="index" :prop="'relations.' + index + '.tel'" :rules="{validator: validateTel, required: true, trigger: 'blur'}">
            <el-input v-model="item.tel" style="width:120px;" placeholder="请输入手机号"></el-input>
            <el-select v-model="item.relation" placeholder="关系" style="width:100px;">
                <el-option v-for="subitem in getDictData('1')" :key="subitem._id" :label="subitem.text" :value="subitem._id">
                </el-option>
            </el-select>
            <el-input v-model="item.name" style="width:100px;" v-if="item.relation!='0'"></el-input>
            <a @click="localdata.form.relations.splice(index, 1)">
                <i class="fa fa-minus-square-o"></i>
            </a>
        </el-form-item>
        <span class="wrapper" style="position: relative; left:87px;top:-9px">
            <a @click="localdata.form.relations.push({relation:'',name:'',tel:''})">
                <i class="fa fa-plus-square-o"></i>增加联系方式
            </a>
        </span>
        <el-form-item label="来源渠道">
            <el-radio-group v-model="localdata.form.track_from">
                <template v-for="way in getDictData('3')">
                    <el-radio-button class="normalfont" :label="way._id">{{way.text}}</el-radio-button>
                </template>
            </el-radio-group>
        </el-form-item>
        <hr/>
        <div class="text-center distance">
            <a v-if="!expand" @click="expand=true" class="stylemore inline w b-l b-r b-b r-b">
                <i class="fa fa-arrow-down"></i>展开填写更多资料
            </a>
            <a v-if="expand" @click="expand=false" class=" stylemore inline w b-l b-r b-b r-b">
                <i class="fa fa-arrow-up"></i>关闭更多资料
            </a>
        </div>
        <div v-show="expand">
            <el-form-item label="昵称">
                <input type="text" class="form-control" placeholder="小名或英文名" v-model="localdata.form.nickname" style="width:320px;">
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker type="date" name="birth" v-model="localdata.form.birth" style="width:320px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="家庭住址">
                <input type="text" name="home_address" class="form-control" v-model="localdata.form.home_address" style="width:320px;">
            </el-form-item>
            <el-form-item label="就读学校">
                <el-input v-model="localdata.form.school" style="width:200px;"></el-input>
                <el-select v-model="localdata.form.grade" placeholder="年级" style="width:100px">
                    <el-option v-for="item in grade" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="localdata.form.class" placeholder="班级" style="width:100px">
                    <el-option v-for="item in claes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <textarea name="note" v-model="localdata.form.note" rows="2"  class="form-control" style="width:320px;"></textarea>
            </el-form-item>
        </div>
    </el-form>
</template>
<style>
.distance{
    margin-bottom:10px; 
}
a.stylemore{
    border: 1px solid rgb(211,211,211);
    padding:2px 10px;
    border-top:0;
    border-radius: 3px;
}
a.stylemore:hover{
    color:red;
}
</style>

<script>
export default {
    name: 'add',
    props: ['form'],
    data() {
        let localdata = {
            form: JSON.parse(JSON.stringify(this.form)),
            'sex': [{
                'value': '1',
                'iclass': 'fa fa-male  mans',
                'text': '男'
            }, {
                'value': '2',
                'iclass': 'fa fa-female woman',
                'text': '女'
            }, {
                'value': '0',
                'iclass': 'fa fa-question-circle',
                'text': '待确定'
            }],
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
            localdata,
            expand: false,
            model: 'student',
            claes: [{
                value: '0',
                label: '1'
            }, {
                value: '1',
                label: '2'
            }, {
                value: '2',
                label: '3'
            }, {
                value: '3',
                label: '4'
            }, {
                value: '4',
                label: '5'
            }, {
                value: '5',
                label: '6'
            }, {
                value: '6',
                label: '7'
            }, {
                value: '7',
                label: '8'
            }, {
                value: '8',
                label: '9'
            }, {
                value: '9',
                label: '10'
            }, {
                value: '10',
                label: '11'
            }, {
                value: '11',
                label: '12'
            }, {
                value: '12',
                label: '13'
            }],
            grade: [{
                value: '0',
                label: '不确定'
            }, {
                value: '1',
                label: '一年级'
            }, {
                value: '2',
                label: '二年级'
            }, {
                value: '3',
                label: '三年级'
            }, {
                value: '4',
                label: '四年级'
            }, {
                value: '5',
                label: '五年级'
            }, {
                value: '6',
                label: '六年级'
            }, {
                value: '7',
                label: '初一'
            }, {
                value: '8',
                label: '初二'
            }, {
                value: '9',
                label: '初三'
            }, {
                value: '10',
                label: '高一'
            }, {
                value: '11',
                label: '高二'
            }, {
                value: '12',
                label: '高三'
            }],
            rules: {
                student_name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 256, message: '长度在 1 到 256个字符', trigger: 'blur' }
                ],
                first_tel: [
                    { validator: validateTel, required: true, trigger: 'blur' }
                ],
            },
            validateTel
        }
    },
    methods: {
        handleEdit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.setEditModle(this.$store.state.dialogs.dailogdata['_id'])
                    console.log(this.$store.state.dialogs.dailogdata['_id'])
                    let vm = this
                    vm.localdata.form.birthstr = vm.getDateNumFormat(vm.localdata.form.birth)
                    vm.handleSave().then(() => {
                        //vm.$store.state.dialogs.dailogdata = vm.lodash.assign(vm.$store.state.dialogs.dailogdata, vm.localdata.form)
                        vm.lbClosedialog()
                        this.$store.state.envs.currDialog = 'lb-editstudentinfo'
                    })
                }
            })
        },
        handleClick() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let vm = this
                    vm.localdata.form.birthstr = vm.getDateNumFormat(vm.localdata.form.birth)
                    vm.handleSave().then((response) => {
                        vm.$store.state.envs.currStudent = response
                        vm.handleShowDialog('lb-finishadd', response)
                    }, (e) => {
                    })
                }
            })
        }
    }
}
</script>
