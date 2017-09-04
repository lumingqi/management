 <template>
    <div class="panel panel-default">
        <div class="panel-heading">
            机构基本信息 
        </div>
        <div class="panel-body">
            <el-form :model="localdata.form" :rules="rules" label-width="120px" ref="ruleForm">
                <el-form-item label="机构全称" prop="name">
                    <el-input v-model="localdata.form.name"></el-input>
                </el-form-item>
                <el-form-item label="机构简称" prop="short_name">
                    <el-input v-model="localdata.form.short_name"></el-input>
                </el-form-item>
                <el-form-item label="机构联系电话" prop="tel">
                    <el-input v-model="localdata.form.tel"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="localdata.form.address"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="panel-footer" :class="getData" style='text-align:center'>
            <template v-if="getActionOption('systememorgsave')">
                <button type="button" class="btn btn-primary" @click="rest_save()">保存</button>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'groups',
    data() {
        let localdata = {
            'form': {
                'name': '',
                'short_name': '',
                'tel': '',
                'address': ''
            },
        }
        return {
            localdata,
            tables: ['campus'],
            model: 'org',
            rules: {
                name: [
                    { required: true, message: '请输入机构全称', trigger: 'blur' },
                    { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
        this.getTableApidata('org')
    },
    computed: {
        getData() {
            let org = this.$store.state.models.models.org.data
            if (org.length > 0) {
                this.localdata.form = org[0]
            }
            return true
        },
    },
    methods: {
        rest_save() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if (this.localdata.form._id && this.localdata.form._id.length > 0) {
                        this.setEditModle(this.localdata.form._id)
                    }
                    this.handleSave().then((required) => {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                        this.getTableApidata('org')
                    }, () => {

                    })
                }
            })
        }
    }
}
</script>
