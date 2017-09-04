<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content" modal-transclude>
            <div class="print">
                <div class="modal-header">
                    <button class="close" type="button" @click="lbClosedialog($event)">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">关闭</span>
                    </button>
                    <h3 class="modal-title">
                        <i class="fa fa-print"></i>打印收据</h3>
                </div>
                <div class="modal-body ">
                    <div class="table-responsive ng-scope">
                        <table class=" table-print-head">
                            <tbody>
                                <tr>
                                    <td>姓名:</td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="currStudent.student_name">
                                        </div>
                                    </td>
                                    <td>学校:</td>
                                    <td>
                                        <div>
                                            <input type="text" class=" input_frou" :value="currStudent.school">
                                        </div>
                                    </td>
                                    <td>年级:</td>
                                    <td>
                                        <div>
                                            <input :value="currStudent.grade" type="text" class=" input_frou">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-inline   w-long ">
                                            <span class="addon">NO:</span>
                                            <input style="width:160px;" placeholder="收据编号" class="text-right" type="text" :value="order.order_no">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class=" table-print-center m-t bg-light lter">
                            <thead>
                                <tr>
                                    <td>收费项目</td>
                                    <td>收费标准</td>
                                    <td>报读课次</td>
                                    <td>赠送课次</td>
                                    <td>课时费</td>
                                    <td>折扣金额</td>
                                    <td>备注</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="line-input w-long">
                                            <input style="width:140px" type="text" :value="classes.class_name" class="input_three">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="order.origin_amount">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="order.unit_price">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="order.present_times">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="order.unit_price">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="order.discount_amount">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="order.order_remark">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>应缴金额</td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="order.order_amount">
                                        </div>
                                    </td>
                                    <td>实缴金额</td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="pay.money_pay_amount">
                                        </div>
                                    </td>
                                    <td>欠款金额</td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text" :value="order.unpay_amount">
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <table class=" table-print-footer m-t">
                            <tbody>
                                <tr>
                                    <td>开票人:</td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text">
                                        </div>
                                    </td>
                                    <td>收款人:</td>
                                    <td>
                                        <div class="line-input">
                                            <input type="text">
                                        </div>
                                    </td>
                                    <td>日期:</td>
                                    <td>
                                        <div class="block">
                                            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                                            </el-date-picker>
                                        </div>
                                    </td>
                                    <td class='qcode'>
                                        <img :src="qrcodeimg" style="width:10rem;float:right;">
                                        <span class='print_text'>扫描二维码 绑定学员信息～
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="handleClick">确认打印</button>
                    <button type="button" class="btn btn-warning" @click="lbClosedialog($event)">关闭</button>
                </div>
            </div>
            <div id="print_area" style="display: none">
            </div>
        </div>
    </div>
</template>
<style  media="print" type="text/css">
.print_text {
    display: inline-block;
    padding-top: 10px;
    width: 104px;
    height: 30px;
    float: right;
}

.qcode {
    width: 300px;
}

@media screen and (min-width: 768px) {
    .modal-content {
        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
}

.modal-content {
    height: 424px;
    position: relative;
    background-color: #fff;
    border: 1px solid #999;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    outline: 0;
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    color: #58666e;
}

.modal-body {
    height: 338px;
    position: relative;
    padding: 5px;
}

.table-responsive {
    min-height: 300px;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

table {
    background-color: transparent;
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

td,
th {
    color: #58666e;
    font-size: 14px;
}

.table-print-head {
    margin: 10px 0;
}

.table-print-center td {
    padding: 8px 10px;
    text-align: center;
}

.table-print-center thead {
    font-weight: 600;
    text-align: center;
}

.table-print-center tfoot td {
    color: #D1D1D1;
}

input {
    border: 0;
    border-bottom: 1px solid #dddddd;
    height: 25px;
    padding: 2.5px;
    width: 90px;
    margin: 2px;
}

.input_three {
    width: 120px;
}

.input_frou {
    width: 150px
}

.input-inline {
    position: relative;
    display: inline-block;
    line-height: 20px;
    border: 1px solid #dee5e7;
    margin-left: 5px;
}

.input-inline .addon {
    position: absolute;
    top: 5px;
    left: 5px;
    line-height: 16px;
}

.input-inline>input {
    width: 150px;
    padding-right: 5px;
    padding-left: 24px;
    line-height: 20px;
    border: 0;
}

.bg-light.lter,
.bg-light .lter {
    background-color: #f6f8f8;
}

.m-t {
    margin-top: 15px;
}

.bg-light {
    color: #58666e;
    background-color: #edf1f2;
}

.modal-footer {
    padding: 10px;
    background: #f4f5f9;
}

.modal-footer {
    padding: 5px;
    text-align: right;
    border-top: 1px solid #e5e5e5;
}

@media print {
    .page-header-topbar,
    #wrapper,
    #footer {
        display: none;
    }
    .modal-content>*,
    .modal-content>div>.modal-header,
    .modal-content>div>.modal-title,
    .modal-content>div>.modal-footer {
        display: none;
    }
    .modal-content>.print {
        background: red;
        display: block;
        margin-top: 30px;
        margin-left: 30px;
    }
    @page {
        size: A4 landscape;
    }
    @page :left {
        margin: 3cm;
    }
    @page :right {
        margin-left: 2cm;
        margin-top: 4cm;
    }
}
</style>
<script>
import getUrl from '~/api/restfulapi.js'

export default {
    name: 'printer_receipt',
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
                'region_oe_id': '请选择'
            }
        }
        return {
            localdata,
            qrcodeimg: '',
            order: {},
            currStudent: {},
            classes: {},
            pay: {},
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            value1: new Date,
        }
    },
    mounted() {
        let vm = this
        if (vm.$store.state.dialogs.dailogdata) {
            let { order, pay } = vm.$store.state.dialogs.dailogdata
            vm.order = order
            vm.pay = pay
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
            vm.handleGetTableID('classes', vm.order.classes_id).then((obj) => {
                if (obj.data && obj.data.length > 0) {
                    vm.classes = obj.data[0]
                }
            })

            console.log(this.localdata.form.student_id)
            getUrl.httpGetUrlQccode(this.uid).then(obj => {
                console.log(obj)
                console.log(obj.data.ticket)
                this.qrcodeimg = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + obj.data.ticket
            })

        }
    },
    computed: {},
    watch: {},
    methods: {
        setPayStatus() {
            this.updateTeble('pay', this.pay._id, {
                'print': true
            }).then(() => {
            })
            this.lbClosedialog()
            this.$store.state.envs.currDialog = 'lb-printerreceipt'
        },
        handleClick() {
            this.setPayStatus()
            window.print()

        }
    },
}
</script>