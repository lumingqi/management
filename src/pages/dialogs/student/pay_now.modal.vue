<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div></div>
            <div class="modal-header">
                <button class="close" type="button" @click="lbClosedialog($event)">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">关闭</span>
                </button>
                <h3 class="modal-title">
                    <i class="icon-wallet"></i>为订单号
                    <span class="label bg-info">{{order.order_no}}</span>缴费
                </h3>
            </div>
            <div class="modal-body">
                <div class="wrapper bg-light b-a m-t-xs" v-if="dopay">
                    <p class="m-t m-b text-success text-2x">
                        <i class="fa fa-check-circle-o"></i> 订单缴费成功！</p>
                    <p>订单编号:
                        <span class="text-info">{{order.order_no}}</span>，应缴金额:
                        <span class="text-success">{{order.unpay_amount}}</span>元,本次缴费:
                        <span class="text-success">{{localdata.form.money_pay_amount}}</span>元,请选择接下来的操作.</p>
                    <div class="row no-gutter m-t">
                        <div class="col-xs-6">
                            <a class="btn btn-primary btn-block" @click="handleShowDialog('lb-printerreceipt',{order,pay})">
                                <i class="icon-printer"></i> 打印收据</a>
                        </div>
                        <div class="col-xs-6">
                            <a class="btn btn-warning btn-block" @click="lbClosedialog($event)">
                                <i class="fa fa-sign-out"></i> 结束缴费</a>
                        </div>
                    </div>
                </div>
                <div v-if="!dopay">
                    <form name="form1" class="form-horizontal form-validation   -b -a" novalidate>
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">学员:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{ currStudent.student_name}}</p>
                            </div>
                        </div>
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
                            <label class="control-label col-xs-12 col-md-2">订单金额:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{order.order_amount}}元</p>
                            </div>
                        </div>
                        <div class="form-group text-muted">
                            <label class="control-label col-xs-12 col-md-2">已缴金额:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{order.order_amount-order.unpay_amount}}元</p>
                            </div>
                        </div>
                        <div class="form-group text-muted">
                            <label class="control-label col-xs-12 col-md-2">未缴金额:</label>
                            <div class="col-xs-12 col-md-5">
                                <p class="form-control-static">{{order.unpay_amount}}元</p>
                            </div>
                        </div>
                        <div class="form-group" v-if="this.currStudent.amount > 0 && this.order.order_type != 2">
                            <label class="col-xs-12 col-sm-3 col-md-2 control-label">余额付款:{{currStudent.amount}}元</label>
                            <div class="col-xs-12 col-sm-9 col-md-10">
                                <label class="i-switch m-t-xs m-r">
                                    <input type="checkbox" @change="cacu_money_amount" v-model="localdata.form.use_balance" class=" ng-dirty -parse ng-touched">
                                    <i></i>
                                </label>
                                <div class="input-group w m-t-xs" v-if="localdata.form.use_balance">
                                    <lb-numberinput type="number" @change="cacu_money_amount" v-model.lazy="localdata.form.balance_pay_amount" class="form-control    -b -a">
                                    </lb-numberinput>
                                    <span class="input-group-addon">元</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">现款缴费:</label>
                            <div class="col-xs-12 col-md-4">
                                <div class="input-group">
                                    <lb-numberinput type="number" class="form-control    -b -a" v-model="localdata.form.money_pay_amount">
                                    </lb-numberinput>
                                    <span class="input-group-addon">元</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-12 col-md-2">
                                <span style='color:red'>* </span>缴费方式:</label>
                            <div class="col-xs-12 col-md-4">
                                <el-select v-model="localdata.form.region_oe_id" placeholder="请选择">
                                    <el-option v-for="item in getDictData('2')" :key="item._id" :label="item.text" :value="item._id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="form-group m-t">
                            <div class="col-xs-12 col-md-offset-2">
                                <button type="button" class="btn btn-primary" @click="do_pay()" :disabled="localdata.form.pay_amount==0||parseInt(localdata.form.money_pay_amount)>parseInt(order.unpay_amount)||localdata.form.region_oe_id == '请选择'">确认缴费</button>
                                <button type="button" class="btn btn-danger m-l" @click="lbClosedialog($event)">关闭</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pay_now',
    data() {
        let localdata = {
            'form': {
                'order_id': '',
                'student_id': '',
                'classes_id': '',
                'money_pay_amount': '',
                'pay_type': 0,
                'use_balance': false,
                'balance_pay_amount': 0,
                'region_oe_id': '请选择',
                'print': false
            }
        }
        return {
            localdata,
            order: {},
            pay: {},
            model: 'pay',
            dopay: false,
            currStudent: {}
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
        }
    },
    computed: {},
    watch: {},
    methods: {
        cacu_money_amount() {
            if (this.localdata.form.use_balance) {
                this.localdata.form.money_pay_amount = this.order.unpay_amount - this.localdata.form.balance_pay_amount
            } else {
                this.localdata.form.money_pay_amount = this.order.unpay_amount
            }
        },
        updateOrder() {
            let unpay_amount = this.order.unpay_amount - this.localdata.form.money_pay_amount
            if (this.localdata.form.use_balance) {
                unpay_amount -= this.localdata.form.balance_pay_amount
            }
            let pay_status = 1
            if (unpay_amount == 0) {
                pay_status = 2
            } else if (unpay_amount == this.order.order_amount) {
                pay_status = 0
            }
            this.order.unpay_amount = unpay_amount
            this.updateTeble('order', this.order._id, {
                'pay_status': pay_status,
                'unpay_amount': unpay_amount
            }).then(() => {
                this.$store.state.envs.currDialog = 'lb-paynow'
                this.dopay = true
            })
        },
        setStudentAmountOrder() {
            let amount = Number(this.currStudent.amount) - Number(this.localdata.form.balance_pay_amount)
            this.updateTeble('student', this.currStudent._id, {
                'amount': amount
            }).then(() => {
                this.dopay = true
            })
        },
        setStudentAmount() {
            let amount = Number(this.currStudent.amount) + Number(this.order.back_amount) + Number(this.order.origin_amount)
            this.updateTeble('student', this.currStudent._id, {
                'amount': amount
            }).then(() => {
                this.dopay = true
            })
        },
        do_pay() {
            this.handleSave().then((data) => {
                this.pay = data
                if (this.order.order_type == 2) {
                    this.setStudentAmount()
                } else if (this.order.order_type == 1) {
                    this.setStudentAmountOrder()
                }
                this.updateOrder()
            })
        },
    }
}
</script>
