<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <i class="fa fa-user"></i>学员档案
        </div>
        <div class="panel-body">
            <lb-addstudent ref="ruleForm" :form="form"></lb-addstudent>
        </div>
        <div class="panel-footer" style="text-align:center">
            <button type="button" class="btn btn-primary w" @click="handleClick">确认</button>
        </div>
    </div>
</template>
<script>
import addstudent from '~/pages/views/student/addstudent.vue'
export default {
    name: 'add',
    components: {
        'lb-addstudent': addstudent
    },
    data() {
        return {
            form: {
                'student_name': '',
                'sex': '0',
                'first_tel': '',
                'first_rel_rel': '',
                'first_rel_name': '',
                'relations': [],
                'track_from': '其他',
                'nickname': '',
                'birth': '',
                'home_address': '',
                'school': '',
                'grade': '',
                'class': '',
                'note': '',
                'region_oe_id': '0',
                'purpose': '0',
                'amount': 0,
                'isdel': false
            }
        }
    },
    created() {
        this.getTableApidata('dictionary').then(() => {
            this.form.first_rel_rel = this.getDictDefvalue('1')
            this.form.track_from = this.getDictDefvalue('3')
        })
    },
    methods: {
        handleClick() {
            this.$refs['ruleForm'].handleClick()
        }
    }
}
</script>
