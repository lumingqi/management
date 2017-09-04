<template>
    <div>
        <template v-if="typeData.statutype=='openlessonsstatus'">
            <el-tag type="gray" v-if="getOpen(lessonData,'')">未开课</el-tag>
            <el-tag type="success" v-if="getOpen(lessonData,'open')">已开课</el-tag>
            <el-tag type="danger" v-if="getOpen(lessonData,'close')">已结课</el-tag>
        </template>
        <template v-if="typeData.statutype=='accountcheck'">
            <el-tag type="gray" v-if="lessonData.check_status == '0'">未对账</el-tag>
            <el-tag type="success" v-if="lessonData.check_status == '1'">已对账</el-tag>
        </template>
        <template v-if="typeData.statutype=='checkAccount'">
            <a v-if="lessonData.check_status== '0'" @click="handleCheck(lessonData._id)">
                <el-tag type="gray">核对</el-tag>
            </a>
            <el-tag type="danger" v-if="lessonData.check_status == '1'">已核对</el-tag>
        </template>
        <template v-if="typeData.statutype=='checkPay'">
            <el-tag type="gray" v-if="lessonData.pay_status==0">未付款</el-tag>
            <el-tag type="success" v-if="lessonData.pay_status==1">部分付款</el-tag>
            <el-tag type="danger"  v-if="lessonData.pay_status==2">支付完成</el-tag>
        </template>
        <template v-if="typeData.statutype=='defrolestatus'">
            <el-tag type="gray" v-if="lessonData.defrole">默认</el-tag>
            <span v-if="lessonData.defrole"></span>
        </template>
        <template v-if="typeData.statutype=='defvaluestatus'">
            <el-tag type="gray" v-if="lessonData.defvalue">默认</el-tag>
            <span v-if="lessonData.defrole"></span>
        </template>
        <template v-if="typeData.statutype=='attenceStatus'">
            <el-tag type="gray" v-if="lessonData.attence_flag==0">所有</el-tag>
            <el-tag type="success" v-if="lessonData.attence_flag==1">未考勤</el-tag>
            <el-tag type="warning"  v-if="lessonData.attence_flag==2">已考勤</el-tag>
            <el-tag type="danger"  v-if="lessonData.attence_flag==3">请假</el-tag>
        </template>
        <template v-if="tabletype=='lesson_type'">
            <el-tag type="gray" v-if="typeData==0">班课</el-tag>
            <el-tag type="success" v-if="typeData==1">1对1</el-tag>
            <el-tag type="warning"  v-if="typeData==2">课时包</el-tag>
        </template>
    </div>
</template>
<script>
export default {
    name: 'LbCheckstatus',
    props: ['lessonData', 'typeData','tabletype'],
    data() {
        return {
        }
    },
    watch: {
    },
    methods: {
        getOpen(item, value) {
            let opentime = new Date()
            if (value == 'close') {
                return item.status == 2
            } else if (value == 'open') {
                return item.open_time < opentime.getTime()
            } else {
                return item.open_time > opentime.getTime()
            }
        },
        handleCheck(id) {
            this.$confirm('是否要核对?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.updateTeble('flow', id, {
                    'check_status': 1
                }).then(() => {
                    this.$message({
                        message: '核对成功',
                        type: 'success'
                    })
                    this.$emit('search')
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已确定核对'
                })
            }
                )
        },
    },
    computed: {
    }
}
</script>
