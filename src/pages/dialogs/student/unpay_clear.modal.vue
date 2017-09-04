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
                        <i class="icon-ban"></i>清除订单
                        <span class="label bg-info">{{order.order_no}}</span>
                    </h3>
                </div>
                <div class="modal-body">
                    <form name="form1" class="form-horizontal form-validation   -required -number -parse">
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">订单号:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{order.order_no}}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">订单内容:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{order.body}}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">购买课次:</label>
                            <div class="col-xs-12 col-sm-9 col-md-5">
                                <p class="form-control-static">{{order.origin_times}}</p>
                            </div>
                        </div>
                        <div class="form-group" ng-if="order.present_times > 0">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">赠送课次:</label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <p class="form-control-static">{{order.present_times}} 次</p>
                            </div>
                        </div>
                        <div class="form-group" ng-if="order.present_times > 0">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">总课次:</label>
                            <div class="col-xs-12 col-sm-9 col-md-5">
                                <p class="form-control-static">{{Number(order.origin_times)+Number(order.present_times)}} 次</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">课次单价:</label>
                            <div class="col-xs-12 col-sm-9 col-md-5">
                                <p class="form-control-static">{{order.unit_price}}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">总金额:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{order.order_amount}}元</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">已付款:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{order.order_amount-order.unpay_amount}}元</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">欠费金额:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{order.unpay_amount}}元</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">订单备注:</label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <p class="form-control-static">{{order.order_remark}}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">清除课次:</label>
                            <div class="col-xs-12 col-sm-9 col-md-5">
                                <div class="input-group">
                                    <lb-numberinput type="number" name="times" class="form-control " v-model="localdata.form.times">
                                    </lb-numberinput>
                                    <span class="input-group-addon">次</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">清除金额:</label>
                            <div class="col-xs-12 col-sm-9 col-md-5">
                                <div class="input-group">
                                    <lb-numberinput type="number" name="amount" class="form-control" v-model="localdata.form.amount">
                                    </lb-numberinput>
                                    <span class="input-group-addon">元</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label ">
                                <span style='color:red'>*</span> 清除备注:</label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <input type="text" class="form-control" id="inputError1" name="note" placeholder="请输入清除原因" v-model="localdata.form.note">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="do_save" :disabled="parseInt(localdata.form.times)>parseInt(order.origin_times)||parseInt(localdata.form.amount)>parseInt(order.unpay_amount)||localdata.form.note==''">确定</button>
                    <button class="btn btn-warning m-l" @click="lbClosedialog($event)">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'unpay_clear',
    data() {
        let localdata = {
            'form': {
                'order_id': '',
                'student_id': '',
                'classes_id': '',
                'times': 0,
                'amount': 0,
                'note': ''
            }
        }
        return {
            localdata,
            order: {},
            model: 'clear',
            currentRow: null,
            currStudent: {}
        }
    },
    mounted() {
        this.pagination.pagesize = 5
        let vm = this
        if (vm.$store.state.dialogs.dailogdata) {
            vm.order = vm.$store.state.dialogs.dailogdata
            vm.localdata.form.order_id = vm.order._id
            vm.localdata.form.student_id = vm.order.student_id
            vm.localdata.form.classes_id = vm.order.classes_id
            vm.localdata.form.amount = vm.order.unpay_amount
            vm.handleGetTableID('student', vm.order.student_id).then((obj) => {
                if (obj.data && obj.data.length > 0) {
                    vm.currStudent = obj.data[0]
                }
            })
        }
    },
    computed: {},
    watch: {},
    methods: {
        updateOrder() {
            let unpay_amount = this.order.unpay_amount - this.localdata.form.amount

            let pay_status = 1
            if (unpay_amount == 0) {
                pay_status = 2
            } else if (unpay_amount == this.order.order_amount) {
                pay_status = 0
            }
            this.updateTeble('order', this.order._id, {
                'pay_status': pay_status,
                'unpay_amount': unpay_amount
            }).then(() => {
                this.lbClosedialog()
                this.$store.state.envs.currDialog = 'lb-paynow'
            })
        },
        do_save() {
            this.handleSave().then((data) => {
                this.updateOrder()
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                this.lbClosedialog()
                this.$store.state.envs.currDialog = 'lb-unpay_clear'

            })
        }
    }
}
</script>
