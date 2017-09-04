<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content" modal-transclude>
            <div>
                <div class="modal-header">
                    <button class="close" type="button" @click="lbClosedialog($event)">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h3 class="modal-title">
                        <i class="icon-printer"></i>订单号
                        <span class="label bg-info ng-binding" :class="refresh">{{ order.order_no}}</span>
                        的收据</h3>
                </div>
                <div class="modal-body">
                    <el-table highlight-current-row :data="getTablesData()" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @current-change="handleCurrentChange">
                        <el-table-column type="index" width="55">
                        </el-table-column>
                        <el-table-column property='data' label="缴费日期">
                            <template scope="scope">{{getDateFormat(scope.row.creattime)}}</template>
                        </el-table-column>
                        <el-table-column property="data" label="缴费金额">
                            <template scope="scope">
                                <span class="badge bg-success">{{getToFixed(scope.row.money_pay_amount)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="data" label="付款方式">
                            <template scope="scope">{{getDictText('2',scope.row.region_oe_id)}}</template>
                        </el-table-column>
                        <el-table-column property="data" label="收据">
                            <template scope="scope">{{getprint(scope.row.print)}}</template>
                        </el-table-column>
                    </el-table>
                </div>
    
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="handlePrint">
                        <i class="icon fa fa-print"></i>
                        打印</button>
                    <button type="button" class="btn btn-warning" @click="lbClosedialog($event)">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PrintOrder',
    data() {
        let localdata = {
            'form': {
                'order_id': '',
                'student_id': '',
                'money_pay_amount': '',
                'pay_type': 0,
                'use_balance': false,
                'balance_pay_amount': 0,
                'print': false,
            }
        }
        return {
            localdata,
            order: {},
            tables: ['pay'],
            student_name: '',
            pay: null
        }
    },
    computed: {
        refresh() {
            if (this.$store.state.envs.currDialog == 'lb-printerreceipt') {
                console.log(this.$store.state.envs.currDialog)
                this.handleSearch()
            }
        }
    },
    mounted() {
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
            this.handleSearch()
        }
    },
    methods: {
        handlePrint() {
            if (this.pay) {
                this.handleShowDialog('lb-printerreceipt', { order: this.order, pay: this.pay })
            } else {
                this.$message({
                    message: '请选择',
                    type: 'warning'
                })
            }


        },
        getprint(value) {
            if (value) {
                return "已打印"
            } else {
                return "未打印"
            }
        },
        handleSearch() {
            let filterObj = []
            let student_id = this.localdata.form.student_id
            if (student_id && student_id.length > 0) {
                filterObj.push({
                    'key': 'student_id',
                    'value': student_id,
                    'type': ''
                })
                let filterTxt = this.base64.encode(JSON.stringify(filterObj))
                this.handleGetFilterTable(filterTxt)
            }
        },
        handleCurrentChange(val) {
            this.pay = val;
            console.log(this.pay)
        }
    }
}
</script>
