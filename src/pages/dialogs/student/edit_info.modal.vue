<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div>
                <div class="modal-header">
                    <button class="close" type="button" @click="lbClosedialog($event)">
                        <span>×</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h3 class="modal-title">
                        <i class="fa fa-user"></i>编辑
                        <span class="badge bg-info">{{localdata.form.student_name }}</span>的基本资料
                    </h3>
                </div>
                <div class="modal-body">
                    <lb-addstudent :form="localdata.form" ref="ruleForm"></lb-addstudent>
                </div>
                <div class="modal-footer text-center">
                    <button class="btn btn-primary" @click="handleClick">确定</button>
                    <button class="btn btn-warning" @click="lbClosedialog($event)">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import addstudent from '~/pages/views/student/addstudent.vue'
export default {
    name: 'edit_info',
    components: {
        'lb-addstudent': addstudent
    },
    data() {
        return {
            localdata: { form: { student_name: '' } }
        }
    },
    created() {
        this.localdata.form = this.lodash.assign(this.localdata.form, this.$store.state.dialogs.dailogdata)
    },
    methods: {
        handleClick() {
            this.$refs['ruleForm'].handleEdit()
        }
    }
}
</script>
