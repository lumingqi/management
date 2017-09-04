<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div>
                <div class="modal-header">
                    <button class="close" type="button" @click="lbClosedialog($event)">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h3 class="modal-title">
                        <i class="fa fa-user"></i>重置
                        <span class="badge bg-info">{{name}}</span>的账号密码
                    </h3>
                </div>
                <div class="modal-body">
                    <el-form :model="localdata.form" :rules="rules" label-width="100px" ref="ruleForm">
                        <el-form-item label="登录账号">
                            {{username}}
                        </el-form-item>
                        <el-form-item label="登录密码" prop="reset_password">
                            <el-input v-model.trim="localdata.form.reset_password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="do_reset_account()" :disabled="localdata.form.reset_password<6">确定</button>
                    <button class="btn btn-warning" @click="lbClosedialog($event)">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from '~/api/md5.min.js'
export default {
    name: 'reset_account',
    data() {
        let localdata = {
            'form': {
                'reset_password': ''
            }
        }
        return {
            localdata,
            name: '',
            username: '',
            uid: '',
            rules: {
                reset_password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change' }
                ],
            }
        }
    },
    mounted() {
        if (this.$store.state.dialogs.dailogdata) {
            this.name = this.$store.state.dialogs.dailogdata.name
            this.username = this.$store.state.dialogs.dailogdata.tel
            this.uid = this.$store.state.dialogs.dailogdata._id
        }
    },
    methods: {
        do_reset_account() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.updateTeble('employee', this.uid, {
                        'pwd': md5(this.localdata.form.reset_password)
                    }).then(() => {
                        this.$message({
                            message: '设置成功！',
                            type: 'success'
                        })
                        this.lbClosedialog()
                    })
                }
            });

        }
    }
}
</script>