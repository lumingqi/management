<template>
    <div class="wrapper">
        <div class="personal">
            <div class="personal_header">
                个人信息
            </div>
            <div class="personal_body">
                <div class="wrapper-md m-t" v-if="status==0">
                    <div>
                        <dl class="dl-horizontal b-b padder-v">
                            <dt>登录账号</dt>
                            <dd>{{$store.state.system.tel}}</dd>
                        </dl>
                        <dl class="dl-horizontal b-b padder-v">
                            <dt>账号密码</dt>
                            <dd>*********
                                <template v-if="getActionOption('systempersonapassword')">
                                    <a class="link pull-right" @click="status=3" style="height:31px;">修改密码</a>
                                </template>
                                <p class="text-muted">修改密码请点击右边"修改密码"链接</p>
                            </dd>
                        </dl>
                        <dl class="dl-horizontal b-b padder-v">
                            <dt>真实姓名</dt>
                            <dd style="height:31px;">{{$store.state.system.name}}
                                <template v-if="getActionOption('systempersonaname')">
                                    <a class="link pull-right" @click="status=1">修改姓名</a>
                                </template>
                                <p class="text-muted">修改姓名请点击右边"修改姓名"" 链接</p>
                            </dd>
                        </dl>
                        <dl class="dl-horizontal b-b padder-v">
                            <dt>生日</dt>
                            <dd style="height:31px;">{{ getDateFormat($store.state.system.birth)}}
                                <template v-if="getActionOption( 'systempersonabirthd')">
                                    <a class="link pull-right" @click="status=2">设置生日</a>
                                </template>
                                <p class="text-muted">设置出生日期请点击右边"设置生日" 链接</p>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="wrapper-md" v-if="status==3">
                    <h4 style="text-align:center">修改登入密码</h4>
                    <el-form :model="localdata.form2" :rules="rules2" label-width="80px" ref="ruleForm" style="width:400px;margin: 0 auto;">
                        <el-form-item label="原密码" prop="old_pwd">
                            <el-input type="password" v-model="localdata.form2.old_pwd" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="new_pwd">
                            <el-input type="password" v-model="localdata.form2.new_pwd" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="再次输入" prop="new_pwd_repeat">
                            <el-input type="password" v-model="localdata.form2.new_pwd_repeat" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label-width="100px">
                            <button class="btn btn-primary" @click="handleChangePwd">修改密码</button>
                            <button class="btn btn-primary" @click="status=0">返回</button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="wrapper-md" v-if="status==1">
                    <form name="edit_name_form" class="form-horizontal form-validation ">
                        <h4 style="text-align:center">修改姓名</h4>
                        <el-form :model="localdata.form" :rules="rules" label-width="120px" ref="ruleForm" style="width:400px;margin: 0 auto;">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="localdata.form.name"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="form-group">
                            <div class="col-xs-5 col-md-offset-5">
                                <button class="btn btn-primary " type="button" @click="handleChangeInfo" :disabled="localdata.form.name.length==0">确认修改</button>
                                <a class=" btn btn-primary  " @click="status=0">返回</a>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="wrapper-md" v-if="status==2">
                    <form name="edit_birth_form" class="form-horizontal form-validation ">
                        <h4 class="b-b m-b padder-v" style="text-align:center">修改生日</h4>
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">生日:</label>
                            <div class="col-xs-12 col-md-3">
                                <div class="w-sm">
                                    <el-date-picker type="date" name="birth" v-model="localdata.form.birth"></el-date-picker>
                                </div>
                            </div>
                        </div>
                        <div class="form-group m-t" style="margin: 0 auto;">
                            <div class="col-xs-12 col-md-offset-2">
                                <button class="btn btn-primary" style="float:left" type="button" @click="handleChangeInfo">确认修改</button>
                                <a class="btn btn-primary aStyle" @click="status=0">返回</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style >
.el-form-item__label {
    padding-right: 10px;
}

.aStyle {
    margin-left: 10px;
    float: left;
}

.personal {
    width: 100%;
    background: #ffffff;

    border: 1px solid #ddd;
    border-radius: 5px;
}

.personal_header {
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
    background: #f5f5f5;
}

.personal_body {
    padding: 15px;
}

a.link {
    color: #4d90fe;
    position: relative;
}
</style>
<script>
import md5 from '~/api/md5.min.js'
export default {
    name: 'personal_information',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.localdata.form2.new_pwd_repeat !== '') {
                    this.$refs.ruleForm.validateField('new_pwd_repeat')
                }
                callback()
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.localdata.form2.new_pwd) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        };
        let localdata = {
            form: {
                birth: '',
                name: '',
            },
            form2: {
                old_pwd: '',
                new_pwd: '',
                new_pwd_repeat: '',
            }
        }
        return {
            localdata,
            status: 0,
            model: 'employee',
            pwderror: false,
            rules2: {
                old_pwd: { required: true, message: '请输入', trigger: 'blur' },
                new_pwd: [{ required: true, message: '请输入', trigger: 'blur' },
                { validator: validatePass, trigger: 'blur' }
                ],
                new_pwd_repeat: [{ required: true, message: '请输入', trigger: 'blur' },
                { validator: validatePass2, trigger: 'blur' }
                ],
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
        this.localdata.form.birth = this.$store.state.system.birth
        this.localdata.form.name = this.$store.state.system.name
        this.setEditModle(this.$store.state.system.id)
    },
    computed: {},
    watch: {},
    methods: {
        handleChangePwd() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let account = { user: this.$store.state.system.tel, pwd: md5(this.localdata.form2.old_pwd) }
                    this.$store.dispatch(this.types.LOGIN_API, account).then((data) => {
                        if (data.code == 0) {
                            this.updateTeble('employee', this.$store.state.system.id, {
                                'pwd': md5(this.localdata.form2.new_pwd)
                            }).then(() => {
                                this.$message({
                                    message: '设置成功！',
                                    type: 'success'
                                })
                            })
                            this.localdata.form2.new_pwd_repeat = ''
                            this.localdata.form2.new_pwd = ''
                            this.localdata.form2.old_pwd = ''
                        } else {
                            this.$message({
                                message: '旧密码错误！',
                                type: 'error'
                            })
                            this.localdata.form2.old_pwd = ''
                        }
                    })
                }
            })
        },
        handleChangeInfo() {
            this.handleSave().then(() => {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                this.$store.state.system.birth = this.localdata.form.birth
                this.$store.state.system.name = this.localdata.form.name
                window.localStorage.setItem('system', JSON.stringify(this.$store.state.system))
            }, () => {
            })
        }
    }
}
</script>
